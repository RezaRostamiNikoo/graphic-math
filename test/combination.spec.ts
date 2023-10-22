import { Mat3, Mat4, Vec2, Vec3, gmUtils } from "../src"

const { f } = gmUtils

describe("combination of Vec2, Vec3, Mat3, Mat4", () => {

    test('Vec2 and Mat3', () => {

        const p1 = new Vec2(1, 1);
        const R1 = Mat3.makeRotation(Math.PI / 2)
        const S1 = Mat3.makeScale(3, 4)
        const T1 = Mat3.makeTranslation(3, 4)
        const B1 = Mat3.makeBasis(new Vec2(-1, 0), new Vec2(0, -1))
        const B2 = Mat3.makeBasis(new Vec2(1, 0), new Vec2(0, 1))
        const f1 = B2.clone().rotate(Math.PI / 2)

        const M1 = Mat3.makeRotation(-Math.PI / 2).translate(0, 1)

        expect(f(p1.clone().applyMat3(R1).toArray())).toEqual(f([-1, 1]))
        expect(f(p1.clone().applyMat3(S1).toArray())).toEqual(f([3, 4]))
        expect(f(p1.clone().applyMat3(T1).toArray())).toEqual(f([4, 5]))
        expect(f(p1.clone().applyMat3(B1).toArray())).toEqual(f([-1, -1]))
        expect(f(p1.clone().applyMat3(f1).toArray())).toEqual(f([-1, 1]))
        expect(f(p1.clone().applyMat3(M1).toArray())).toEqual([1, 0])
    })

    test('V3c3 and Mat4', () => {
        const p = new Vec3(1, 0, 0);

        const m1 = Mat4.makeRotationZ(Math.PI / 2).rotateX(-Math.PI / 2).rotateY(Math.PI * 3 / 2)
        const m2 = Mat4.makeBasis(
            new Vec3(0, 0, 1),
            new Vec3(1, 0, 0),
            new Vec3(0, 1, 0)
        ).invert();
        const m3 = Mat4.makeRotationAxis(new Vec3(1, 1, 0).normalize(), Math.PI)

        expect(f(p.clone().applyMat4(m1).toArray())).toEqual([1, 0, 0])
        expect(f(p.clone().applyMat4(m2).toArray())).toEqual([0, 1, 0])
        expect(f(p.clone().applyMat4(m3).toArray())).toEqual([0, 1, 0])




    })
})
