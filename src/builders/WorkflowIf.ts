import {Workflow} from "./Workflow";
import {WorkflowIfThen} from "./WorkflowIfThen";
import StateMachine from "../asl-model/StateMachine";
import ChoiceState from "../asl-model/ChoiceState";
import ChoiceRule from "../asl-model/ChoiceRule";
import {toJsonataString, fromJsonataString} from "../asl-model/jsonata";
import {jsonataTag as j} from "./jsonataTag";

export class WorkflowIf {

    constructor(
        private readonly stateMachine: StateMachine,
        private readonly jsonataExpression: string,
        private readonly falseLabel: string,
        private readonly endLabel: string) {}

    /**
     * Execute a sequence of statements for when the condition evaluates to true.
     *
     * @param statements a sequence of workflow statements.
     */
    public then(statements: (w: Workflow) => void): WorkflowIfThen {
        /* use a Choice state to branch based on the JSONata expression */
        const choiceState = new ChoiceState(this.stateMachine.nextStateName)
        const choiceRule = new ChoiceRule(
            toJsonataString(`$not(${fromJsonataString(this.jsonataExpression)})`), this.falseLabel)
        choiceState.addChoiceRule(choiceRule)
        this.stateMachine.chainStateAtEnd(choiceState)

        /* add all the commands from the true case. If there are no commands, generate "null" */
        const beforeCount = this.stateMachine.size()
        const workflow = new Workflow(this.stateMachine);
        statements(workflow)
        if (this.stateMachine.size() == beforeCount) {
            /* block was empty, generate a `null` output */
            workflow.expr(j`null`);
        }

        /*
         * Process the false case, if there is one. If not, then falseLabel will be used for the
         * next command that appears after the if statement.
         */
        this.stateMachine.nextStateName = this.falseLabel
        return new WorkflowIfThen(this.stateMachine, this.endLabel);
    }
}
