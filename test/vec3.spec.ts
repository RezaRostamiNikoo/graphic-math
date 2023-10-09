import { Vec3 } from "../src"
import { f } from "../src/utils";


describe(`Test for Vec3`, () => {

    test(`it test some methods:`, () => {
        const v = new Vec3(3, 4, 5);
        const length = Math.sqrt(9 + 16 + 25);
        expect(f(v.normalize().x)).toEqual(f(3 / length))
        expect(f(v.y)).toEqual(f(4 / length))
        expect(f(v.z)).toEqual(f(5 / length))
    })

    test(`deal with components of the vector`, () => {
        const v = new Vec3(3, 4, 5);
        expect(v.toArray()).toEqual([3, 4, 5])

        expect(v.set(6, 7, 8))
        expect(v.toArray()).toEqual([6, 7, 8])

        expect(v.setComponent(0, 90).setComponent(1, 2).setComponent(2, 45))
        expect(v.toArray()).toEqual([90, 2, 45])

        expect(v.setScalar(4))
        expect(v.toArray()).toEqual([4, 4, 4])

        expect(v.setX(55).setY(14).setZ(32))
        expect(v.toArray()).toEqual([55, 14, 32])

        expect(v.setX(55).setY(14).setZ(32))
        expect(v.toArray()).toEqual([55, 14, 32])

        expect(v.set(6, 6, 6).setLength(2))
        expect(v.toArray()).toEqual(Array(3).fill(6 / Math.sqrt(36 * 3) * 2))

        expect(f(Vec3.setFromCylindricalCoords(5, Math.PI / 2, 4).toArray())).toEqual([0, 5, 4])
        expect(f(Vec3.setFromSphericalCoords(5, Math.PI / 2, Math.PI / 2).toArray())).toEqual([0, 5, 0])

        expect(f(v.copy(new Vec3(90, 77, 44)).toArray())).toEqual([90, 77, 44])
        expect(f(v.reverse().toArray())).toEqual([-90, -77, -44])
        expect(f(v.clone().toArray())).toEqual([-90, -77, -44])

        expect(f(v.xy.toArray())).toEqual([-90, -77])
        expect(f(v.yx.toArray())).toEqual([-77, -90])
        expect(f(v.xz.toArray())).toEqual([-90, -44])
        expect(f(v.zx.toArray())).toEqual([-44, -90])
        expect(f(v.zy.toArray())).toEqual([-44, -77])
        expect(f(v.yz.toArray())).toEqual([-77, -44])
        expect(f(v.xyz.toArray())).toEqual([-90, -77, -44])
        expect(f(v.xzy.toArray())).toEqual([-90, -44, -77])
        expect(f(v.zyx.toArray())).toEqual([-44, -77, -90])
        expect(f(v.zxy.toArray())).toEqual([-44, -90, -77])
        expect(f(v.yxz.toArray())).toEqual([-77, -90, -44])
        expect(f(v.yzx.toArray())).toEqual([-77, -44, -90])

    })

    test("Vec3 operators", () => {
        const a = new Vec3(3, 4, 5);
        const b = new Vec3(13, 2, 7);
        expect(Vec3.subVectors(a, b).toArray()).toEqual([-10, 2, -2])
        expect(Vec3.addVectors(a, b).toArray()).toEqual([16, 6, 12])
        expect(Vec3.crossVectors(a, b).toArray()).toEqual([18, 44, -46])
        expect(Vec3.multilpyVectors(a, b).toArray()).toEqual([39, 8, 35])
        expect(Vec3.dotVectors(a, b)).toEqual(82)
    })

})