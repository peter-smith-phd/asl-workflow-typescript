
const variableRegex = /^[A-Za-z][A-Za-z0-9_]*$/

/**
 * Tests whether the ASL state name is valid. Note that pretty much any valid string
 * can be a state name, so this helper is just for readability.
 */
export function isValidStateName(stateName: string): boolean {
    return true
}

/**
 * Tests whether the ASL variable name is valid. This is formally defined as an ID_Start
 * character followed by 0 or more ID_Continue characters. The maximum length can be 80 unicode characters.
 */
export function isValidVariableName(variableName: string): boolean {
    // TODO: figure out the most accurate definition of a variable name.
    return variableName.length <= 80 && variableRegex.test(variableName)
}