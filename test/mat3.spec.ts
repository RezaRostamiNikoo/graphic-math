import { Mat3 } from "../src"

describe("Mat3x3", () => {

    test("general", () => {

        const a = new Mat3(1, 2, 3, 4, 5, 6, 7, 8, 9)
        const b = new Mat3(10, 11, 12, 13, 14, 15, 16, 17, 18)
        const c = new Mat3(1, 2, 3, 4, 5, 6, 7, 8, 10)
        const ac = a.clone();
        const bc = b.clone();
        expect(a.toArray()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
        expect(a.toArray()).toEqual(ac.toArray())
        expect(b.toArray()).toEqual(bc.toArray())
        expect(a.clone().toArray()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
        expect(ac.multiplyTo(b).toArray()).toEqual([84, 90, 96, 201, 216, 231, 318, 342, 366])
        expect(bc.equals(b)).toEqual(true)
        expect(a.clone().premultiply(b).toArray()).toEqual([138, 171, 204, 174, 216, 258, 210, 261, 312])


        expect(a.clone().transpose().toArray()).toEqual([1, 4, 7, 2, 5, 8, 3, 6, 9])
        expect(c.clone().determinant()).toEqual(-3)
        expect(c.clone().invert().toArray()).toEqual([-2 / 3, -4 / 3, 1, -2 / 3, 11 / 3, -2, 1, -2, 1])
        expect(c.clone().multiplyScalar(10).toArray()).toEqual([10, 20, 30, 40, 50, 60, 70, 80, 100])


    })


})