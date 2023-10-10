import { Quaternion } from "../src"

describe('quaternion test', () => {

    test('should first', () => {
        const q = new Quaternion(2, 3, 5, 6)
        expect(q.toArray()).toEqual([2, 3, 5, 6])
    })
})