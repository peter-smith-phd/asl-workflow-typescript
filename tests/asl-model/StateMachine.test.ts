import StateMachine from "../../src/asl-model/StateMachine";
import {AlreadyExistsError, InvalidName, MissingFieldError} from "../../src/asl-model/errors";
import PassState from "../../src/asl-model/PassState";


test("state machine with a sequence of Pass states", () => {
    const passState1 = new PassState("MyState");
    passState1.assign = {"var": "value"}
    passState1.output = [1, 2, 3];
    const passState2 = new PassState("YourState");
    passState2.assign = {"var": 42}
    passState2.output = {"a": 1, "b": 2};

    const stateMachine = new StateMachine();
    stateMachine.addChildState(passState1)
    stateMachine.addChildState(passState2)
    stateMachine.startState = passState1
    passState1.next = passState2;

    expect(stateMachine.toAsl()).toStrictEqual(
        JSON.parse(`
        { 
            "QueryLanguage": "JSONata",
            "Version": "1.0",
            "StartAt": "MyState", 
            "States": {
                "MyState": {
                    "Type": "Pass",
                    "Assign": { "var": "value" }, 
                    "Output": [1, 2, 3], 
                    "Next": "YourState"
                },
                "YourState": {
                    "Type": "Pass",
                    "Assign": {
                        "var": 42
                    },
                    "Output": {
                        "a": 1,
                        "b": 2
                    },
                    "End": true
                }
            }
        }`))
})

test("state machine with a optional top-level field", () => {
    const passState = new PassState("MyState");
    passState.assign = {"var": "value"}
    passState.output = [true, "1", 2];

    const stateMachine = new StateMachine();
    stateMachine.comment = "This is a test";
    stateMachine.addChildState(passState)
    stateMachine.startState = passState

    expect(stateMachine.toAsl()).toStrictEqual(
        JSON.parse(`
        { 
            "QueryLanguage": "JSONata",
            "Version": "1.0",
            "Comment": "This is a test",
            "StartAt": "MyState", 
            "States": {
                "MyState": {
                    "Type": "Pass",
                    "Assign": { "var": "value" }, 
                    "Output": [true, "1", 2], 
                    "End": true
                }
            }
        }`))
})

test("when there are no child states, lastState is undefined", () => {
    const stateMachine = new StateMachine();
    expect(stateMachine.getLastState()).toBeUndefined()
})

test("the most recent child state is the lastState", () => {
    const stateMachine = new StateMachine();

    const passState1 = new PassState("MyState1");
    stateMachine.addChildState(passState1)
    expect(stateMachine.getLastState()).toEqual(passState1)

    const passState2 = new PassState("MyState2");
    stateMachine.addChildState(passState2)
    expect(stateMachine.getLastState()).toEqual(passState2)
})

test("auto-generated state names are in a unique sequence", () => {
    const stateMachine = new StateMachine();
    const state1 = stateMachine.nextStateName;
    const state2 = stateMachine.nextStateName;
    const state3 = stateMachine.nextStateName;

    expect(state1).toBe("State0001");
    expect(state2).toBe("State0002");
    expect(state3).toBe("State0003");
})

test("custom state names can be set and will be returned next", () => {
    const stateMachine = new StateMachine();
    const state1 = stateMachine.nextStateName;
    stateMachine.nextStateName = "MyCustomStateName";
    const myState = stateMachine.nextStateName;
    const state2 = stateMachine.nextStateName;

    expect(state1).toBe("State0001");
    expect(myState).toBe("MyCustomStateName");
    expect(state2).toBe("State0002");
})

test("custom state names that look like auto-generated names are invalid", () => {
    const stateMachine = new StateMachine();
    expect(() => {
        stateMachine.nextStateName = "State1234";
    }).toThrow(new InvalidName("Custom state name State1234 can not be used"))
})

test("state machine with no states is illegal", () => {
    const stateMachine = new StateMachine();
    expect(() => {
        stateMachine.toAsl()
    }).toThrow(new MissingFieldError("Mandatory field 'startState' is missing"))
})

test("state machine with duplicate state names is illegal", () => {
    const stateMachine = new StateMachine();
    const passState1 = new PassState("stateName");
    const passState2 = new PassState("stateName");
    stateMachine.addChildState(passState1)
    expect(() => {
        stateMachine.addChildState(passState2)
    }).toThrow(new AlreadyExistsError(`A state with name "stateName" has already been added`));
})

