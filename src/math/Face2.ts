// import { Mesh3, Vec3, EarcutTriangulation3, Mat4x4, } from "./";
// import { Obj } from "../formats";

import { Mat3, Polygon3, Vec3, Polygon2, Vec2 } from ".";

export class Face2 {

    private _polygons: Array<Polygon2>;
    private _holes: Array<Polygon2>;

    constructor(polygons: Array<Polygon2> = [], holes: Array<Polygon2> = []) {
        this._polygons = polygons;
        this._holes = holes;
    }

    /** returns all the polygons included in this face */
    get polygons(): Array<Polygon2> { return this._polygons }
    /** returns all the holes included in this face */
    get holes(): Array<Polygon2> { return this._holes }

    /**
     * adds a polygon to the face
     * @param {Polygon2} polygon 
     * @returns {Face3}
     */
    addPolygon(polygon: Polygon2): this {
        this._polygons.push(polygon);
        return this;
    }

    /**
     * adds a list of polygon the the existing list
     * @param {Array<Polygon2>} polygons 
     * @returns {Face3}
     */
    addPolygons(polygons: Array<Polygon2>): this {
        polygons.forEach(p => this.addPolygon(p));
        return this;
    }

    /**
     * adds a hole to the face
     * @param {Polygon2} polygon 
     * @returns {Face2}
     */
    addHole(hole: Polygon2): this {
        this._holes.push(hole);
        return this;
    }

    /**
     * adds a list of holes the the existing list
     * @param {Array<Polygon2>} polygons 
     * @returns {Face3}
     */
    addHoles(holes: Array<Polygon2>): this {
        holes.forEach(p => this.addHole(p));
        return this;
    }

    /**
     * merge another face's polygons and holes this face
     * @param {Face3} face 
     * @returns {Face3}
     */
    mergeOne(face: Face2): this {
        this.addPolygons(face._polygons);
        this.addHoles(face._holes);
        return this;
    }
    /**
     * merge some faces' polygons and holes this face
     * @param {Array<Face2>} face 
     * @returns {Face2}
     */
    mergeMany(faces: Array<Face2>): this {
        faces.forEach(f => this.mergeOne(f));
        return this;
    }

    /**
     * return a copy of the face
     * @returns {Face3}
     */
    clone(): Face2 {
        return new Face2(this._polygons.map(p => p.clone()), this._holes.map(h => h.clone()));
    }

    /**
     * copys all the components of the given face to this face
     * @param {Face2} face 
     * @returns {Face2}
     */
    copy(face: Face2): this {
        this._polygons = face.polygons
        this._holes = face.holes
        return this
    }

    /**
     * applys transformation matrix to the face
     * @param {Mat3} mat 
     * @returns {Face2}
     */
    applyMat3(mat: Mat3): this {
        this._polygons.forEach(p => p.applyMat3(mat));
        this._holes.forEach(p => p.applyMat3(mat));
        return this;
    }

    /**
     * moves the face
     * @param {number} dx movement length in x direction
     * @param {number} dy movement length in y direction
     * @param {number} dz movement length in z direction
     * @returns {Face2}
     */
    translate(dx: number, dy: number): this;
    /**
     * moves the faces toward given vector
     * @param {Vec2} vec 
     * @returns {Face2}
     */
    translate(vec: Vec2): this;
    translate(dx: number | Vec2, dy?: number): this {
        this.polygons.forEach(p => p.applyMat3(Mat3.makeTranslation(dx as number, dy)))
        return this
    }

    // canMakeVolumeWith(face: Face2): boolean {
    //     if (this._polygons.length !== face._polygons.length) throw new Error(`Face3.canMakeVolumeWith | Faces do not have the same polygon`);
    //     if (this._holes.length !== face._holes.length) throw new Error(`Face3.canMakeVolumeWith | Faces do not have the same holes`);
    //     return true;
    // }

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
