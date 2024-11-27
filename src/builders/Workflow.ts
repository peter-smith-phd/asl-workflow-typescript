import {WorkflowIf} from "./WorkflowIf";
import {WorkflowRetryCatch} from "./WorkflowRetryCatch";

type ConstantOrJsonata = number | string | boolean | object | any[] ;
type StringOrJsonata = string;

export class Workflow {
    public assign(varName: string, constOrJsonata: ConstantOrJsonata): void {
        console.log("Assigning to " + varName + " " + typeof constOrJsonata);
        if (typeof constOrJsonata === "object") {
            console.log("Type is " + constOrJsonata.constructor.name);
        }
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
     * Exit successfully from the current workflow (or nested workflow) and return the specified value. If called
     * from the main workflow, the entire execution will complete successfully. If called from a nested workflow
     * within a map or parallel operation, only that portion of the execution will complete, with the return value
     * used as that branches result.
     * @param value A constant JSON value (number, string, etc), or a JSONata expression.
     */
    public return(value: ConstantOrJsonata): void {
    }

    // Fail state
    // TODO: test Fail inside a Parallel/Map
    public fail(error: StringOrJsonata, cause: StringOrJsonata): void {
    }

    public expr(value: ConstantOrJsonata) :void {

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