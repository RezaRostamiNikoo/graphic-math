import { Mat4, Vec3 } from "./";

export default class Line3 {
    private _point: Vec3;
    private _normal: Vec3;

    constructor(onePoint: Vec3, normal: Vec3) {
        this._point = onePoint;
        this._normal = normal.normalize();
    }


    applyMat4x4(mat: Mat4): Line3 {
        this._point.applyMat4(mat);
        this._normal.applyMat4(mat);
        return this;
    }

    toJson(): object {
        return {
            point: this._point.toJson(),
            normal: this._normal.toJson()
        }
    }
}