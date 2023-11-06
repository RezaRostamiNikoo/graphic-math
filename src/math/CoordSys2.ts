import { Mat3 } from "./Mat3";
import { Vec2 } from "./Vec2";

/**
 * this Class define the direction od the coordinate axis in global space and also its origin location
 */
export class CoordSys2 {
    private _origin: Vec2;
    private _u: Vec2;
    private _v: Vec2;

    private _parent: CoordSys2;

    get isBaseCoordSys2(): boolean { return this._parent ? false : true }


    /**
     * 
     * @param u 
     * @param v 
     * @param origin 
     */
    constructor(u: Vec2 = new Vec2(1, 0), v: Vec2 = new Vec2(0, 1), origin: Vec2 = new Vec2(0, 0)) {
        this._u = u.normalize();
        this._v = v.normalize();
        this._origin = origin;
    }

    get u(): Vec2 { return this._u }
    get v(): Vec2 { return this._v }
    get origin(): Vec2 { return this._origin }
    get parent(): CoordSys2 { return this._parent }

    /**
     * sets a parent coordinate system - actually it locks this coordinate system to its parent
     * @param {CoordSys2} coordSys2 
     * @returns {CoordSys2}
     */
    setParent(coordSys2: CoordSys2): this { this._parent = coordSys2; return this }

    /**
     * returns a transformation matrix to convert point from local location to parent's location
     * @returns {Mat3}
     */
    getMatLToP(): Mat3 { return Mat3.makeBasis(this._u, this._v).translate(this._origin.negate()) }

    /**
     * returns a transformation matrix to transform points from parent location to the local location
     * @returns {Mat3}
     */
    getMatPToL(): Mat3 { return this.getMatLToP().clone().invert() }

    /**
     * returns a transformation matri to transform points from local to last coordinate system of the chain. 
     * base coordinate system. in case of having just one parent in chain it is equal to the transformation 
     * matrix from local to parent coordinate system
     * @returns {Mat3}
     */
    getMatLToG(): Mat3 {
        if (!this._parent) return Mat3.identity();
        if (!this._parent._parent) return this.getMatLToP();
        return this.getMatLToP().multiplyTo(this._parent.getMatLToG())
    }
    /**
     * returns a transformation matrix to transform from highest coordinate system in the coordinate systems chain 
     * to the local
     * @returns {Mat3}
     */
    getMatGToL(): Mat3 { return this.getMatLToG().invert() }

    /**
     * creates a copy from coordSys
     * @returns {CoordSys2}
     */
    clone(): CoordSys2 { return new CoordSys2(this._u.clone(), this._v.clone(), this._origin.clone()).setParent(this._parent) }

    /**
     * rotates the coordinate system and its normals counter clockwise
     * @param {number} theta angle in radian counter clockwise
     * @returns {CoordSys2}
     */
    rotateLocally(theta: number): CoordSys2 {
        if (this.isBaseCoordSys2) return this;
        const Rm = Mat3.makeRotation(theta);
        this._u.applyMat3(Rm)
        this._v.applyMat3(Rm)
        return this;
    }

    /**
     * translates this coordinate system in parent cartesian coordinate system space 
     * @param {Vec2} vec 
     * @returns {CoordSys2}
     */
    translate(vec: Vec2): this {
        if (this.isBaseCoordSys2) return this
        const tm = Mat3.makeTranslation(vec.x, vec.y)
        this._origin.applyMat3(tm)
        return this
    }

    /**
     * return an array which represents all the components of its normals
     */
    toArray(): Array<number> { return [...this._u.toArray(), ...this._v.toArray()] }

    /**
     * this method generate the coordinate system from an angle between u and X axises - how many degree do you want yo rotate. if you want to rotate the coordinate system clockwise is positive and counter clockwise is negative
     * @param theta the angle of u axis and the X axis - Radian
     * @param origin the global coordinate od the local system
     * @returns CoordSys2
     */
    public static fromAngle(theta: number, origin: Vec2 = new Vec2()) {
        return new CoordSys2(
            new Vec2(Math.cos(theta), -Math.sin(theta)),
            new Vec2(Math.sin(theta), Math.cos(theta)),
            origin);
    }
}
