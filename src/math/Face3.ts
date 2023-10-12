// import { Mesh3, Vec3, EarcutTriangulation3, Mat4x4, } from "./";
// import { Obj } from "../formats";

import { Mat4 } from "./Mat4";
import { Polygon3 } from "./Polygon3";
import { Vec3 } from "./Vec3";

export class Face3 {

    private _polygons: Array<Polygon3>;
    private _holes: Array<Polygon3>;

    constructor(polygons: Array<Polygon3> = [], holes: Array<Polygon3> = []) {
        this._polygons = polygons;
        this._holes = holes;
    }

    /** returns all the polygons included in this face */
    get polygons(): Array<Polygon3> { return this._polygons }
    /** returns all the holes included in this face */
    get holes(): Array<Polygon3> { return this._holes }

    /**
     * adds a polygon to the face
     * @param {Polygon3} polygon 
     * @returns {Face3}
     */
    addPolygon(polygon: Polygon3): this {
        this._polygons.push(polygon);
        return this;
    }

    /**
     * adds a list of polygon the the existing list
     * @param {Array<Polygon3>} polygons 
     * @returns {Face3}
     */
    addPolygons(polygons: Array<Polygon3>): this {
        polygons.forEach(p => this.addPolygon(p));
        return this;
    }

    /**
     * adds a hole to the face
     * @param {Polygon3} polygon 
     * @returns {Face3}
     */
    addHole(hole: Polygon3): this {
        this._holes.push(hole);
        return this;
    }

    /**
     * adds a list of holes the the existing list
     * @param {Array<Polygon3>} polygons 
     * @returns {Face3}
     */
    addHoles(holes: Array<Polygon3>): this {
        holes.forEach(p => this.addHole(p));
        return this;
    }

    /**
     * merge another face's polygons and holes this face
     * @param {Face3} face 
     * @returns {Face3}
     */
    mergeOne(face: Face3): this {
        this.addPolygons(face._polygons);
        this.addHoles(face._holes);
        return this;
    }
    /**
     * merge some faces' polygons and holes this face
     * @param {Array<Face3>} face 
     * @returns {Face3}
     */
    mergeMany(faces: Array<Face3>): this {
        faces.forEach(f => this.mergeOne(f));
        return this;
    }

    /**
     * return a copy of the face
     * @returns {Face3}
     */
    clone(): Face3 {
        return new Face3(this._polygons.map(p => p.clone()), this._holes.map(h => h.clone()));
    }

    /**
     * copys all the components of the given face to this face
     * @param {Face3} face 
     * @returns {Face3}
     */
    copy(face: Face3): this {
        this._polygons = face.polygons
        this._holes = face.holes
        return this
    }

    /**
     * applys transformation matrix to the face
     * @param {Mat4} mat 
     * @returns {Face3}
     */
    applyMat4(mat: Mat4): Face3 {
        this._polygons.forEach(p => p.applyMat4(mat));
        this._holes.forEach(p => p.applyMat4(mat));
        return this;
    }

    canMakeVolumeWith(face: Face3): boolean {
        if (this._polygons.length !== face._polygons.length) throw new Error(`Face3.canMakeVolumeWith | Faces do not have the same polygon`);
        if (this._holes.length !== face._holes.length) throw new Error(`Face3.canMakeVolumeWith | Faces do not have the same holes`);
        return true;
    }

    // toMesh3(): Mesh3 {
    //     const meshes = this.polygons.map(p => p.toMesh3(this.holes));
    //     const result = new Mesh3().mergeMany(meshes);
    //     return result;
    // }

    toJson(): object {
        return {
            polygons: this._polygons.map(p => p.toJson()),
            holes: this._holes.map(p => p.toJson()),
        };
    }

    /** return normal of the face based on right hand rule - so the order of the polygons should be counterclockwise */
    get normal(): Vec3 {
        const points = this._polygons[0].points;
        return points[1].clone().sub(points[0].clone()).cross(points[2].clone().sub(points[0].clone())).normalize();
    }

    // extrude(thickness: number): Mesh3 {
    //     const faceB = this.clone().translate(this.normal.multiplyScalar(thickness));
    //     return Mesh3.fromTwoFaces(this, faceB);
    // }




    // toObj(): Obj {
    //     const mesh = this.toMesh3();
    //     return new Obj(mesh.vertices, mesh.indices);
    // }
}
