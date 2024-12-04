import PassState from "../../src/asl-model/PassState";

test("PassState stores mandatory 'name' and 'type' fields", () => {
    const passState = new PassState("stateName");
    expect(passState.name).toEqual("stateName");
    expect(passState.type).toEqual("Pass");
    expect(passState.output).toBeUndefined();
    expect(passState.end).toBeTruthy();
})

test("PassState stores optional fields", () => {
    const passState = new PassState("stateName");
    passState.output = [1, 2, 3];
    passState.assign = {"var1": "hello"}
    passState.next = "secondState";

    expect(passState.name).toEqual("stateName");
    expect(passState.type).toEqual("Pass");
    expect(passState.output).toStrictEqual([1, 2, 3]);
    expect(passState.assign).toStrictEqual({"var1": "hello"});

    expect(passState.end).toBeFalsy();
    expect(passState.next).toEqual("secondState");
})

test("PassState serializes to ASL correctly (with next state)", () => {
    const passState = new PassState("stateName");
    passState.output = {"a": true, b: [5, 6, 7]}
    passState.assign = {"var2": "goodbye"}
    passState.next = "secondState";

    expect(passState.toAsl()).toStrictEqual(
        JSON.parse(`
        {
            "Type": "Pass",
            "Output": {
                "a": true,
                "b": [5, 6, 7]
            },
            "Assign": {
                "var2": "goodbye"
            },
            "Next": "secondState"
        }`)
    )
})

test("PassState ASL includes end field (with no next state)", () => {
    const passState = new PassState("stateName");
    passState.output = {"a": true, b: [5, 6, 7]}
    passState.assign = {"var3": [1, 2, 3]}

    expect(passState.toAsl()).toStrictEqual(
        JSON.parse(`
        {
            "Type": "Pass",
            "Output": {
                "a": true,
                "b": [5, 6, 7]
            },
            "Assign": {
                "var3": [1, 2, 3]
            },
            "End": true
        }`)
    )
})
