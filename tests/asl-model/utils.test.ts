import {isValidStateName, isValidVariableName} from "../../src/asl-model/utils";

test.each([
    "MyState",
    "YouState9",
    "State_With_3_underscores",
    "state-with-dashes",
    "state.with.periods",
    "state with spaces! ()"
])("accepts valid state names of %s", (stateName) => {
    expect(isValidStateName(stateName)).toBeTruthy()
})

test.each([
    "MyVariable",
    "a",
    "bbcc",
    "My_4th_variable"
])("accepts valid variables names of %s", (variableName) => {
    expect(isValidVariableName(variableName)).toBeTruthy()
})

test.each([
    " MyVariable",
    "9a",
    "bbcc!",
    "aaaaaaaaaabbbbbbbbbbccccccccccddddddddddeeeeeeeeeeffffffffffgggggggggghhhhhhhhhhx"
])("rejects invalid variables names of %s", (variableName) => {
    expect(isValidVariableName(variableName)).toBeFalsy()
})
