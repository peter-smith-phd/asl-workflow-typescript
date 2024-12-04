/**
 * Represents a single branching choice within a Choice state. The condition field (JSONata) and the
 * next field (a state name) are mandatory, whereas Assign and Output are optional.
 */
export default class ChoiceRule {

    /** Content of the "Output" field */
    private _output: any | undefined = undefined;

    /** Variable assignments for the "Assign" field */
    private _assign: { [key: string]: any } | undefined = undefined;

    /**
     * Create a new ChoiceRule, which can later be added to a ChoiceState.
     * @param condition The JSONata condition for this rule.
     * @param nextState The next state to transition to, if the condition is true.
     */
    constructor(public condition: string, public nextState: string) { }

    /** @returns The Output of the Pass state (any valid JSON type) */
    get output(): any {
        return this._output;
    }

    /** @param value The new value of the "Output" field */
    set output(value: any) {
        this._output = value;
    }

    /** @returns The "Assign" field of the Pass state */
    get assign(): { [p: string]: any } | undefined {
        return this._assign;
    }

    /** @param value The new value of the "Assign" field (must be an object with variable name keys) */
    set assign(value: { [p: string]: any }) {
        this._assign = value;
    }

    public toAsl(): object {
        const asl: { [key: string]: any } = {
            "Condition": this.condition,
            "Next": this.nextState
        }
        if (this.output) {
            asl["Output"] = this.output;
        }
        if (this.assign) {
            asl["Assign"] = this.assign;
        }
        return asl
    }
}
