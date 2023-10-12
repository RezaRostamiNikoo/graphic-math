import { DoublyLinkedList, DoublyLinkedListNode } from "predefined-ds";
import { Mat4, Vec3 } from "./";

export default class Polyline3 {
    private _points: DoublyLinkedList<Vec3>;

    constructor(points: Array<Vec3>) {
        this._points = new DoublyLinkedList<Vec3>();
        if (points.length) points.forEach(p => { this.add(p); });
    }

    /**
     * adds points to the polyline
     * @param {Array<Vec3>} vectors 
     * @returns {Polyline3}
     */
    add(...vectors: Array<Vec3>): Polyline3 {
        vectors.forEach(v => this._points.add(v))
        return this;
    }

    /**
     * applys a transformation matrix to all points in the polyline
     * @param {Mat4} mat 
     * @returns {Polyline3}
     */
    applyMat4(mat: Mat4): Polyline3 {
        this._points.forEach(p => p.value.applyMat4(mat))
        return this;
    }


    toJson(): object {
        return this._points.map(p => p.value.toJson());
    }
}