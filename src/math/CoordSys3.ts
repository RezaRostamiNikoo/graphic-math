import { Mat4 } from "./Mat4";
import { Vec3 } from "./Vec3";

/**
 * defines a cartesian coordinate system the direction od the coordinate axis in global space and also its origin location
 */
export class CoordSys3 {
    private _origin: Vec3;
    private _u: Vec3;
    private _v: Vec3;
    private _w: Vec3;

    private _parent: CoordSys3;

    constructor(u: Vec3, v: Vec3, w: Vec3, origin: Vec3 = new Vec3(0, 0, 0)) {
        this._u = u.normalize();
        this._v = v.normalize();
        this._w = w.normalize();
        this._origin = origin;
    }

    get u(): Vec3 { return this._u }
    get v(): Vec3 { return this._v }
    get w(): Vec3 { return this._w }
    get origin(): Vec3 { return this._origin }
    get parent(): CoordSys3 { return this._parent }

    /**
     * sets a parent coordinate system - actually it locks this coordinate system to its parent
     * @param {CoordSys3} coordSys3 
     * @returns {CoordSys3}
     */
    setParent(coordSys3: CoordSys3): this { this._parent = coordSys3; return this }


    /**
    * returns a transformation matrix to convert point from local location to parent's location
    * @returns {Mat4}
    */
    getMatLToP(): Mat4 { return Mat4.makeBasis(this._u, this._v, this._w).translate(this._origin.negate()) }
    /**
     * returns a transformation matrix to transform points from parent location to the local location
     * @returns {Mat4}
     */
    getMatPToL(): Mat4 { return this.getMatLToP().invert() }
    /**
     * returns a transformation matri to transform points from local to last coordinate system of the chain. 
     * base coordinate system. in case of having just one parent in chain it is equal to the transformation 
     * matrix from local to parent coordinate system
     * @returns {Mat4}
     */
    getMatLToG(): Mat4 {
        if (!this._parent) return Mat4.identity();
        if (!this._parent._parent) return this.getMatLToP();
        return this.getMatLToP().multiplyTo(this._parent.getMatLToG())
    }
    /**
     * returns a transformation matrix to transform from highest coordinate system in the coordinate systems chain 
     * to the local
     * @returns {Mat4}
     */
    getMatGToL(): Mat4 { return this.getMatLToG().invert() }

    /**
     * returns a copy of coordSys
     * @returns {CoordSys3}
     */
    clone(): CoordSys3 { return new CoordSys3(this._u.clone(), this._v.clone(), this._w, this._origin.clone()); }

    /**
     * it rotates the whole coordinate system around X axsis based on right hand rules
     * @param {CoordSys3} theta angle in radian
     * @returns {CoordSys3}
     */
    rotateX(theta: number): CoordSys3 {
        const origin = this.origin;
        this.getMatLToP()
            .translate(origin.clone().negate())
            .rotateX(theta)
            .translate(origin);
        return this;
    }

    /**
     * it rotates the whole coordinate system around Y axsis based on right hand rules
     * @param {CoordSys3} theta angle in radian
     * @returns {CoordSys3}
     */
    rotateY(theta: number): CoordSys3 {
        const origin = this.origin;
        this.getMatLToP()
            .translate(origin.clone().negate())
            .rotateY(theta)
            .translate(origin);
        return this;
    }

    /**
     * it rotates the whole coordinate system around Z axsis based on right hand rules
     * @param {CoordSys3} theta angle in radian
     * @returns {CoordSys3}
     */
    rotateZ(theta: number): CoordSys3 {
        const origin = this.origin;
        this.getMatLToP()
            .translate(origin.clone().negate())
            .rotateZ(theta)
            .translate(origin);
        return this;
    }

    applyMat4(mat: Mat4): CoordSys3 {
        this._u.applyMat4(mat)
        this._v.applyMat4(mat)
        this._w.applyMat4(mat)
        this._origin.applyMat4(mat)
        return this;
    }

    /**
     * this method generate the coordinate system from an angle between u and  axises
     * @param theta the angle of u axis and the X axis - Radian
     * @param origin the global coordinate od the local system
     * @returns CoorSys2
     */
    public static fromSphericalCoordSys(phi: number, theta: number, origin: Vec3 = new Vec3(0, 0, 0)) {
        return new CoordSys3(
            new Vec3(Math.cos(theta), Math.sin(theta)),
            new Vec3(-Math.sin(theta), Math.cos(theta)),
            origin);
    }

    /**
     * return a basic coordinate system with i,j,k normals
     * @returns {CoordSys3}
     */
    public static basicCoordSys3(): CoordSys3 {
        return new CoordSys3(
            new Vec3(1, 0, 0),
            new Vec3(0, 1, 0),
            new Vec3(0, 0, 1)
        )
    }
}