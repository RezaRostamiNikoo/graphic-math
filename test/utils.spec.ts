import { Mat4, Vec3, Polygon3, gmUtils } from "../src"

describe("utils", () => {


    test('curve point', () => {
        const n = new Vec3(10, -10, 0)
        const c = new Vec3(-10, -10, 0)
        const p = new Vec3(-10, 10, 0)

        const points = gmUtils.curveThePoint(p, c, n, 5)

        const a = 2
    })

})