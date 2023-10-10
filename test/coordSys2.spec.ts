import { Vec2 } from "../src";
import { CoordSys2 } from "../src/CoordSys2"

const pricision = 2

const f = (value: any) => {
    if (typeof value === "number") return Number(Number(value).toFixed(pricision).replace('-0', '0'))
    if (Array.isArray(value)) return value.map(n => Number(Number(n).toFixed(pricision).replace('-0', '0')))
    return undefined
}

describe("Test scenarios for CoordSys2", () => {

    test('first', () => {
        const gcs = new CoordSys2();

        const lcs = new CoordSys2().setParent(gcs);
        const nclcs = lcs
        const clcs = lcs.clone()

        const l2 = new CoordSys2(new Vec2(1, 1), new Vec2(-1, 1)).setParent(gcs)

        lcs.rotateLocally(Math.PI / 2);
        expect(f(lcs.toArray())).toEqual([0, 1, -1, 0])
        expect(f(nclcs.toArray())).toEqual([0, 1, -1, 0])
        expect(f(clcs.toArray())).toEqual([1, 0, 0, 1])
        expect(f(lcs.toArray())).toEqual([0, 1, -1, 0])


        expect(f(l2.localToGlobal(new Vec2(1, -1)).toArray())).toEqual(f(new Vec2(Math.sqrt(2), 0).toArray()))
        expect(f(l2.globalToLocal(new Vec2(1, -1)).toArray())).toEqual(f(new Vec2(0, -Math.sqrt(2)).toArray()))

    })

})