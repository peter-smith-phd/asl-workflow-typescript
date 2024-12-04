import AslState from "./AslState";

/**
 * Data object representing an ASL "Pass" state.
 */
export default class PassState extends AslState {

    /**
     * Create a new PassState object, representing the ASL "Pass" state type.
     *
     * @param name The name of the state.
     */
    constructor(name: string) {
        super(name, "Pass");
    }

    /**
     * Return the ASL for this Pass state.
     */
    public toAsl(): object {
        const asl: { [key: string]: any } = {
            "Type": "Pass"
        }
        if (this.output) {
            asl["Output"] = this.output;
        }
        if (this.assign) {
            asl["Assign"] = this.assign;
        }
        if (this.end) {
            asl["End"] = true
        } else {
            asl["Next"] = this._next
        }
        return asl;
    }
}