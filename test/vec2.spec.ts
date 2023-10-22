import { Vec2 } from "../src"
import { f } from "../src/math/utils";


describe(`Test for Vec2`, () => {

    test(`some methods`, () => {
        const v = new Vec2(3, 4);
        const length = Math.sqrt(9 + 16);
        expect(f(v.normalize().x)).toEqual(f(3 / length))
        expect(f(v.y)).toEqual(f(4 / length))
    })

    test(`deal with components of the vector`, () => {
        const v = new Vec2(3, 4);
        expect(v.toArray()).toEqual([3, 4])

        expect(v.set(6, 7))
        expect(v.toArray()).toEqual([6, 7])

        expect(v.setComponent(0, 90).setComponent(1, 2))
        expect(v.toArray()).toEqual([90, 2])

        expect(v.setScalar(4))
        expect(v.toArray()).toEqual([4, 4])

        expect(v.setX(55).setY(14))
        expect(v.toArray()).toEqual([55, 14])

        expect(v.setX(55).setY(14))
        expect(v.toArray()).toEqual([55, 14])

        expect(v.set(6, 6).setLength(2))
        expect(v.toArray()).toEqual(Array(2).fill(6 / Math.sqrt(36 * 2) * 2))

        expect(f(Vec2.setFromCylindricalCoords(5, Math.PI / 2).toArray())).toEqual([0, 5])

        expect(f(v.copy(new Vec2(90, 77)).toArray())).toEqual([90, 77])
        expect(f(v.reverse().toArray())).toEqual([-90, -77])
        expect(f(v.clone().toArray())).toEqual([-90, -77])

        expect(f(v.yx.toArray())).toEqual([-77, -90])
        expect(f(v.xyo.toArray())).toEqual([-90, -77, 0])
        expect(f(v.xoy.toArray())).toEqual([-90, 0, -77])
        expect(f(v.oyx.toArray())).toEqual([0, -77, -90])
        expect(f(v.oxy.toArray())).toEqual([0, -90, -77])
        expect(f(v.yxo.toArray())).toEqual([-77, -90, 0])
        expect(f(v.yox.toArray())).toEqual([-77, 0, -90])

    })

    test("Vec2 operators", () => {
        const a = new Vec2(3, 4);
        const b = new Vec2(13, 2);
        expect(Vec2.subVectors(a, b).toArray()).toEqual([-10, 2])
        expect(Vec2.addVectors(a, b).toArray()).toEqual([16, 6])
        expect(Vec2.crossVectors(a, b).toArray()).toEqual([0, 0, - 46])
        expect(Vec2.multilpyVectors(a, b).toArray()).toEqual([39, 8])
        expect(Vec2.dotVectors(a, b)).toEqual(47)
    })

})