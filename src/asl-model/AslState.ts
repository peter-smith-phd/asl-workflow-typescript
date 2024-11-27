import AslNode from "./AslNode";

/**
 * The abstract base class representing a state in an ASL program. All states have 1) a name, 2) a Type field,
 * 3) an optional comment field, 4) a Next or End field. Each state type should sub-class this abstract class to
 * add fields and behaviour that are unique to each state type.
 */
export default abstract class AslState extends AslNode {

    /* the name of this state */
    private _name: string;

    /* the textual type of this state (e.g. "Pass" or "Task") */
    private _type: string;

    /* if true, this is an end state with no successor. If false, the _next refers to the next state */
    private _end: boolean = true;

    /* the next state (valid only if end is false) */
    protected _next: AslState | undefined = undefined;

    /**
     * Constructor for the abstract base class for all ASL state types.
     *
     * @param name The name of this ASL state.
     * @param type The type of this state (e.g. "Pass" or "Task")
     */
    constructor(name: string, type: string) {
        super();
        this._name = name;
        this._type = type;
    }

    /** @returns the state's textual name */
    public get name(): string {
        return this._name;
    }

    /** @returns the state's type (e.g. "Pass") */
    get type(): string {
        return this._type;
    }

    /** @returns whether or not this is an end state, with no successor */
    get end(): boolean {
        return this._end;
    }

    /** @param value If true, indicates this is an end state (with no next state). */
    set end(value: boolean) {
        this._end = value;
        if (value) {
            this._next = undefined;
        }
    }

    /** @returns This state's successor state */
    get next(): AslState | undefined {
        return this._next;
    }

    /** @param value A reference to this state's successor state */
    set next(value: AslState) {
        this._next = value;
        this._end = false;
    }
}
