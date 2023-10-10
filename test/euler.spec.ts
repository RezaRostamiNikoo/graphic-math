import { Euler } from "../src/Euler"
import Mat4 from "../src/Mat4"
import { f } from "../src/utils"

describe("Euler test", () => {

    test("test 1", () => {
        const e = new Euler(20, 50, 60, "XYZ")
        expect(e.toArray()).toEqual([20, 50, 60, "XYZ"])

        const t = Euler.fromArray([10, 20, 30, "ZXY"])
        expect(t.toArray()).toEqual([10, 20, 30, "ZXY"])

        expect(t.equals(e)).toEqual(false)
        expect(t.equals(new Euler(10, 20, 30, "ZXY"))).toEqual(true)

        expect(t.copy(e).equals(e)).toEqual(true)

        const mat = Mat4.makeRotationX(Math.PI)
        expect(f(e.clone().setFromRotationMatrix(mat).toArray())).toEqual(f([Math.PI, 0, 0, "XYZ"]))
    })

})