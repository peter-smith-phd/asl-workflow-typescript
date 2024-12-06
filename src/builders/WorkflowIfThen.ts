import {Workflow} from "./Workflow";
import {jsonataTag as j} from "./jsonataTag";
import StateMachine from "../asl-model/StateMachine";

export class WorkflowIfThen {
    constructor(
        private readonly stateMachine: StateMachine,
        private readonly endLabel: string) {}
    
    public else(statements: (w: Workflow) => void): void {
        const endOfTrueCaseState = this.stateMachine.getLastState()!;

        /* add all the commands from the false case. If there are no commands, generate "null" */
        const beforeCount = this.stateMachine.size()
        const workflow = new Workflow(this.stateMachine);
        statements(workflow)
        if (this.stateMachine.size() == beforeCount) {
            /* block was empty, generate a `null` output */
            workflow.expr(j`null`);
        }

        endOfTrueCaseState.next = this.endLabel;
        this.stateMachine.nextStateName = this.endLabel;
    }
}