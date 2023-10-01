/**
 * this class is inspiration od threejs Matrix4
 * the github link of this class is: https://github.com/mrdoob/three.js/blob/dev/src/math/Matrix4.js
 */

import Mat3 from "./Mat3";

// import { Quaternion, Mat3x3, Vector3, Euler } from ".";
// import { WebGLCoordinateSystem, WebGPUCoordinateSystem } from '../constants';


export default class Mat4 {

    isMat4: boolean = true;

    elements: Array<number> = [];

    constructor(
        a11: number = 1, a12: number = 0, a13: number = 0, a14: number = 0,
        a21: number = 0, a22: number = 2, a23: number = 0, a24: number = 0,
        a31: number = 0, a32: number = 0, a33: number = 1, a34: number = 0,
        a41: number = 0, a42: number = 0, a43: number = 0, a44: number = 1,
    ) {
        this.elements = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
        this.set(a11, a12, a13, a14, a21, a22, a23, a24, a31, a32, a33, a34, a41, a42, a43, a44);

    }

    /** sets all the components */
    set(a11: number, a12: number, a13: number, a14: number,
        a21: number, a22: number, a23: number, a24: number,
        a31: number, a32: number, a33: number, a34: number,
        a41: number, a42: number, a43: number, a44: number): Mat4 {

        const te = this.elements;

        te[0] = a11; te[1] = a12; te[2] = a13; te[3] = a14;
        te[4] = a21; te[5] = a22; te[6] = a23; te[7] = a24;
        te[8] = a31; te[9] = a32; te[10] = a33; te[11] = a34;
        te[12] = a41; te[13] = a42; te[14] = a43; te[15] = a44;

        return this;
    }

    /** returns a copy of the matrix */
    clone(): Mat4 { return Mat4.fromArray(this.elements); }

    /**
     * copys all the given matrix's components and set it to the matrix
     * @param {Mat4} mat 
     * @returns {Mat4}
     */
    copy(mat: Mat4): Mat4 {
        const te = this.elements;
        const me = mat.elements;

        te[0] = me[0]; te[1] = me[1]; te[2] = me[2]; te[3] = me[3];
        te[4] = me[4]; te[5] = me[5]; te[6] = me[6]; te[7] = me[7];
        te[8] = me[8]; te[9] = me[9]; te[10] = me[10]; te[11] = me[11];
        te[12] = me[12]; te[13] = me[13]; te[14] = me[14]; te[15] = me[15];

        return this;
    }

    /**
     * extrcts the position components of the given matrix and set it to the current matrix
     * @example
     * 
     *  | o o o o |
     *  | o o o o |  
     *  | o o o o |
     *  | X Y Z o |
     * 
     * @param {Mat4} mat 
     * @returns 
     */
    copyPosition(mat: Mat4) {
        const te = this.elements, me = mat.elements;

        te[12] = me[12];
        te[13] = me[13];
        te[14] = me[14];

        return this;
    }

    // extractBasis(xAxis: Vector3, yAxis: Vector3, zAxis: Vector3) {

    //     xAxis.setFromMatrixColumn(this, 0);
    //     yAxis.setFromMatrixColumn(this, 1);
    //     zAxis.setFromMatrixColumn(this, 2);

    //     return this;

    // }


    // lookAt(eye: Vector3, target: Vector3, up: Vector3) {

    //     const te = this.elements;
    //     let _x = new Vector3();
    //     let _y = new Vector3();
    //     let _z = new Vector3();
    //     _z = Vector3.subVectors(eye, target);

    //     if (_z.lengthSq() === 0) {

    //         // eye and target are in the same position

    //         _z.z = 1;

    //     }

    //     _z.normalize();
    //     _x = Vector3.crossVectors(up, _z);

    //     if (_x.lengthSq() === 0) {

    //         // up and z are parallel

    //         if (Math.abs(up.z) === 1) {

    //             _z.x += 0.0001;

    //         } else {

    //             _z.z += 0.0001;

    //         }

