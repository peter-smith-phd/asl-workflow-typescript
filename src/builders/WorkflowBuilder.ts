import {Workflow} from "./Workflow";
import StateMachine from "../asl-model/StateMachine";

export class WorkflowBuilderOptions {
    /* if Off, don't optimize the ASL in any way */
    optimize: 'Off' | 'On' = 'On'
}


export class WorkflowBuilder {

    public static build(
        commands: (w: Workflow) => void,
        _options?: WorkflowBuilderOptions
    ): object {
        const stateMachine = new StateMachine()
        const workflow = new Workflow(stateMachine)
        commands(workflow);

        /*
         * if an if/while/etc expects a labelled state to appear next, but we've ended our state machine,
         * we must forcefully generate an output state that does nothing but pass on the value.
         */
        if (stateMachine.hasUnusedCustomStateName()) {
            workflow.expr(null) // generates a pass state that emits input as output
        }
        return stateMachine.toAsl();
    }
}