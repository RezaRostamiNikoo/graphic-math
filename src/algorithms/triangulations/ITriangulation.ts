import { CircularLinkedList } from 'predefined-ds'
import { Mesh3, Vec3 } from "../../math"

export interface ITriangulation3 {
    generateMesh(vertices: CircularLinkedList<Vec3>, holes: CircularLinkedList<Vec3>[]): Mesh3
}