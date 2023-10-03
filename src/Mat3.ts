/*
this class is from threejs class (Matrix3)
the link is: https://github.com/mrdoob/three.js/blob/dev/src/math/Matrix3.js
*/

import Vec2 from "./Vec2";

// import { CoorSys2, Vector2 } from ".";

/**
 * for this we have assume that all Vectors are a Matrix 1x3 not 3x1
 */
export default class Mat3 {

    isMat3: boolean = true;

    elements: Array<number>;

    constructor(
        a11: number = 1, a12: number = 0, a13: number = 0,
        a21: number = 0, a22: number = 1, a23: number = 0,
        a31: number = 0, a32: number = 0, a33: number = 1,
    ) {
        this.elements = [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ];
        this.set(a11, a12, a13, a21, a22, a23, a31, a32, a33);
    }

    /**
     * this method sets the elements of the current matrix and returns the current matrix
     * @returns {Mat3}
     */
    set(a11: number, a12: number, a13: number,
        a21: number, a22: number, a23: number,
        a31: number, a32: number, a33: number): Mat3 {

        const te = this.elements;

        te[0] = a11; te[1] = a12; te[2] = a13;
        te[3] = a21; te[4] = a22; te[5] = a23;
        te[6] = a31; te[7] = a32; te[8] = a33;

        return this;

    }

    /**
     * multiply mat to the current matrix
     * @example
     * mat * this
     * @param {Mat3} mat 
     * @returns 
     */
    premultiply(mat: Mat3) { return this.copy(Mat3.multiplyMatrices(mat, this)) }

    /**
     * multiply the current mat to the given mat
     * @example
     * this * mat
     * @param {Mat3} m 
     * @returns 
     */
    multiplyTo(m: Mat3) { return this.copy(Mat3.multiplyMatrices(this, m)) }


    /**
     * multiplys a scalar number to the all components of the matrix
     * @example
     *      | 1 2 3 |    | 6  12 18 |
     *  6 * | 4 5 6 | => | 24 30 36 |
     *      | 7 8 9 |    | 42 48 54 |
     * @param {number} scalar 
     * @returns 
     */
    multiplyScalar(scalar: number) {

        const te = this.elements;

        te[0] *= scalar; te[3] *= scalar; te[6] *= scalar;
        te[1] *= scalar; te[4] *= scalar; te[7] *= scalar;
        te[2] *= scalar; te[5] *= scalar; te[8] *= scalar;

        return this;

    }

    /**
     * calculates the detetminant of the matrix
     * @returns {number}
     */
    determinant() {

        const te = this.elements;

        const a = te[0], b = te[1], c = te[2],
            d = te[3], e = te[4], f = te[5],
            g = te[6], h = te[7], i = te[8];

        return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;

    }

    /**
     * calculates the invert of the matrix. if there is no invert (determinant=0) returns a zero matrix (all components are 0)
     * @returns {Mat3}
     */
    invert() {

        const te = this.elements,

            n11 = te[0], n21 = te[1], n31 = te[2],
            n12 = te[3], n22 = te[4], n32 = te[5],
            n13 = te[6], n23 = te[7], n33 = te[8],

            t11 = n33 * n22 - n32 * n23,
            t12 = n32 * n13 - n33 * n12,
            t13 = n23 * n12 - n22 * n13,

            det = n11 * t11 + n21 * t12 + n31 * t13;

        if (det === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);

        const detInv = 1 / det;

        te[0] = t11 * detInv;
        te[1] = (n31 * n23 - n33 * n21) * detInv;
        te[2] = (n32 * n21 - n31 * n22) * detInv;

        te[3] = t12 * detInv;
        te[4] = (n33 * n11 - n31 * n13) * detInv;
        te[5] = (n31 * n12 - n32 * n11) * detInv;

        te[6] = t13 * detInv;
        te[7] = (n21 * n13 - n23 * n11) * detInv;
        te[8] = (n22 * n11 - n21 * n12) * detInv;

        return this;

    }

    /**
     * calculate transpose matrix of the matrix
     * @example
     * | 1 2 3 |    | 1 4 7 |
     * | 4 5 6 | => | 2 5 8 |
     * | 7 8 9 |    | 3 6 9 |
     * @returns {Mat3}
     */
    transpose() {

        let tmp;
        const m = this.elements;

        tmp = m[1]; m[1] = m[3]; m[3] = tmp;
        tmp = m[2]; m[2] = m[6]; m[6] = tmp;
        tmp = m[5]; m[5] = m[7]; m[7] = tmp;

        return this;

    }

    /**
     * it copys all the components of given mat and puts them in the current matrix
     * @param {Mat3} mat 
     * @returns {Mat3} return this matrix with new components
     */
    copy(mat: Mat3): Mat3 {
        const te = this.elements;
        const me = mat.elements;

        te[0] = me[0];
        te[1] = me[1];
        te[2] = me[2];
        te[3] = me[3];
        te[4] = me[4];
        te[5] = me[5];
        te[6] = me[6];
        te[7] = me[7];
        te[8] = me[8];

        return this;
    }


    /**
     * 
     * @param sx 
     * @param sy 
     * @returns 
     */
    scale(sx: number, sy: number): Mat3 {
        return this.premultiply(Mat3.makeScale(sx, sy));
    }

