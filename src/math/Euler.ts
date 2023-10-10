// import { Quaternion, Mat4x4, MathUtils, Vector3 } from './';

import Mat4 from "./Mat4";
import Vec3 from "./Vec3";

const _matrix = /*@__PURE__*/ new Mat4();
// const _quaternion = /*@__PURE__*/ new Quaternion();

export type EulerOrder = "XYZ" | "XZY" | "YXZ" | "YZX" | "ZXY" | "ZYX";

export default class Euler {

    public static DEFAULT_ORDER: EulerOrder = "XYZ";

    isEuler: boolean = true;

    private _x: number;
    private _y: number;
    private _z: number;
    private _order: EulerOrder;

    /**
     * creates a Euler object to store rotational amounts for an entity and the order of rotations
     * @param {number} x angle (in radian) of rotation arround x axis  
     * @param {number} y angle (in radian) of rotation arround y axis  
     * @param {number} z angle (in radian) of rotation arround z axis
     * @param {EulerOrder} order 
     */
    constructor(x: number = 0, y: number = 0, z: number = 0, order: EulerOrder = Euler.DEFAULT_ORDER) {
        this._x = x;
        this._y = y;
        this._z = z;
        this._order = order;
    }

    /** returns first component */
    get x(): number { return this._x; }
    /** sets first component */
    set x(value) { this._x = value; this._onChangeCallback(); }

    /** returns second component */
    get y(): number { return this._y; }
    /** sets second component */
    set y(value) { this._y = value; this._onChangeCallback(); }

    /** returns third component */
    get z(): number { return this._z; }
    /** sets third component */
    set z(value) { this._z = value; this._onChangeCallback(); }

    /** returns order of the euler */
    get order(): EulerOrder { return this._order; }
    /** sets order of the euler */
    set order(value) { this._order = value; this._onChangeCallback(); }

    /**
     * sets euler components
     * @param {number} x first compnent - angle (in radian) of rotation arround x axis 
     * @param {number} y second component - angle (in radian) of rotation arround y axis  
     * @param {number} z third component - angle (in radian) of rotation arround z axis
     * @param {EulerOrder} order order of euler - indicates order of applying rotations
     * @returns {Euler}
     */
    set(x: number, y: number, z: number, order: EulerOrder = this._order): this {
        this._x = x;
        this._y = y;
        this._z = z;
        this._order = order;
        this._onChangeCallback();
        return this;
    }

    /**
     * return a copy of current euler 
     * @returns {Euler} new Euler
     */
    clone() { return new Euler(this._x, this._y, this._z, this._order); }


    /**
     * copys given euler's component and puts them into the current euler components
     * @param {Euler} euler 
     * @returns {Euler} current Euler with changed components
     */
    copy(euler: Euler) {
        this._x = euler._x;
        this._y = euler._y;
        this._z = euler._z;
        this._order = euler._order;
        this._onChangeCallback();
        return this;
    }


    setFromRotationMatrix(m: Mat4, order: EulerOrder = this._order, update: boolean = true) {

        // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

        const te = m.elements;
        const m11 = te[0], m12 = te[4], m13 = te[8];
        const m21 = te[1], m22 = te[5], m23 = te[9];
        const m31 = te[2], m32 = te[6], m33 = te[10];

        switch (order) {

            case 'XYZ':

                this._y = Math.asin(Math.max(-1, Math.min(m13, 1)))

                if (Math.abs(m13) < 0.9999999) {

                    this._x = Math.atan2(- m23, m33);
                    this._z = Math.atan2(- m12, m11);

                } else {

                    this._x = Math.atan2(m32, m22);
                    this._z = 0;

                }

                break;

            case 'YXZ':

                this._x = Math.asin(- Math.max(-1, Math.min(m23, 1)));

                if (Math.abs(m23) < 0.9999999) {

                    this._y = Math.atan2(m13, m33);
                    this._z = Math.atan2(m21, m22);

                } else {

                    this._y = Math.atan2(- m31, m11);
                    this._z = 0;

                }

                break;

            case 'ZXY':

                this._x = Math.asin(Math.max(-1, Math.min(m32, 1)));

                if (Math.abs(m32) < 0.9999999) {

                    this._y = Math.atan2(- m31, m33);
                    this._z = Math.atan2(- m12, m22);

                } else {

                    this._y = 0;
                    this._z = Math.atan2(m21, m11);

                }

                break;

            case 'ZYX':

                this._y = Math.asin(- Math.max(-1, Math.min(m31, 1)));

                if (Math.abs(m31) < 0.9999999) {

                    this._x = Math.atan2(m32, m33);
                    this._z = Math.atan2(m21, m11);

                } else {

                    this._x = 0;
                    this._z = Math.atan2(- m12, m22);

                }

                break;

            case 'YZX':

                this._z = Math.asin(Math.max(-1, Math.min(m21, 1)));

                if (Math.abs(m21) < 0.9999999) {

                    this._x = Math.atan2(- m23, m22);
                    this._y = Math.atan2(- m31, m11);

                } else {

                    this._x = 0;
                    this._y = Math.atan2(m13, m33);

                }

                break;

            case 'XZY':

                this._z = Math.asin(- Math.max(-1, Math.min(m12, 1)));

                if (Math.abs(m12) < 0.9999999) {

                    this._x = Math.atan2(m32, m22);
                    this._y = Math.atan2(m13, m11);

                } else {

                    this._x = Math.atan2(- m23, m33);
                    this._y = 0;

                }

                break;

            default:

                console.warn('Euler.setFromRotationMatrix() encountered an unknown order: ' + order);

        }

        this._order = order;

        if (update === true) this._onChangeCallback();

        return this;

    }

    // setFromQuaternion(q: Quaternion, order: string, update: boolean) {

    //     Mat4x4.makeRotationFromQuaternion(q);

    //     return this.setFromRotationMatrix(_matrix, order, update);

    // }

    /**
     * 
     * @param {Vec3} v rotation angles stored in a vector 
     * @param {EulerOrder} order order of euler - indicates order of applying rotations
     * @returns 
     */
    setFromVector3(v: Vec3, order: EulerOrder = this._order) {
        return this.set(v.x, v.y, v.z, order);
    }

    reorder(newOrder: string) {

        // WARNING: this discards revolution information -bhouston

        // Quaternion.setFromEuler(this);

        // return this.setFromQuaternion(_quaternion, newOrder);

    }

    /**
     * compare the euler with given euler 
     * @param {Euler} euler 
     * @returns {boolean}
     */
    equals(euler: Euler) {
        return (euler._x === this._x) && (euler._y === this._y) && (euler._z === this._z) && (euler._order === this._order);
    }

    /** 
     * returns an array with all Euler components
     * @example
     *  [x,y,z,order]
     * @param {Array<number>} array
     * @param {number} offset
     *  */
    toArray(array: Array<any> = [], offset = 0) {

        array[offset] = this._x;
        array[offset + 1] = this._y;
        array[offset + 2] = this._z;
        array[offset + 3] = this._order;

        return array;

    }

    _onChange(callback: any) {

        this._onChangeCallback = callback;

        return this;

    }

    _onChangeCallback() { }

    *[Symbol.iterator]() {

        yield this._x;
        yield this._y;
        yield this._z;
        yield this._order;

    }

    /**
     * create an euler from an array
     * @param {Array<any>} array 
     * @returns {Euler}
     */
    public static fromArray(array: Array<any>) {
        return new Euler(
            array[0],
            array[1],
            array[2],
            array[3] ?? Euler.DEFAULT_ORDER
        )
    }
}

export { Euler }