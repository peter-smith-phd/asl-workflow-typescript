import StateMachine from "../../src/asl-model/StateMachine";
import {AlreadyExistsError, MissingFieldError} from "../../src/asl-model/errors";
import PassState from "../../src/asl-model/PassState";


test("state machine with a single Pass state", () => {
    const stateMachine = new StateMachine();
    const passState = new PassState("MyState");
    stateMachine.addChildState(passState)
    stateMachine.startState = passState
    const asl = JSON.stringify(stateMachine.toAsl(), null, 2)
    expect(asl).toEqual("a");
})

// TODO: first state added is default start state.
// TODO: optional top-level fields added correctly.
// TODO: add multiple child states and check their next fields are correct (and end field)

test("state machine with no states is illegal", () => {
    const stateMachine = new StateMachine();
    expect(() => {
        stateMachine.toAsl()
    }).toThrow(new MissingFieldError("Mandatory field 'startState' is missing"))
})

// TODO: add duplicate child states => throws

