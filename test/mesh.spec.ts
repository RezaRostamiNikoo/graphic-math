import { Mat4, Mesh3, Vec3, Vertex3 } from "../src"

describe('Mesh3 Test file', () => {

    test('should first', () => {
        const mesh = new Mesh3(
            [
                new Vertex3(new Vec3(0, 0, 0)),
                new Vertex3(new Vec3(2, 0, 0)),
                new Vertex3(new Vec3(1, 1, 0)),
                new Vertex3(new Vec3(0, 2, 0)),
                new Vertex3(new Vec3(-1, 1, 0)),
                new Vertex3(new Vec3(-2, 0, 0)),
                new Vertex3(new Vec3(-1, - 1, 0)),
                new Vertex3(new Vec3(0, -2, 0)),
                new Vertex3(new Vec3(1, -1, 0)),
            ],
            [
                1, 2, 0,
                2, 3, 0,
                3, 4, 0,
                4, 5, 0,
                5, 6, 0,
                6, 7, 0,
                7, 8, 0,
                8, 1, 0,
            ])

        mesh.applyMat4(Mat4.makeRotationZ(Math.PI / 2))

        console.log(JSON.stringify(mesh.toJson()))

    })

})