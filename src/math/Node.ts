
/**
 * holds any element and connects it to the other element
 */
export default class Node<T> {
    private _element: T;
    private _next: Node<T>;
    private _prev: Node<T>;

    constructor(element: T) {
        this._element = element;
        this._next = null
        this._prev = null
    }

    /**
     * returns next element node
     * @returns {Node<T>}
     */
    get next(): Node<T> { return this._next }


    /**
     * sets next element for this
     */
    set next(value: Node<T>) { this._next = value }


    /**
     * returns previous element node
     * @returns {Node<T>}
     */
    get prev(): Node<T> { return this._prev }

    /**
     * sets previous element for this
     */
    set prev(value: Node<T>) { this._prev = value }

    /**
     * returns current element
     */
    get element(): T { return this._element }
}

export { Node }

