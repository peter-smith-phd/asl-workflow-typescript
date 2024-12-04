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

    /* the next state's name (valid only if end is false) */
    protected _next?: string = undefined;

    /** Content of the "Output" field */
    private _output: any | undefined = undefined;

    /** Variable assignments for the "Assign" field */
    private _assign: { [key: string]: any } | undefined = undefined;

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

    /** @returns The name of this state's successor state */
    get next(): string | undefined {
        // TODO: or string
        return this._next;
    }

    /**
     * @param stateName
     */
    set next(stateName: string) {
        this._next = stateName;
        this._end = false;
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
}
