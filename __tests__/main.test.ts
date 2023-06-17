import {expect, test} from '@jest/globals'
import getArrayFromString from '../src/get-array-from-string'

test('get dependencies from array', () => {
  const input = `
    @actions/core
    @types/node
  `
  const array = getArrayFromString(input)
  expect(array[0]).toBe('@actions/core')
  expect(array[1]).toBe('@types/node')
})
