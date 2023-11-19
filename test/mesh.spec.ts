import { CircularLinkedList } from 'predefined-ds'
import { Face3, Mat4, Mesh3, Polygon3, Vec3, Vertex3 } from "../src"

describe('Mesh3 Test file', () => {

    test('should first', () => {
        const points = new CircularLinkedList<Vec3>([
            new Vec3(-20, -20, 0),
            new Vec3(20, -20, 0),
            new Vec3(20, 20, 0),
            new Vec3(-20, 20, 0)
        ])

        const polygon = new Polygon3(points.toArray())

        const face = new Face3([polygon])
        const mesh = face.extrude(15)

        mesh.applyMat4(Mat4.makeTranslation(0, 50, 0))

        const a = 1
    })

})