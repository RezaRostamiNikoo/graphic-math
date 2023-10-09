import CircularLinkedList, { } from "../src/CircularLinkedList"

describe("circular linked list", () => {


    test('1', () => {

        const cll = new CircularLinkedList<number>([1, 2, 3, 4])

        let curr = cll.getFirst()

        expect(cll.getFirst().element).toEqual(1)
        expect(cll.getLast().element).toEqual(4)
        expect((curr = curr.next).element).toEqual(2)
        expect((curr = curr.next).element).toEqual(3)
        expect((curr = curr.next).element).toEqual(4)
        expect((curr = curr.next).element).toEqual(1)
        expect(cll.length).toEqual(4)

        expect(cll.indexOf(1)).toEqual(0)
        expect(cll.indexOf(2)).toEqual(1)
        expect(cll.indexOf(3)).toEqual(2)
        expect(cll.indexOf(4)).toEqual(3)
        expect(cll.indexOf(8)).toEqual(-1)

        cll.insertAt(5, 1)
        expect(cll.toArray()).toEqual([1, 5, 2, 3, 4])
        expect((curr = curr.next).element).toEqual(5)
        expect((curr = curr.next).element).toEqual(2)
        expect((curr = curr.next).element).toEqual(3)
        expect((curr = curr.next).element).toEqual(4)
        expect((curr = curr.next).element).toEqual(1)
        expect((curr = curr.prev).element).toEqual(4)
        expect((curr = curr.prev).element).toEqual(3)
        expect((curr = curr.prev).element).toEqual(2)
        expect((curr = curr.prev).element).toEqual(5)
        expect((curr = curr.prev).element).toEqual(1)
        expect((curr = curr.prev).element).toEqual(4)

        cll.add(5)
        cll.removeElement(5)
        expect(cll.toArray()).toEqual([1, 2, 3, 4, 5])

        expect((curr = curr.next).element).toEqual(5)
        expect((curr = curr.next).element).toEqual(1)

        cll.insertAt(66, 0)
        expect((curr = curr.prev).element).toEqual(66)
        expect((curr = curr.prev).element).toEqual(5)
        expect((curr = curr.next).element).toEqual(66)

        cll.removeFrom(5)
        expect((curr = curr.next).element).toEqual(1)
        expect((curr = curr.next).element).toEqual(2)
        expect((curr = curr.next).element).toEqual(3)
        expect((curr = curr.next).element).toEqual(4)
        expect((curr = curr.next).element).toEqual(66)
        expect((curr = curr.next).element).toEqual(1)
        expect((curr = curr.prev).element).toEqual(66)
        expect((curr = curr.prev).element).toEqual(4)

    })

})