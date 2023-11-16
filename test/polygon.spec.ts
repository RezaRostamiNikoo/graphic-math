import { Mat4, Vec3, Polygon3 } from "../src"

describe("polygon", () => {


    test('1', () => {

        const v1 = new Vec3(0, 0, 0)
        const v2 = new Vec3(2, 0, 0)
        const v3 = new Vec3(2, 1, 0)

        const p = new Polygon3([v1, v2, v3])

        expect(p.toJson()).toEqual([
            { x: 0, y: 0, z: 0 },
            { x: 2, y: 0, z: 0 },
            { x: 2, y: 1, z: 0 },
        ])
        expect(p.points.map(v => v.toArray())).toEqual([[0, 0, 0], [2, 0, 0], [2, 1, 0],])

        p.add(new Vec3(0, 1, 0))
        expect(p.toJson()).toEqual([
            { x: 0, y: 0, z: 0 },
            { x: 2, y: 0, z: 0 },
            { x: 2, y: 1, z: 0 },
            { x: 0, y: 1, z: 0 },
        ])

        const m = Mat4.makeRotationX(Math.PI / 2)

        p.applyMat4(m)
        expect(p.toJson()).toEqual([
            { x: 0, y: 0, z: 0 },
            { x: 2, y: 0, z: 0 },
            { x: 2, y: 0, z: 1 },
            { x: 0, y: 0, z: 1 },
        ])


        console.log((p.toMesh3().toJson() as any).wireframes)

    })

})