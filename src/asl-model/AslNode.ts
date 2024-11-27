/**
 * The base class representing a node in an ASL program. A node can be a state (PassState, WaitState, etc),
 * or a StateMachine. Basically anything that has an toAsl() method.
 */
export default abstract class AslNode {
    /* the optional comment */
    private _comment?: string;

    /**
     * @return the (optional) comment for this ASL node.
     */
    get comment(): string | undefined{
        return this._comment;
    }

    /**
     * Set the comment for this ASL node
     *
     * @param value The ASL comment string
     * */
    set comment(value: string) {
        this._comment = value;
    }

    /**
     * Return an object hierarchy representing the ASL for this node (and child nodes). This object can then
     * be serialized to an ASL string.
     */
    abstract toAsl(): object;
}
