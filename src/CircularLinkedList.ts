import Node from "./Node";

// export default class CircularLinkedList<T> extends Array<T> {
export default class CircularLinkedList<T> {

    private _list: Array<Node<T>> = []
    private _head: Node<T>

    constructor(items: Array<T> = []) {
        items.forEach(i => this.add(i))
    }

    /**
     * clears all data in the object
     */
    clear() { this._head = null; this._list = [] }

    /**
     * returns the last node in the list
     * @returns {Node<T>}
     */
    getLast(): Node<T> { return this._list.at(-1) }

    /**
     * returns the first node in the list
     * @returns {Node<T>}
     */
    getFirst(): Node<T> { return this._head }

    /**
     * adds en element to the end of the list
     * @param {T} element 
     * @returns {this}
     */
    add(element): this {
        // creates a new node
        var node = new Node(element);

        // if list is Empty add the element and make it head
        if (this._head == null) {
            this._head = node;
            this._head.prev = node;
            this._head.next = node;
        } else {
            var current: Node<T> = this._list.at(-1);
            // add node
            current.next = node;
            node.prev = current;
            node.next = this._head
            this._head.prev = node
        }
        this._list.push(node)

        return this
    }

    /**
     * insert element at the position index of the list
     * @param {T} element 
     * @param {number} index 
     * @returns {this}
     */
    insertAt(element: T, index: number): this {
        if (index < 0 || index > this.length)
            throw new Error("CircularLinkedList.insertAt | index i out of range")
        else {
            // creates a new node
            var node = new Node(element);
            var curr, prev;

            curr = this._head;
            prev = curr?.prev;
            var it = 0;

            // iterate over the list to find the position to insert
            while (it < index) {
                it++;
                prev = curr;
                curr = curr.next;
            }

            // adding an element
            node.next = curr;
            node.prev = prev;
            if (curr) curr.prev = node;
            if (prev) prev.next = node;
            this._list.splice(index, 0, node)
        }


        return this
    }

    /**
     * removes an element from the specified location
     * @param {number} index 
     * @returns {Node<T>}
     */
    removeFrom(index): Node<T> | -1 {
        if (index < 0 || index >= this.length)
            throw new Error("CircularLinkedList.removeFrom | Please Enter a valid index");
        else {

            var curr: Node<T> = this._list.at(index),
                prev: Node<T> = curr?.prev,
                next: Node<T> = curr?.next

            if (prev) prev.next = next
            if (next) next.prev = prev

            this._list.splice(index, 1)
            this._head = this._list[0] ?? null

            return curr
        }
    }

    /**
     * removes a given element from the list - first matched element
     * @param {T} element 
     * @returns {Node<T>}
     */
    removeElement(element: T): Node<T> | -1 {
        const index: number = this.indexOf(element)
        if (index === -1) return -1;

        var curr: Node<T> = this._list.at(index),
            prev: Node<T> = curr?.prev,
            next: Node<T> = curr?.next

        if (prev) prev.next = next
        if (next) next.prev = prev

        this._list.splice(index, 1)
        this._head = this._list[0] ?? null

        return curr
    }

    /**
     * Returns the index of the first element, otherwise -1
     * @param {T} element 
     * @returns {number}
     */
    indexOf(element: T) { return this._list.findIndex(n => n.element === element) }

    /**
     * checks the list for empty
     * @returns {boolean}
     */
    isEmpty() { return this.length == 0 }

    /**
     * gives the size of the list
     */
    get length(): number { return this._list.length }

    toArray(): Array<T> { return this._list.map(i => i.element) }
}

export { CircularLinkedList }