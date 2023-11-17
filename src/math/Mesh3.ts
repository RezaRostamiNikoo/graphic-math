// import { Obj } from "../formats"
// import { Face3, Mat4x4, Polygon3, Vertex3 } from "."

import { Face3 } from "./Face3"
import { Mat4 } from "./Mat4"
import { Polygon3 } from "./Polygon3"
import { Vec3 } from "./Vec3"
import { Vertex3 } from "./Vertex3"

export class Mesh3 {

    private _vertices: Array<Vertex3> = []
    private _indices: Array<number> = []

    constructor(vertices: Array<Vertex3> = [], indices: Array<number> = []) {
        this.addTriangles(vertices, indices)
    }

    /**
     * this method adds the vertex to the list of vertices of the mesh. but it checks if there is the same 
     * vertex in the list it just returns its index and does not add the vertex to keep the mesh 
     * as small as possible
     * @param vertex the vertex that you want to add
     * @returns 
     */
    private addVertex(vertex: Vertex3): number {
        this._vertices.push(vertex)
        return this._vertices.length - 1
    }

    /**
     * adds a new triangle to the mesh. i
     * t also optimize the vertices in this way that it prevent to save repetitive vertext 
     * @param {Array<Vertex3>} vertices 
     * @param {Array<number>} indices 
     * @returns {Mesh3}
     */
    addTriangles(vertices: Array<Vertex3>, indices: Array<number>): this {
        const modifiedIndices = indices.map(v => -1)
        for (let i = 0; i < vertices.length; i++) {
            const vertex = vertices[i]
            let nextIndex = this.addVertex(vertex)
            const indicesToBeChanged: Array<number> = []
            indices.forEach((v, ii) => { if (v === i) indicesToBeChanged.push(ii) })
            indicesToBeChanged.forEach(v => {
                modifiedIndices[v] = nextIndex
            })
        }
        this._indices.push(...modifiedIndices)
        return this
    }

    /**
     * returns a copy of this mesh
     * @returns {Mesh3}
     */
    clone(): Mesh3 {
        const result = new Mesh3(this._vertices.map(v => v.clone()), [...this._indices])
        return result
    }

    /**
     * copys all the vertices and indices of the given mesh to the current mesh
     * @param {Mesh3} mesh 
     * @returns {Mesh3}
     */
    copy(mesh: Mesh3): this {
        this._vertices = mesh.clone()._vertices
        this._indices = [...this._indices]
        return this
    }

    /**
     * combines given mesh to the current mesh
     * @param {Mesh3} mesh 
     * @returns {Mesh3}
     */
    mergeOne(mesh: Mesh3): this {
        this.addTriangles(mesh._vertices, mesh._indices)
        return this
    }

    /**
     * merges all given meshes to the current mesh
     * @param {Array<Mesh3>} meshs 
     * @returns {Mesh3}
     */
    mergeMany(meshs: Array<Mesh3>): this {
        meshs.forEach(m => this.mergeOne(m))
        return this
    }

    /**
     * applys a transformation matrix to all vertices of this faces
     * @param {Mat4} mat 
     * @returns {Mesh3}
     */
    applyMat4(mat: Mat4): this {
        this._vertices.forEach(v => v.applyMat4(mat))
        return this
    }

    toJson(): object {
        return {
            vertices: this._vertices.map(v => v.toJson()),
            indices: this._indices
        }
    }

    // toObj(): Obj {
    //     return new Obj(this.vertices, this.indices)
    // }

    /**
     * converts mesh to position attributes ready to be added in webgl array buffer as position attributes
     * @returns {Array<number>}
     */
    toPositionAttribute(order: "XYZ" | "XZY" | "YXZ" | "YZX" | "ZXY" | "ZYX" = "XYZ"): Array<number> {
        switch (order) {
            case "XYZ": return this._indices.flatMap(i => this._vertices[i].position.xyz.toArray())
            case "XZY": return this._indices.flatMap(i => this._vertices[i].position.xzy.toArray())
            case "YXZ": return this._indices.flatMap(i => this._vertices[i].position.yxz.toArray())
            case "YZX": return this._indices.flatMap(i => this._vertices[i].position.yzx.toArray())
            case "ZXY": return this._indices.flatMap(i => this._vertices[i].position.zxy.toArray())
            case "ZYX": return this._indices.flatMap(i => this._vertices[i].position.zyx.toArray())
            default: return this._indices.flatMap(i => this._vertices[i].position.xyz.toArray())
        }

    }

    /////////////////////////////////////////////
    public static sidesFromTwoPolygons(p1: Polygon3, p2: Polygon3): Mesh3 {
        if (!p1.canMakeVolumeWith(p2)) return null
        const result = new Mesh3()
        for (let i = 0; i < p1.points.length; i++) {
            result.addTriangles(
                [
                    new Vertex3(p1.getPointAt(i).value),
                    new Vertex3(p1.getPointAt(i).next.value),
                    new Vertex3(p2.getPointAt(i).next.value),
                    new Vertex3(p2.getPointAt(i).value)
                ],
                [0, 1, 2, 0, 2, 3]
            )
        }
        return result
    }

    public static fromTwoFaces(f1: Face3, f2: Face3): Mesh3 {
        if (!f1.canMakeVolumeWith(f2)) return null
        const result = new Mesh3()
        result.mergeOne(f1.toMesh3())
        result.mergeOne(f2.toMesh3())
        result.mergeOne(Mesh3.sidesFromTwoFaces(f1, f2))
        return result
    }

    public static sidesFromTwoFaces(f1: Face3, f2: Face3): Mesh3 {
        if (!f1.canMakeVolumeWith(f2)) return null
        const result = new Mesh3()
        for (let ip = 0; ip < f1.polygons.length; ip++) {
            result.mergeOne(Mesh3.sidesFromTwoPolygons(f1.polygons[ip], f2.polygons[ip]))
        }
        for (let ih = 0; ih < f1.holes.length; ih++) {
            result.mergeOne(Mesh3.sidesFromTwoPolygons(f1.holes[ih], f2.holes[ih]))
        }
        return result
    }

    /**
     * extrudes a face in a direction - default direction is the face normal vector direction
     * @param {Face3} face 
     * @param {number} thickness 
     * @param {Vec3} direction 
     * @returns {Mesh3}
     */
    public static extrudeFace(face: Face3, thickness: number, direction?: Vec3): Mesh3 {
        const faceB = face.clone().translate(
            direction
                ? direction.normalize().multiplyScalar(thickness)
                : face.normal.multiplyScalar(thickness)
        )
        return Mesh3.fromTwoFaces(face, faceB)
    }
}
