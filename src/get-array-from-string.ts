/**
 * Accepts the actions list of secrets and parses them as References.
 *
 * @param input List of secrets, from the actions input, can be
 * comma-delimited or newline, whitespace around secret entires is removed.
 * @returns Array of References for each secret, in the same order they were
 * given.
 */
const getArrayFromString = (input: string): string[] =>
  input
    .split(/\r|\n/)
    .map(string => string.trim())
    .filter(string => string)

export default getArrayFromString
