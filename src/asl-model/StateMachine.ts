import AslNode from "./AslNode";
import AslState from "./AslState";
import {AlreadyExistsError, MissingFieldError} from "./errors";

export default class StateMachine extends AslNode {

    /** The state machine's initial state */
    private _startState?: AslState;

    /** the child states, in the order they were added */
    private _states: AslState[] = [];

    /** @returns the state machine's start state */
    public get startState(): AslState | undefined{
        return this._startState;
    }

    /** @param value the state machine's start state. */
    public set startState(value: AslState) {
        this._startState = value;
    }

    /**
     * Append a new child state to this state machine. They will be stored in the order
     * they were added so the generated ASL will show them in a logical sequence.
     *
     * @param childState A child state to be added to the state machine.
     * @throws AlreadyExistsError If a state by the same name is already added.
     */
    public addChildState(childState: AslState) {
        /* search for existing state with the same name (linear search is OK given small data size). */
        if (this._states.find(state => state.name === childState.name)) {
            throw new AlreadyExistsError(`A state with name ${childState.name} has already been added`);
        }
        this._states.push(childState);
    }

    /**
     * Output this state machine's ASL, complete with top-level states
     * and the ASL for all child states (deeply recursive).
     *
     * @returns an object hierarchy that can later be stringified to JSON.
     */
    toAsl(): object {
        if (!this._startState) {
            throw new MissingFieldError("Mandatory field 'startState' is missing");
        }

        const asl: { [key: string]: any } = {
            "Version": "1.0",
            "QueryLanguage": "JSONata",
            "StartAt": this._startState.name
        }
        if (this.comment) {
            asl["Comment"] = this.comment;
        }

        const statesObject: { [key: string]: object } = {}
        this._states.find(state => {
            statesObject[state.name] = state.toAsl()
        })
        asl["States"] = statesObject;

        return asl as object;
    }

}