import {Workflow} from "./Workflow";
import {WorkflowCatch} from "./WorkflowCatch";

type RetryOptions = {
    intervalSeconds?: number,
    maxAttempts?: number,
    maxDelaySeconds?: number,
    jitterStrategy?: string // TBD: is this an enum?
    backoffRate?: number
}

export class WorkflowRetryCatch {
    // can have multiple retries.
    public retry(errors: string | string[], retryOptions?: RetryOptions): WorkflowRetryCatch {
        return new WorkflowRetryCatch();
    }

    // once we see a catch, we can see more catches, but no more retries.
    public catch(errors: string | string[], commands: (w: Workflow) => void): WorkflowCatch {
        return new WorkflowCatch();
    }
}