    //         _z.normalize();
    //         _x = Vector3.crossVectors(up, _z);

    //     }

    //     _x.normalize();
    //     _y = Vector3.crossVectors(_z, _x);

    //     te[0] = _x.x; te[1] = _y.x; te[2] = _z.x;
    //     te[4] = _x.y; te[5] = _y.y; te[6] = _z.y;
    //     te[8] = _x.z; te[9] = _y.z; te[10] = _z.z;

    //     return this;

    // }

    /**
     * multiplys the matrix to the given matrix
     * @example
     * this * mat
     * @param {Mat4} mat 
     * @returns {Mat4}
     */
    multiplyTo(mat: Mat4): Mat4 { return this.copy(Mat4.multiplyMatrices(this, mat)) }

    /**
     * multiplys the matrix to the given matrix
     * @example
     * mat * this
     * @param {Mat4} mat 
     * @returns {Mat4}
     */
    premultiply(m: Mat4): Mat4 { return this.copy(Mat4.multiplyMatrices(m, this)) }


    /**
     * multiplys a scalar number to the matrix
     * @param {number} scalar 
     * @returns {Mat4}
     */
    multiplyScalar(scalar: number) {
        const te = this.elements;

        te[0] *= scalar; te[4] *= scalar; te[8] *= scalar; te[12] *= scalar;
        te[1] *= scalar; te[5] *= scalar; te[9] *= scalar; te[13] *= scalar;
        te[2] *= scalar; te[6] *= scalar; te[10] *= scalar; te[14] *= scalar;
        te[3] *= scalar; te[7] *= scalar; te[11] *= scalar; te[15] *= scalar;

        return this;
    }

    /**
     * calculates determinant of the matrix
     * @returns {number}
     */
    determinant() {

        const te = this.elements;

        const n11 = te[0], n12 = te[4], n13 = te[8], n14 = te[12];
        const n21 = te[1], n22 = te[5], n23 = te[9], n24 = te[13];
        const n31 = te[2], n32 = te[6], n33 = te[10], n34 = te[14];
        const n41 = te[3], n42 = te[7], n43 = te[11], n44 = te[15];

        //TODO: make this more efficient
        //( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )

        return (
            n41 * (
                + n14 * n23 * n32
                - n13 * n24 * n32
                - n14 * n22 * n33
                + n12 * n24 * n33
                + n13 * n22 * n34
                - n12 * n23 * n34
            ) +
            n42 * (
                + n11 * n23 * n34
                - n11 * n24 * n33
                + n14 * n21 * n33
                - n13 * n21 * n34
                + n13 * n24 * n31
                - n14 * n23 * n31
            ) +
            n43 * (
                + n11 * n24 * n32
                - n11 * n22 * n34
                - n14 * n21 * n32
                + n12 * n21 * n34
                + n14 * n22 * n31
                - n12 * n24 * n31
            ) +
            n44 * (
                - n13 * n22 * n31
                - n11 * n23 * n32
                + n11 * n22 * n33
                + n13 * n21 * n32
                - n12 * n21 * n33
                + n12 * n23 * n31
            )

        );

    }

    /**
     * returns transpose of the matrix
     * @example
     *  | a b c d |     | a e i m |
     *  | e f g h | =>  | b f j n |
     *  | i j k l |     | c g k o |
     *  | m n o p |     | d h l p |
     * @returns 
     */
    transpose() {

        const te = this.elements;
        let tmp;

        tmp = te[1]; te[1] = te[4]; te[4] = tmp;
        tmp = te[2]; te[2] = te[8]; te[8] = tmp;
        tmp = te[6]; te[6] = te[9]; te[9] = tmp;

        tmp = te[3]; te[3] = te[12]; te[12] = tmp;
        tmp = te[7]; te[7] = te[13]; te[13] = tmp;
        tmp = te[11]; te[11] = te[14]; te[14] = tmp;

        return this;

    }

