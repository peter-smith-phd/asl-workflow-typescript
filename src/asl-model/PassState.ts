import AslState from "./AslState";

/**
 * Data object representing an ASL "Pass" state.
 */
export default class PassState extends AslState {

    /** Content of the "Output" field */
    private _output: any | undefined = undefined;

    /** Variable assignments for the "Assign" field */
    private _assign: { [key: string]: any } | undefined = undefined;

    /**
     * Create a new PassState object, representing the ASL "Pass" state type.
     *
     * @param name The name of the state.
     */
    constructor(name: string) {
        super(name, "Pass");
    }

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

    /**
     * Return the ASL for this Pass state.
     */
    public toAsl(): object {
        const asl: { [key: string]: any } = {
            "Type": "Pass"
        }
        if (this._output) {
            asl["Output"] = this._output;
        }
        if (this._assign) {
            asl["Assign"] = this._assign;
        }
        if (this.end) {
            asl["End"] = true
        } else {
            asl["Next"] = this._next?.name;
        }
        return asl;
    }
}