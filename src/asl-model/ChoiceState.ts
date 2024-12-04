import AslState from "./AslState";
import ChoiceRule from "./ChoiceRule";
import {MissingFieldError} from "./errors";

/**
 * Data object representing an ASL "Choice" state.
 */
export default class ChoiceState extends AslState {

    /** ordered list of Choice rules */
    private _choices: ChoiceRule[] = []

    /**
     * Create a new ChoiceState object, representing the ASL "Choice" state type.
     *
     * @param name The name of the state.
     */
    constructor(name: string) {
        super(name, "Choice");
    }

    /**
     * Add a new Choice rule to this Choice state. Rules will be evaluated in the
     * order they're added.
     *
     * @param rule The ChoiceRule to add
     */
    public addChoiceRule(rule: ChoiceRule) {
        this._choices.push(rule);
    }

    /**
     * Return the ASL for this Pass state.
     */
    public toAsl(): object {
        const asl: { [key: string]: any } = {
            "Type": "Choice"
        }
        asl["Choices"] = this._choices.map(rule => rule.toAsl());
        if (this.output) {
            asl["Output"] = this.output;
        }
        if (this.assign) {
            asl["Assign"] = this.assign;
        }
        if (this.end) {
            throw new MissingFieldError("Choice states require the `Default` field to be set")
        }
        asl["Default"] = this._next
        return asl;
    }
}