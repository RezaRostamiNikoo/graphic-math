import { CircularLinkedListNode, CircularLinkedList } from "predefined-ds";
import { Mat4, Mesh3, Vec3 } from "./";
import EarcutTriangulation3 from '../algorithms/triangulations/EarcutTriangulation3';

export class Polygon3 {
    private _points: CircularLinkedList<Vec3>

    constructor(points: Array<Vec3>) {
        // TODO: check if next check is necessary 
        if (points.length < 3) throw new Error("Polygon3.constructor | length of points should be at lest three")
        this._points = new CircularLinkedList(points)
    }

    /** returns the polygon's points as Array */
    get points(): Array<Vec3> { return this._points.toArray() }

    /**
     * Takes an integer value and returns the point at that index, allowing for positive and negative integers. Negative integers count back from the last item in the array.
     * @param {number} index allowing negative value 
     * @returns {CircularLinkedListNode<Vec3>}
     */
    getPointAt(index: number): CircularLinkedListNode<Vec3> {
        return this._points.at(index)
    }

    /**
     * adds new point to the polyon
     * @param {Vec3} point 
     * @param {number} index index of where the point should be placed in the point list - if it is nor passed the points will be added to the end of list
     * @returns {Polygon3}
     */
    add(point: Vec3, index?: number): this {
        if (index) this._points.insertAt(point, index)
        else this._points.add(point)
        return this
    }

    /** clears the points */
    clear() { this._points = new CircularLinkedList() }

    /**
     * returns a copy of current polygon
     * @returns {Polygon3}
     */
    clone(): Polygon3 {
        const points = this._points.toArray().map(v => v.clone())
        const result = new Polygon3(points);
        return result;
    }

    /**
     * copys all the components of the given polygon to the current polygon
     * @param {Polygon} polygon 
     * @returns {Polygon3}
     */
    copy(polygon: Polygon3): Polygon3 {
        this.clear()
        const _this = this;
        polygon.points.map(v => v.clone()).forEach(p => _this.add(p));
        return this;
    }

    applyMat4(mat: Mat4): Polygon3 {
        this.points.forEach(p => p.applyMat4(mat));
        return this;
    }

    canMakeVolumeWith(polygon: Polygon3): boolean {
        if (this._points.length !== this._points.length) throw new Error(`Polygon3.canMakeVolumeWith | polygons do not have the same length of points`);
        return true;
    }

    toMesh3(holes: Array<Polygon3> = []): Mesh3 {
        const result = new EarcutTriangulation3().generateMesh(this._points, holes.map(h => h._points));
        return result
    }

    toJson(): object {
        return this.points.map(p => p.toJson());
    }
}
