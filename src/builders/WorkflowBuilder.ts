import {Workflow} from "./Workflow";

export class WorkflowBuilder {

    public static build(commands: (w: Workflow) => void): void {
        commands(new Workflow());
    }
}