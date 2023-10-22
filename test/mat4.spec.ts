import { Mat4, Mat3, gmUtils } from "../src"

const { f } = gmUtils

describe("Tests Mat4", () => {

    test("", () => {

        const m = new Mat4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)
        const a = new Mat4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)
        const b = new Mat4(17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32)
        const c = new Mat4(1, 3, 5, 9, 4, 5, 6, 6, 7, 8, 9, 9, 11, 23, 25, 6)
        expect(m.toArray()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])

        expect(a.clone().multiplyTo(b).toArray()).toEqual([250, 260, 270, 280, 618, 644, 670, 696, 986, 1028, 1070, 1112, 1354, 1412, 1470, 1528])
        expect(b.clone().multiplyTo(a).toArray()).toEqual([538, 612, 686, 760, 650, 740, 830, 920, 762, 868, 974, 1080, 874, 996, 1118, 1240])

        expect(a.determinant()).toEqual(0)
        expect(f(c.clone().invert().toArray())).toEqual(f([-19 / 40, 73 / 40, -27 / 40, -1 / 10, 19 / 20, -133 / 20, 67 / 20, 1 / 5, -29 / 40, 223 / 40, -117 / 40, -1 / 10, 1 / 4, -13 / 12, 7 / 12, -0]))

        expect(m.equals(a)).toEqual(true)
        expect(m.equals(b)).toEqual(false)

        expect(Mat4.identity().toArray()).toEqual([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
        expect(Mat4.fromMat3(new Mat3(1, 2, 3, 4, 5, 6, 7, 8, 9)).toArray())
            .toEqual([1, 2, 3, 0, 4, 5, 6, 0, 7, 8, 9, 0, 0, 0, 0, 1])

    })

    test('test rotation', () => {
        expect(f(Mat4.makeRotationZ(Math.PI / 2).toArray())).toEqual([0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
        expect(f(Mat4.makeRotationX(Math.PI / 2).toArray())).toEqual([1, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1])
        expect(f(Mat4.makeRotationY(Math.PI / 2).toArray())).toEqual([0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1])

        // const m = new Mat4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
        // expect(m.rotateX(Math.PI).toArray()).toEqual([2, 6, 12, 4, 10, 18, 28, 8, 18, 30, 44, 12, 26, 42, 60, 16])
    })

    test('test scale', () => {
        const m = new Mat4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
        expect(m.scale(2, 3, 4).toArray()).toEqual([2, 6, 12, 4, 10, 18, 28, 8, 18, 30, 44, 12, 26, 42, 60, 16])
        expect(m.multiplyTo(Mat4.makeScale(1 / 2, 1 / 3, 1 / 4)).toArray())
            .toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])

    })

})