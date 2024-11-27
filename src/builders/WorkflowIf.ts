import {Workflow} from "./Workflow";
import {WorkflowIfThen} from "./WorkflowIfThen";

export class WorkflowIf {
    public then(commands: (w: Workflow) => void): WorkflowIfThen {
        return new WorkflowIfThen();
    }
}