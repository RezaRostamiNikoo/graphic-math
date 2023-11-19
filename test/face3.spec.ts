import { CircularLinkedList } from 'predefined-ds'
import { Face3, Polygon3, Vec3 } from '../src'

describe("Face3 Test File", () => {

    test('should first', () => {
        const points = new CircularLinkedList<Vec3>([
            new Vec3(0, 0, 0),
            new Vec3(10, 0, 0),
            new Vec3(0, 10, 0),
        ])
        const holepoints = new CircularLinkedList<Vec3>([
            new Vec3(1, 1, 0),
            new Vec3(3, 1, 0),
            new Vec3(1, 3, 0),
        ])
        const polygon = new Polygon3(points.toArray())
        const hole = new Polygon3(holepoints.toArray())

        const face = new Face3([polygon], [hole])
        const face2 = face.clone().translate(0, 0, 15)
        const mesh = face.extrude(15)


        const a = 1
    })

})