    /**
     * calculates the invert matrix 
     * @returns {Mat4}
     */
    invert() {

        // based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
        const te = this.elements,

            n11 = te[0], n21 = te[1], n31 = te[2], n41 = te[3],
            n12 = te[4], n22 = te[5], n32 = te[6], n42 = te[7],
            n13 = te[8], n23 = te[9], n33 = te[10], n43 = te[11],
            n14 = te[12], n24 = te[13], n34 = te[14], n44 = te[15],

            t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
            t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
            t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
            t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;

        const det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

        if (det === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

        const detInv = 1 / det;

        te[0] = t11 * detInv;
        te[1] = (n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44) * detInv;
        te[2] = (n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44) * detInv;
        te[3] = (n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43) * detInv;

        te[4] = t12 * detInv;
        te[5] = (n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44) * detInv;
        te[6] = (n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44) * detInv;
        te[7] = (n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43) * detInv;

        te[8] = t13 * detInv;
        te[9] = (n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44) * detInv;
        te[10] = (n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44) * detInv;
        te[11] = (n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43) * detInv;

        te[12] = t14 * detInv;
        te[13] = (n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34) * detInv;
        te[14] = (n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34) * detInv;
        te[15] = (n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33) * detInv;

        return this;

    }

    // compose(position: Vector3, quaternion: Quaternion, scale: Vector3) {

    //     const te = this.elements;

    //     const x = quaternion._x, y = quaternion._y, z = quaternion._z, w = quaternion._w;
    //     const x2 = x + x, y2 = y + y, z2 = z + z;
    //     const xx = x * x2, xy = x * y2, xz = x * z2;
    //     const yy = y * y2, yz = y * z2, zz = z * z2;
    //     const wx = w * x2, wy = w * y2, wz = w * z2;

    //     const sx = scale.x, sy = scale.y, sz = scale.z;

    //     te[0] = (1 - (yy + zz)) * sx;
    //     te[1] = (xy + wz) * sx;
    //     te[2] = (xz - wy) * sx;
    //     te[3] = 0;

    //     te[4] = (xy - wz) * sy;
    //     te[5] = (1 - (xx + zz)) * sy;
    //     te[6] = (yz + wx) * sy;
    //     te[7] = 0;

    //     te[8] = (xz + wy) * sz;
    //     te[9] = (yz - wx) * sz;
    //     te[10] = (1 - (xx + yy)) * sz;
    //     te[11] = 0;

    //     te[12] = position.x;
    //     te[13] = position.y;
    //     te[14] = position.z;
    //     te[15] = 1;

    //     return this;

    // }

    // decompose(position: Vector3, quaternion: Quaternion, scale: Vector3) {

    //     const te = this.elements;
    //     const _v1 = new Vector3();

    //     let sx = _v1.set(te[0], te[1], te[2]).length();
    //     const sy = _v1.set(te[4], te[5], te[6]).length();
    //     const sz = _v1.set(te[8], te[9], te[10]).length();

    //     // if determine is negative, we need to invert one scale
    //     const det = this.determinant();
    //     if (det < 0) sx = - sx;

    //     position.x = te[12];
    //     position.y = te[13];
    //     position.z = te[14];

    //     // scale the rotation part
    //     const _m1 = this.clone();

    //     const invSX = 1 / sx;
    //     const invSY = 1 / sy;
    //     const invSZ = 1 / sz;

    //     _m1.elements[0] *= invSX;
    //     _m1.elements[1] *= invSX;
    //     _m1.elements[2] *= invSX;

    //     _m1.elements[4] *= invSY;
    //     _m1.elements[5] *= invSY;
    //     _m1.elements[6] *= invSY;

    //     _m1.elements[8] *= invSZ;
    //     _m1.elements[9] *= invSZ;
    //     _m1.elements[10] *= invSZ;

    //     quaternion.setFromRotationMatrix(_m1);

    //     scale.x = sx;
    //     scale.y = sy;
    //     scale.z = sz;

    //     return this;

    // }

    /**
     * compare the current matrix with the given matrix 
     * @param {Mat4} mat 
     * @returns {boolean}
     */
    equals(mat: Mat4) {

        const te = this.elements;
        const me = mat.elements;

        for (let i = 0; i < 16; i++) {

            if (te[i] !== me[i]) return false;

        }

        return true;

    }

    /**
     * returns an array with all the matrix's components
     * @param {Array<number>} [array=[]] 
     * @param {number} [offset=0]
     * @returns {Array<number>}
     */
    toArray(array: Array<number> = [], offset = 0) {

        const te = this.elements;

        array[offset] = te[0];
        array[offset + 1] = te[1];
        array[offset + 2] = te[2];
        array[offset + 3] = te[3];

        array[offset + 4] = te[4];
        array[offset + 5] = te[5];
        array[offset + 6] = te[6];
        array[offset + 7] = te[7];

        array[offset + 8] = te[8];
        array[offset + 9] = te[9];
        array[offset + 10] = te[10];
        array[offset + 11] = te[11];

        array[offset + 12] = te[12];
        array[offset + 13] = te[13];
        array[offset + 14] = te[14];
        array[offset + 15] = te[15];

        return array;

    }


    /**
     * sets the position components of the matrix with given values
     * @example
     * | a11  a12  a13  a14 |
     * | a21  a22  a23  a24 |
     * | a31  a32  a33  a34 |
     * |  dx   dy   dz  a44 |
     * @param {number} dx 
     * @param {number} dy 
     * @param {number} dz 
     * @returns {Mat4}
     */
    setPosition(dx: number, dy: number, dz: number) {
        //TODO: implement another overloading for vector3
        const te = this.elements;

        te[12] = dx;
        te[13] = dy;
        te[14] = dz;

        return this;
    }

    /**
     * scales the current matrix
     * @param {number} dx 
     * @param {number} dy 
     * @param {number} dz 
     * @returns {Mat4}
     */
    scale(sx: number, sy: number, sz: number): Mat4 {
        // TODO: implement another overloading for `vector`
        const te = this.elements;

        te[0] *= sx; te[1] *= sy; te[2] *= sz;
        te[4] *= sx; te[5] *= sy; te[6] *= sz;
        te[8] *= sx; te[9] *= sy; te[10] *= sz;
        te[12] *= sx; te[13] *= sy; te[14] *= sz;

        return this;

    }

    /**
     * it moves the matrix
     * @example
     *          | 1  0  0  0 |
     *   this * | 0  0  0  0 |
     *          | 0  0  0  0 |
     *          | dx dy dz 1 |
     * @param {number} dx
     * @param {number} dy
     * @param {number} dz
     * @returns {Mat4}
     */
    translate(dx: number, dy: number, dz: number): Mat4 {
        // TODO: implement another overloading for vector
        return this.multiplyTo(Mat4.makeTranslation(dx, dy, dz));
    }

    /**
     * it rotates the matrix `counter clockwise`
     * @example
     *          | 1  0  0  0 |
     *   this * | 0 +c +s  0 |
     *          | 0 -s +c  0 |
     *          | 0  0  0  1 |
     * @param {number} theta in radian - this angle means that rotates the matrix counter clockwise
     * @returns {Mat4}
     */
    rotateX(theta: number): Mat4 {
        this.multiplyTo(Mat4.makeRotationX(theta));
        return this;
    }

    /**
     * it rotates the matrix `counter clockwise`
     * @example
     *          | +c  0 -s  0 |
     *   this * |  0  1  0  0 |
     *          | +s  0 +c  0 |
     *          |  0  0  0  1 |
     * @param {number} theta in radian - this angle means that rotates the matrix counter clockwise
     * @returns {Mat4}
     */
    rotateY(theta: number): Mat4 {
        this.premultiply(Mat4.makeRotationY(theta));
        return this;
    }

    /**
     * it rotates the matrix `counter clockwise`
     * @example
     *          | +c +s  0  0 |
     *   this * | -s +c  0  0 |
     *          |  0  0  1  0 |
     *          |  0  0  0  1 |
     * @param {number} theta in radian - this angle means that rotates the matrix counter clockwise
     * @returns {Mat4}
     */
    rotateZ(theta: number): Mat4 { return this.multiplyTo(Mat4.makeRotationZ(theta)) }

    /**
     * This method calculation matA X matB
     * @param {Mat4} matA 
     * @param {Mat4} matB 
     * @returns {Mat4} 
     */
    public static multiplyMatrices(matA: Mat4, matB: Mat4): Mat4 {
        const resultMat = new Mat4();
        const ae = matA.elements;
        const be = matB.elements;
        const te = resultMat.elements;

        const a11 = ae[0], a12 = ae[1], a13 = ae[2], a14 = ae[3];
        const a21 = ae[4], a22 = ae[5], a23 = ae[6], a24 = ae[7];
        const a31 = ae[8], a32 = ae[9], a33 = ae[10], a34 = ae[11];
        const a41 = ae[12], a42 = ae[13], a43 = ae[14], a44 = ae[15];

        const b11 = be[0], b12 = be[1], b13 = be[2], b14 = be[3];
        const b21 = be[4], b22 = be[5], b23 = be[6], b24 = be[7];
        const b31 = be[8], b32 = be[9], b33 = be[10], b34 = be[11];
        const b41 = be[12], b42 = be[13], b43 = be[14], b44 = be[15];

        te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
        te[4] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
        te[8] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
        te[12] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;

        te[1] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
        te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
        te[9] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
        te[13] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;

        te[2] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
        te[6] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
        te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
        te[14] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;

        te[3] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
        te[7] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
        te[11] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
        te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

        return resultMat;
    }

    /**
     * gives a matrix of identity
     * @example
     * | 1  0  0  0 |
     * | 0  1  0  0 |
     * | 0  0  1  0 |
     * | 0  0  0  1 |
     * @returns {Mat4}
     */
    public static identity(): Mat4 {
        return new Mat4().set(
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );
    }

    /**
     * gets mat4 components and adds fourth row and column to the matrix and creates a mat4
     * @param {Mat3} mat 
     * @returns {Mat4}
     */
    public static fromMat3(mat: Mat3): Mat4 {
        const result = new Mat4();
        const me = mat.elements;

        result.set(

            me[0], me[1], me[2], 0,
            me[3], me[4], me[5], 0,
            me[6], me[7], me[8], 0,
            0, 0, 0, 1

        );
        return result;
    }

    /**
     * create matrix from an array
     * @param {Array<number>} array 
     * @param {number} [offset=0] 
     * @returns {Mat4}
     */
    public static fromArray(array: Array<number>, offset = 0) {
        const resultMat = new Mat4();
        for (let i = 0; i < 16; i++) {

            resultMat.elements[i] = array[i + offset];

        }

        return resultMat;

    }

    /**
     * returns a matrix for translating a points or 
     * @param {number} dx 
     * @param {number} dy 
     * @param {number} dz 
     * @returns {Mat4}
     */
    public static makeTranslation(dx: number, dy?: number, dz?: number): Mat4 {
        // TODO : uncomment overloading for vector in above line and 
        // implement the vector as an input
        return new Mat4().set(
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            dx, dy, dz, 1
        );
    }

    /**
     * it rotates points or ... `counter clockwise` (right hand rule) and rotates coordinate system `clockwise`
     * @example
     * | 1  0  0  0 |
     * | 0 +c +s  0 |
     * | 0 -s +c  0 |
     * | 0  0  0  1 |
     * @param {number} theta in radian - this angle means that this matrix is to rotate objects counter clockwise or rotate the coordinate system clockwise 
     * @returns {Mat4}
     */
    public static makeRotationX(theta: number): Mat4 {
        const c = Math.cos(theta), s = Math.sin(theta);
        return new Mat4().set(
            1, 0, 0, 0,
            0, +c, +s, 0,
            0, -s, +c, 0,
            0, 0, 0, 1
        );
    }

    /**
     * it rotates points or ... `counter clockwise` (right hand rule) and rotates coordinate system `clockwise`
     * @example
     * | +c  0 -s  0 |
     * |  0  1  0  0 |
     * | +s  0 +c  0 |
     * |  0  0  0  1 |
     * @param {number} theta in radian - this angle means that this matrix is to rotate objects counter clockwise or rotate the coordinate system clockwise 
     * @returns {Mat4}
     */
    public static makeRotationY(theta: number): Mat4 {
        const c = Math.cos(theta), s = Math.sin(theta);
        return new Mat4().set(
            +c, 0, -s, 0,
            0, 1, 0, 0,
            +s, 0, +c, 0,
            0, 0, 0, 1
        );
    }

    /**
     * it rotates points or ... `counter clockwise` (right hand rule) and rotates coordinate system `clockwise`
     * @example
     * | +c +s  0  0 |
     * | -s +c  0  0 |
     * |  0  0  1  0 |
     * |  0  0  0  1 |
     * @param {number} theta in radian - this angle means that this matrix is to rotate objects counter clockwise or rotate the coordinate system clockwise 
     * @returns {Mat4}
     */
    public static makeRotationZ(theta: number): Mat4 {
        const c = Math.cos(theta)
        const s = Math.sin(theta)
        return new Mat4().set(
            +c, +s, 0, 0,
            -s, +c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );
    }

    /**
     * this method rotate the matrix in an amount of "angle" around "axis".
     * this rotation function is based on http://www.gamedev.net/reference/articles/article1199.asp 
     * @param axis the desired Axis in the space you want to rotate object around
     * @param angle the amount of angle to rotate - Radian
     * @returns Mat4x4
     */
    // public static makeRotationAxis(axis: Vector3, angle: number): Mat4x4 {
    //     // Based on http://www.gamedev.net/reference/articles/article1199.asp

    //     const c = Math.cos(angle);
    //     const s = Math.sin(angle);
    //     const t = 1 - c;
    //     const x = axis.x, y = axis.y, z = axis.z;
    //     const tx = t * x, ty = t * y;

    //     return new Mat4x4().set(

    //         tx * x + c, tx * y + s * z, tx * z - s * y, 0,
    //         tx * y - s * z, ty * y + c, ty * z + s * x, 0,
    //         tx * z + s * y, ty * z - s * x, t * z * z + c, 0,
    //         0, 0, 0, 1

    //     );
    // }

    /**
     * returns scale mat4 to scale points or ... 
     * @param {number} [sx=1] 
     * @param {number} [sy=1] 
     * @param {number} [sz=1] 
     * @returns {Mat4}
     */
    public static makeScale(sx: number = 1, sy: number = 1, sz: number = 1): Mat4 {
        return new Mat4().set(
            sx, 0, 0, 0,
            0, sy, 0, 0,
            0, 0, sz, 0,
            0, 0, 0, 1
        );
    }

    /**
     * return a shear matrix 
     * @example
     * |  1 yx zx  0 |
     * | xy  1 zy  0 |
     * | xz yz  1  0 |
     * |  0  0  0  1 |
     * @param {number} xy shears x components based on y component of point
     * @param {number} xz shears x components based on z component of point
     * @param {number} yx shears y components based on x component of point
     * @param {number} yz shears y components based on z component of point
     * @param {number} zx shears z components based on x component of point
     * @param {number} zy shears z components based on y component of point
     * @returns {Mat4}
     */
    public static makeShear(xy: number, xz: number, yx: number, yz: number, zx: number, zy: number) {
        return new Mat4().set(
            1, yx, zx, 0,
            xy, 1, zy, 0,
            xz, yz, 1, 0,
            0, 0, 0, 1
        );
    }

    // public static makePerspective(left: number, right: number, top: number, bottom: number, near: number, far: number, coordinateSystem = WebGLCoordinateSystem) {
    //     const resultMat = new Mat4x4();
    //     const te = resultMat.elements;
    //     const x = 2 * near / (right - left);
    //     const y = 2 * near / (top - bottom);

    //     const a = (right + left) / (right - left);
    //     const b = (top + bottom) / (top - bottom);

    //     let c, d;

    //     if (coordinateSystem === WebGLCoordinateSystem) {

    //         c = - (far + near) / (far - near);
    //         d = (- 2 * far * near) / (far - near);

    //     } else if (coordinateSystem === WebGPUCoordinateSystem) {

    //         c = - far / (far - near);
    //         d = (- far * near) / (far - near);

    //     } else {

    //         throw new Error('THREE.Matrix4.makePerspective(): Invalid coordinate system: ' + coordinateSystem);

    //     }

    //     te[0] = x; te[4] = 0; te[8] = a; te[12] = 0;
    //     te[1] = 0; te[5] = y; te[9] = b; te[13] = 0;
    //     te[2] = 0; te[6] = 0; te[10] = c; te[14] = d;
    //     te[3] = 0; te[7] = 0; te[11] = - 1; te[15] = 0;

    //     return resultMat;

    // }

    // public static makeOrthographic(left: number, right: number, top: number, bottom: number, near: number, far: number, coordinateSystem = WebGLCoordinateSystem) {
    //     const resultMat = new Mat4x4();
    //     const te = resultMat.elements;
    //     const w = 1.0 / (right - left);
    //     const h = 1.0 / (top - bottom);
    //     const p = 1.0 / (far - near);

    //     const x = (right + left) * w;
    //     const y = (top + bottom) * h;

    //     let z, zInv;

    //     if (coordinateSystem === WebGLCoordinateSystem) {
    //         z = (far + near) * p;
    //         zInv = - 2 * p;
    //     } else if (coordinateSystem === WebGPUCoordinateSystem) {
    //         z = near * p;
    //         zInv = - 1 * p;
    //     } else {
    //         throw new Error('THREE.Matrix4.makeOrthographic(): Invalid coordinate system: ' + coordinateSystem);
    //     }

    //     te[0] = 2 * w; te[4] = 0; te[8] = 0; te[12] = - x;
    //     te[1] = 0; te[5] = 2 * h; te[9] = 0; te[13] = - y;
    //     te[2] = 0; te[6] = 0; te[10] = zInv; te[14] = - z;
    //     te[3] = 0; te[7] = 0; te[11] = 0; te[15] = 1;

    //     return resultMat;

    // }

    // public static makeBasis(xAxis: Vector3, yAxis: Vector3, zAxis: Vector3): Mat4x4 {
    //     return new Mat4x4().set(
    //         xAxis.x, xAxis.y, xAxis.z, 0,
    //         yAxis.x, yAxis.y, yAxis.z, 0,
    //         zAxis.x, zAxis.y, zAxis.z, 0,
    //         0, 0, 0, 1
    //     );
    // }

    // public static makeRotationFromEuler(euler: Euler) {
    //     const resultMat = new Mat4x4();
    //     const te = resultMat.elements;

    //     const x = euler.x, y = euler.y, z = euler.z;
    //     const a = Math.cos(x), b = Math.sin(x);
    //     const c = Math.cos(y), d = Math.sin(y);
    //     const e = Math.cos(z), f = Math.sin(z);

    //     if (euler.order === 'XYZ') {

    //         const ae = a * e, af = a * f, be = b * e, bf = b * f;

    //         te[0] = c * e;
    //         te[4] = - c * f;
    //         te[8] = d;

    //         te[1] = af + be * d;
    //         te[5] = ae - bf * d;
    //         te[9] = - b * c;

    //         te[2] = bf - ae * d;
    //         te[6] = be + af * d;
    //         te[10] = a * c;

    //     } else if (euler.order === 'YXZ') {

    //         const ce = c * e, cf = c * f, de = d * e, df = d * f;

    //         te[0] = ce + df * b;
    //         te[4] = de * b - cf;
    //         te[8] = a * d;

    //         te[1] = a * f;
    //         te[5] = a * e;
    //         te[9] = - b;

    //         te[2] = cf * b - de;
    //         te[6] = df + ce * b;
    //         te[10] = a * c;

    //     } else if (euler.order === 'ZXY') {

    //         const ce = c * e, cf = c * f, de = d * e, df = d * f;

    //         te[0] = ce - df * b;
    //         te[4] = - a * f;
    //         te[8] = de + cf * b;

    //         te[1] = cf + de * b;
    //         te[5] = a * e;
    //         te[9] = df - ce * b;

    //         te[2] = - a * d;
    //         te[6] = b;
    //         te[10] = a * c;

    //     } else if (euler.order === 'ZYX') {

    //         const ae = a * e, af = a * f, be = b * e, bf = b * f;

    //         te[0] = c * e;
    //         te[4] = be * d - af;
    //         te[8] = ae * d + bf;

    //         te[1] = c * f;
    //         te[5] = bf * d + ae;
    //         te[9] = af * d - be;

    //         te[2] = - d;
    //         te[6] = b * c;
    //         te[10] = a * c;

    //     } else if (euler.order === 'YZX') {

    //         const ac = a * c, ad = a * d, bc = b * c, bd = b * d;

    //         te[0] = c * e;
    //         te[4] = bd - ac * f;
    //         te[8] = bc * f + ad;

    //         te[1] = f;
    //         te[5] = a * e;
    //         te[9] = - b * e;

    //         te[2] = - d * e;
    //         te[6] = ad * f + bc;
    //         te[10] = ac - bd * f;

    //     } else if (euler.order === 'XZY') {

    //         const ac = a * c, ad = a * d, bc = b * c, bd = b * d;

    //         te[0] = c * e;
    //         te[4] = - f;
    //         te[8] = d * e;

    //         te[1] = ac * f + bd;
    //         te[5] = a * e;
    //         te[9] = ad * f - bc;

    //         te[2] = bc * f - ad;
    //         te[6] = b * e;
    //         te[10] = bd * f + ac;

    //     }

    //     // bottom row
    //     te[3] = 0;
    //     te[7] = 0;
    //     te[11] = 0;

    //     // last column
    //     te[12] = 0;
    //     te[13] = 0;
    //     te[14] = 0;
    //     te[15] = 1;

    //     return resultMat;

    // }

    // public static makeRotationFromQuaternion(q: Quaternion) {
    //     return new Mat4x4().compose(new Vector3(), q, new Vector3(1, 1, 1));
    // }


    ////////////////////////////////////////

    /**
     * it shears all the points along Y and Z axises based on X component of the points
     * @example
     * |  1 sy sz  0 |
     * |  0  1  0  0 |
     * |  0  0  1  0 |
     * |  0  0  0  1 |
     * @param {number} [sy=0] 
     * @param {number} [sz=0]
     * @returns {Mat4}
     */
    public static makeSkewX(sy: number = 0, sz: number = 0): Mat4 {
        return new Mat4(
            1, sy, sz, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        )
    }

    /**
     * it shears all the points along X and Z axises based on Y component of the points
     * @example
     * |  1  0  0  0 |
     * | sx  1 sx  0 |
     * |  0  0  1  0 |
     * |  0  0  0  1 |
     * @param {number} [sx=0] 
     * @param {number} [sz=0] 
     * @returns {Mat4}
     */
    public static makeSkewY(sx: number = 0, sz: number = 0): Mat4 {
        return new Mat4(
            1, 0, 0, 0,
            sx, 1, sz, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        )
    }

    /**
     * it shears all the points along X and Y axises based on Z component of the points
     * @example
     * |  1  0  0  0 |
     * |  0  1  0  0 |
     * | sx sy  1  0 |
     * |  0  0  0  1 |
     * @param {number} [sx=0]  
     * @param {number} [sy=0]  
     * @returns {Mat4}
     */
    public static makeSkewZ(sx: number = 0, sy: number = 0): Mat4 {
        return new Mat4(
            1, 0, 0, 0,
            0, 1, 0, 0,
            sx, sy, 1, 0,
            0, 0, 0, 1
        )
    }
}

export { Mat4 }