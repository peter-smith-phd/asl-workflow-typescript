import {Workflow} from "./Workflow";
import StateMachine from "../asl-model/StateMachine";

export class WorkflowBuilderOptions {
    /* if Off, don't optimize the ASL in any way */
    optimize: 'Off' | 'On' = 'On'
}


export class WorkflowBuilder {

    public static build(
        commands: (w: Workflow) => void,
        options?: WorkflowBuilderOptions
    ): object {
        const stateMachine = new StateMachine()
        commands(new Workflow(stateMachine));
        return stateMachine.toAsl();
    }
}