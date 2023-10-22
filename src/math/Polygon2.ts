import { CircularLinkedListNode, CircularLinkedList } from "predefined-ds";
import { Mat3, Mat4, Vec2, Vec3 } from ".";

export class Polygon2 {
    private _points: CircularLinkedList<Vec2>

    constructor(points: Array<Vec2>) {
        // TODO: check if next check is necessary 
        if (points.length < 3) throw new Error("Polygon2.constructor | length of points should be at lest three")
        this._points = new CircularLinkedList(points)
    }

    /** returns the polygon's points as Array */
    get points(): Array<Vec2> { return this._points.toArray() }

    /**
     * Takes an integer value and returns the point at that index, allowing for positive and negative integers. Negative integers count back from the last item in the array.
     * @param {number} index allowing negative value 
     * @returns {CircularLinkedListNode<Vec2>}
     */
    getPointAt(index: number): CircularLinkedListNode<Vec2> {
        return this._points.at(index)
    }

    /**
     * adds new point to the polyon
     * @param {Vec2} point 
     * @param {number} index index of where the point should be placed in the point list - if it is nor passed the points will be added to the end of list
     * @returns {Polygon3}
     */
    add(point: Vec2, index?: number): this {
        if (index) this._points.insertAt(point, index)
        else this._points.add(point)
        return this
    }

    /** clears the points */
    clear() { this._points = new CircularLinkedList() }

    /**
     * returns a copy of current polygon
     * @returns {Polygon2}
     */
    clone(): Polygon2 {
        const points = this._points.toArray().map(v => v.clone())
        const result = new Polygon2(points);
        return result;
    }

    /**
     * copys all the components of the given polygon to the current polygon
     * @param {Polygo2} polygon 
     * @returns {Polygo2}
     */
    copy(polygon: Polygon2): Polygon2 {
        this.clear()
        const _this = this;
        polygon.points.map(v => v.clone()).forEach(p => _this.add(p));
        return this;
    }

    applyMat3(mat: Mat3): Polygon2 {
        this.points.forEach(p => p.applyMat3(mat));
        return this;
    }

    // canMakeVolumeWith(polygon: Polygon3): boolean {
    //     if (this._points.length !== this._points.length) throw new Error(`Polygon3.canMakeVolumeWith | polygons do not have the same length of points`);
    //     return true;
    // }

    // toMesh3(holes: Array<Polygon3> = []): Mesh3 {
    //     return new EarcutTriangulation3().generateMesh(this._points, holes.map(h => h._points));
    // }

    toJson(): object {
        return this.points.map(p => p.toJson());
    }
}
