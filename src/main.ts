import {warning, getInput, setFailed, debug} from '@actions/core'
import path from 'path'
import fs from 'fs'
import getArrayFromString from './get-array-from-string'

async function run(): Promise<void> {
  try {
    const dependencies = getArrayFromString(
      getInput('dependencies', {required: true})
    )
    const clearResolutions =
      (getInput('clear-resolutions') || '').toUpperCase() === 'TRUE'
    const pkgPath = getInput('path') || './package.json'
    const resolvePath = path.resolve(process.cwd(), pkgPath)
    if (!fs.existsSync(resolvePath)) {
      throw new Error(`File \x1b[31;1m${resolvePath}\x1b[0m does not exist!`)
    }

    const jsonStr = await fs.promises.readFile(resolvePath)
    const jsonObj = JSON.parse(jsonStr.toString())
    const clean = dependencies.reduce((acc, dependency) => {
      const version =
        jsonObj.dependencies[dependency] || jsonObj.devDependencies[dependency]
      if (!version) {
        warning(`No version found for ${dependency}`)
        return acc
      }
      return {
        [dependency]: version,
        ...acc
      }
    }, {})
    jsonObj.dependencies = clean
    if (clearResolutions) {
      jsonObj.resolutions = {}
    }
    jsonObj.devDependencies = {}

    await fs.promises.writeFile(resolvePath, JSON.stringify(jsonObj, null, 2))
    debug(JSON.stringify(jsonObj, null, 2))
  } catch (error) {
    if (error instanceof Error) setFailed(error.message)
  }
}

run()