    /**
     * rotates matrix (Axises) clockwise or in other word it rotates points counter clockwise
     * @param {number} theta angle in radian
     * @returns {Mat3}
     */
    rotate(theta: number): Mat3 {
        return this.multiplyTo(Mat3.makeRotation(theta));
    }

    /**
     * translates the matrix (axises) in reverse or in other word it translate points 
     * @example 
     * translate(2,2) => it translate the matrix (axises) by -2 and -2 unit
     * and it translate points +2 an +2 unit
     * @param dx 
     * @param dy 
     * @returns {Mat3}
     */
    translate(dx: number, dy: number): Mat3 {
        return this.multiplyTo(Mat3.makeTranslation(dx, dy));
    }

    /**
     * return a copy of the matrix
     * @returns {Mat3}
     */
    clone() {
        return Mat3.fromArray(this.elements);
    }

    /**
     * compare the matrix with the given matrix
     * @param {Mat3} mat 
     * @returns 
     */
    equals(mat: Mat3) {
        const te = this.elements;
        const me = mat.elements;
        for (let i = 0; i < 9; i++) if (te[i] !== me[i]) return false;
        return true;
    }

    /** returns components of the matrix as an array */
    toArray() { return this.elements; }


    /**
     * create a matrix from an array
     * @param {Array<number>} array 
     * @param {number} offset 
     * @returns 
     */
    public static fromArray(array: Array<number>, offset = 0) {
        const resultMat = new Mat3();
        for (let i = 0; i < 9; i++) resultMat.elements[i] = array[i + offset];
        return resultMat;
    }

    /**
     * this method calculate matA x matB
     * @param matA 
     * @param matB 
     * @returns 
     */
    public static multiplyMatrices(matA: Mat3, matB: Mat3) {

        const ae = matA.elements;
        const be = matB.elements;
        const resultMat = new Mat3();
        const te = resultMat.elements;

        const a11 = ae[0], a12 = ae[1], a13 = ae[2];
        const a21 = ae[3], a22 = ae[4], a23 = ae[5];
        const a31 = ae[6], a32 = ae[7], a33 = ae[8];

        const b11 = be[0], b12 = be[1], b13 = be[2];
        const b21 = be[3], b22 = be[4], b23 = be[5];
        const b31 = be[6], b32 = be[7], b33 = be[8];

        te[0] = a11 * b11 + a12 * b21 + a13 * b31;
        te[3] = a21 * b11 + a22 * b21 + a23 * b31;
        te[6] = a31 * b11 + a32 * b21 + a33 * b31;

        te[1] = a11 * b12 + a12 * b22 + a13 * b32;
        te[4] = a21 * b12 + a22 * b22 + a23 * b32;
        te[7] = a31 * b12 + a32 * b22 + a33 * b32;

        te[2] = a11 * b13 + a12 * b23 + a13 * b33;
        te[5] = a21 * b13 + a22 * b23 + a23 * b33;
        te[8] = a31 * b13 + a32 * b23 + a33 * b33;

        return resultMat;

    }

    /**
     * returns a translate matrix in 2D space
     * @example
     * | 1  0  0 |
     * | 0  1  0 |
     * |dx dy  1 |
     * @param {Vec2} vec
     * @returns {Mat3}
     */
    public static makeTranslation(dx: number, dy: number) {
        return new Mat3().set(
            1, 0, 0,
            0, 1, 0,
            dx, dy, 1
        );
    }

    /**
     * this method creates a Rotation Matrix
     * @param theta To rotate objects: CounterClockWise is positive theta and ClockWise is negative. To rotate Coordinate system: ClockWise is positive and CounterClockWise is negative
     * @returns Mat3x3
     */
    public static makeRotation(theta: number) {
        const resultMat = new Mat3();
        // counterclockwise

        const c = Math.cos(theta);
        const s = Math.sin(theta);

        resultMat.set(
            +c, +s, 0,
            -s, +c, 0,
            0, 0, 1
        );

        return resultMat;

    }

    /**
     * 
     * @param x 
     * @param y 
     * @returns 
     */
    public static makeScale(x: number, y: number) {
        const resultMat = new Mat3();
        resultMat.set(
            x, 0, 0,
            0, y, 0,
            0, 0, 1
        );
        return resultMat;
    }

    /**
     * return a identity matrix
     * @example
     * | 1 0 0 |
     * | 0 1 0 |
     * | 0 0 1 |
     * @returns {Mat3}
     */
    public static identity(): Mat3 {
        const resultMat = new Mat3();
        resultMat.set(
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        );
        return resultMat;
    }

    /**
     * return a transformation matrix with two defined axis
     * @example
     * a = xAxis
     * b = yAxis
     * | a.x a.y   0 |
     * | b.x b.y   0 |
     * |   0   0   1 |
     * @param {Vec2} xAxis it should be normalized
     * @param {Vec2} yAxis it should be normalized
     * @returns {Mat3}
     */
    public static makeBasis(xAxis: Vec2, yAxis: Vec2,): Mat3 {
        return new Mat3().set(
            xAxis.x, xAxis.y, 0,
            yAxis.x, yAxis.y, 0,
            0, 0, 1
        );
    }

    // public static makeTransformMatrixFromCoorSys(coor: CoorSys2) {
    //     return Mat3x3.makeBasis(coor.u, coor.v).translate(coor.origin);
    // }
}

export { Mat3 }