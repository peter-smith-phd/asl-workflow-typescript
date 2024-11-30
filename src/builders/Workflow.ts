import {WorkflowIf} from "./WorkflowIf";
import {WorkflowRetryCatch} from "./WorkflowRetryCatch";
import StateMachine from "../asl-model/StateMachine";
import PassState from "../asl-model/PassState";
import AslState from "../asl-model/AslState";
import {isValidVariableName} from "../asl-model/utils";
import {InvalidName} from "../asl-model/errors";

type ConstantOrJsonata = number | string | boolean | object | any[] ;
type StringOrJsonata = string;

export class Workflow {

    constructor(private stateMachine: StateMachine) {}

    public assign(varName: string, constOrJsonata: ConstantOrJsonata): void {
        if (!isValidVariableName(varName)) {
            throw new InvalidName(`Variable '${varName}' is not a valid variable name`)
        }

        // TODO: error checks for input type
        // TODO: validate JSONata.
        const passState = new PassState(this.stateMachine.nextStateName)
        passState.assign = {}
        passState.assign[varName] = constOrJsonata
        this.chainStateAtEnd(passState)
    }

    public if(jsonataExpression: string | boolean): WorkflowIf {
        return new WorkflowIf();
    }

    public parallel(input: ConstantOrJsonata, branches: ((w: Workflow) => void)[]): WorkflowRetryCatch {
        return new WorkflowRetryCatch();
    }

    public try(commands: (w: Workflow) => void): WorkflowRetryCatch {
        return new WorkflowRetryCatch();
    }

    /**
     * Invoke a function that contributes commands to the current workflow, making the workflow definition more
     * readable. The included commands are directly inserted into the main workflow, rather than creating a separate
     * nested workflow.
     * @param func A function that adds more commands to an existing workflow.
     */
    public include(func: (w: Workflow) => void): Workflow {
        return this;
    }

    /**
     * Exit successfully from the current workflow (or nested workflow) and return the specified value. This method
     * only makes sense in the top-level workflow, or at the top-level of an include block.
     *
     * @param value A constant JSON value (number, string, etc), or a JSONata expression.
     */
    public return(value: ConstantOrJsonata): void {
        // TODO: it's an error if this isn't the last command in the block, or it's appears anywhere except
        // for the top-level workflow, or at the top-level of an include block.
    }

    // Fail state
    // TODO: test Fail inside a Parallel/Map
    public fail(error: StringOrJsonata, cause: StringOrJsonata): void {
    }

    /**
     * Output a constant value, or the result of a JSONata expression, as the result of the enclosing block
     * (main workflow code, if/else block, within a map or parallel etc. This method can only be at the very
     * end of the block, otherwise the result is discarded.
     *
     * @param value A JSON constant, or JSONata expression to evaluate.
     */
    public expr(value: ConstantOrJsonata): void {
        // TODO: it's an error if this isn't the last command in the block.
        const passState = new PassState(this.stateMachine.nextStateName)
        passState.output = {}
        passState.output = value
        this.chainStateAtEnd(passState)
    }

    /**
     * Helper for adding a new state to the state machine, then appending it to the end of
     * the current flow.
     *
     * @param state New state to be appended to the end.
     */
    private chainStateAtEnd(state: AslState) {
        const lastState = this.stateMachine.getLastState();
        this.stateMachine.addChildState(state)
        if (lastState === undefined) {
            this.stateMachine.startState = state;
        } else {
            lastState.next = state;
        }
    }
    // TODO: label
    // TODO: while/break/continue
    // TODO: switch
    // TODO: for
    // TODO: do/break/continue
    // TODO: waitSeconds
    // TODO: waitTimestamp
    // TODO: map

    // TODO: if/parallel/try/map/invoke can all return a value, that can be directly passed to assign and return,
    // TODO: or implicitly used as return value if the last command in a sequence (if return not provided).
    // TODO: could include also return a value?
    // TODO: "return" is awkward, especially in parallel/map. Is there a better way to say "use this expression as the result"?
    // TODO: result? expression? use? compute?


}