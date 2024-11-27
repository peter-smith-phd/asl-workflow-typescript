import {Workflow} from "./Workflow";

export class WorkflowCatch {

    // once we see a catch, we can see more, but no more retries.
    public catch(errors: string | string[], commands: (w: Workflow) => void): WorkflowCatch {
        return new WorkflowCatch();
    }
}