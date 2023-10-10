
import Mat3 from "./Mat3";
import Mat4 from "./Mat4";
import { Vec2 } from "./Vec2";

import { f } from "./utils";
export default class Vec3 {
    isVec3: boolean = true;

    /** first component of the vector */
    x: number;
    /** second component of the vector */
    y: number;
    /** third component of the vector */
    z: number;

    /**
     * defines a 3D vector
     * @param x first component of a vector
     * @param y second component of a vector
     * @param z third component of a vector
     */
    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }



    /**
     * sets components of the vector
     * @param {number} x first component of the vector
     * @param {number} y second componenrt of the vector
     * @param {number} z third component of the vector
     * @returns {Vec3} return the vector with new components
     */
    set(x: number, y: number, z: number): Vec3 {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }

    /**
     * sets an scalar value for all components
     * @param {number} scalar scalar value
     * @returns {Vec3} returns the vector with scalar value on all components
     */
    setScalar(scalar: number): Vec3 {
        this.x = scalar;
        this.y = scalar;
        this.z = scalar;
        return this;
    }

    /**
     * sets the first component of the vector
     * @param {number} x the amount of first components of the vector
     * @returns {Vec3} returns the vector with new first (x) components
     */
    setX(x: number): Vec3 {
        this.x = x;
        return this;
    }

    /**
     * sets the second component of the vector
     * @param {number} y the amount of second components of the vector
     * @returns {Vec3} returns the vector with new second (y) components
     */
    setY(y: number): Vec3 {
        this.y = y;
        return this;
    }

    /**
     * sets the third component of the vector
     * @param {number} z the amount of third components of the vector
     * @returns {Vec3} returns the vector with new third (z) components
     */
    setZ(z: number): Vec3 {
        this.z = z;
        return this;
    }

    /**
     * sets component value using its index
     * @param {number} index index of component
     * @param {number} value component value
     * @returns {Vec3} return the vector with new value for component with given index
     */
    setComponent(index: number, value: number): Vec3 {
        switch (index) {
            case 0: this.x = value; break;
            case 1: this.y = value; break;
            case 2: this.z = value; break;
            default: throw new Error('index is out of range: ' + index);
        }
        return this;
    }

    /**
     * returns one of the component of the vector with given index
     * @param {number} index component index
     * @returns {number} value of the component
     */
    getComponent(index: number) {
        switch (index) {
            case 0: return this.x;
            case 1: return this.y;
            case 2: return this.z;
            default: throw new Error('index is out of range: ' + index);
        }
    }

    /**
     * changes the vector's length
     * @param {number} length the length of a new vector
     * @returns {Vec3}
     */
    setLength(length: number): Vec3 {
        return this.normalize().multiplyScalar(length);
    }

    /**
     * it replaces the vector components with the given vector's components
     * @param v the vector whose components are copied
     * @returns {Vec3} returns the vector whose components are replaced with the given vector as a parameter
     */
    copy(v: Vec3): Vec3 {

        this.x = v.x;
        this.y = v.y;
        this.z = v.z;

        return this;

    }

    /** gives first and second components of the vector */
    get xy(): Vec2 { return new Vec2(this.x, this.y); }
    /** gives second and first components of the vector*/
    get yx(): Vec2 { return new Vec2(this.y, this.x); }
    /** gives third and first components of the vector */
    get zx(): Vec2 { return new Vec2(this.z, this.x); }
    /** gives first and third components of the vector*/
    get xz(): Vec2 { return new Vec2(this.x, this.z); }
    /** gives second and third components of the vector */
    get yz(): Vec2 { return new Vec2(this.y, this.z); }
    /** gives third and second components of the vector */
    get zy(): Vec2 { return new Vec2(this.z, this.y); }

    /** gives the vector without any changes */
    get xyz(): Vec3 { return new Vec3(this.x, this.y, this.z); }
    /** gives a new vector with different order of components */
    get xzy(): Vec3 { return new Vec3(this.x, this.z, this.y); }
    /** gives a new vector with different order of components */
    get zyx(): Vec3 { return new Vec3(this.z, this.y, this.x); }
    /** gives a new vector with different order of components */
    get zxy(): Vec3 { return new Vec3(this.z, this.x, this.y); }
    /** gives a new vector with different order of components */
    get yxz(): Vec3 { return new Vec3(this.y, this.x, this.z); }
    /** gives a new vector with different order of components */
    get yzx(): Vec3 { return new Vec3(this.y, this.z, this.x); }



    /**
     * return a reverse vector of the main vector
     * @returns {Vec3} 
     */
    reverse = (): Vec3 => this.multiplyScalar(-1);

    /**
     * create a copy of the vector
     * @returns {Vec3}
     */
    clone(): Vec3 {
        return new Vec3(this.x, this.y, this.z);
    }


    /** 
     * projects vector on XY plane
     * @returns {Vec3}
     */
    projectToXY(): Vec3 { this.z = 0; return this; }
    /** 
     * projects vector on ZX plane
     * @returns {Vec3}
     */
    projectToZX(): Vec3 { this.y = 0; return this; }
    /** 
     * projects vector on YZ plane
     * @returns {Vec3}
     */
    projectToYZ(): Vec3 { this.x = 0; return this; }


    /**
     * adds given vector to the current vector
     * @param {Vec3} vec 
     * @returns {Vec3}
     */
    add(vec: Vec3): Vec3 {
        this.x += vec.x;
        this.y += vec.y;
        this.z += vec.z;
        return this;
    }

    /**
     * adds a scalar value to the vector's components
     * @param {number} scalar 
     * @returns {Vec3}
     */
    addScalar(scalar: number): Vec3 {
        this.x += scalar;
        this.y += scalar;
        this.z += scalar;
        return this;
    }

    /**
     * subtracts given vector from current vector
     * @example
     *  this - vec
     * @param {Vec3} vec 
     * @returns {Vec3}
     */
    sub(vec: Vec3): Vec3 {

        this.x -= vec.x;
        this.y -= vec.y;
        this.z -= vec.z;

        return this;

    }

    /**
     * subtracts a scalar value from current vector's components
     * @param {number} scalar 
     * @returns {Vec3}
     */
    subScalar(scalar: number): Vec3 {

        this.x -= scalar;
        this.y -= scalar;
        this.z -= scalar;

        return this;

    }

    /**
     * multiplys corresponding components to each other
     * @example
     * this.x * vec.x , this.y * vec.y , this.z * vec.z
     * @param {Vec3} vec 
     * @returns {Vec3}
     */
    multiply(vec: Vec3): Vec3 {

        this.x *= vec.x;
        this.y *= vec.y;
        this.z *= vec.z;

        return this;

    }

    /**
     * multiply a number to the vector's components
     * @param {numver} scalar a number to be multiplied to the vector 
     * @returns {Vec3} return multiplied vector
     */
    multiplyScalar(scalar: number): Vec3 {

        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;

        return this;

    }



    // applyEuler(euler: Euler): Vec3 {

    //     return this.applyQuaternion(Quaternion.setFromEuler(euler));

    // }

    // applyAxisAngle(axis: Vec3, angle:number): Vec3 {

    //     return this.applyQuaternion(Quaternion.setFromAxisAngle(axis, angle));

    // }

    /**
     * multiply to given matrix 
     * @example
     * (this vector) * mat
     *              | a11 a12 a13 |
     * (x, y, z) *  | a21 a22 a23 |
     *              | a31 a32 a33 |
     * @param {Mat3} mat 
     * @returns {Vec3}
     */
    applyMat3(mat: Mat3): Vec3 {

        const x = this.x, y = this.y, z = this.z;
        const e = mat.elements;

        this.x = e[0] * x + e[3] * y + e[6] * z;
        this.y = e[1] * x + e[4] * y + e[7] * z;
        this.z = e[2] * x + e[5] * y + e[8] * z;

        return this;

    }

    /**
     * multiply this vector to the given matrix
     * @example
     * (this vector) * mat
     *                | a11 a12 a13 a14 |
     * (x, y, z, 1) * | a21 a22 a23 a24 |
     *                | a31 a32 a33 a34 |
     *                | a41 a42 a43 a44 |
     * @param {Mat4} mat 
     * @returns {Vec3}
     */
    applyMat4(mat: Mat4): Vec3 {

        const x = this.x, y = this.y, z = this.z;
        const e = mat.elements;

        const w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);

        this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
        this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
        this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;

        return this;

    }

    // applyQuaternion(q: Quaternion): Vec3 {

    //     const x = this.x, y = this.y, z = this.z;
    //     const qx = q.x, qy = q.y, qz = q.z, qw = q.w;

    //     // calculate quat * vector

    //     const ix = qw * x + qy * z - qz * y;
    //     const iy = qw * y + qz * x - qx * z;
    //     const iz = qw * z + qx * y - qy * x;
    //     const iw = - qx * x - qy * y - qz * z;

    //     // calculate result * inverse quat

    //     this.x = ix * qw + iw * - qx + iy * - qz - iz * - qy;
    //     this.y = iy * qw + iw * - qy + iz * - qx - ix * - qz;
    //     this.z = iz * qw + iw * - qz + ix * - qy - iy * - qx;

    //     return this;

    // }

    // project(camera): Vec3 {

    //     return this.applyMatrix4(camera.matrixWorldInverse).applyMatrix4(camera.projectionMatrix);

    // }

    // unproject(camera): Vec3 {

    //     return this.applyMatrix4(camera.projectionMatrixInverse).applyMatrix4(camera.matrixWorld);

    // }

    // transformDirection(m: Mat4): Vec3 {

    //     // input: THREE.Matrix4 affine matrix
    //     // vector interpreted as a direction

    //     const x = this.x, y = this.y, z = this.z;
    //     const e = m.elements;

    //     this.x = e[0] * x + e[4] * y + e[8] * z;
    //     this.y = e[1] * x + e[5] * y + e[9] * z;
    //     this.z = e[2] * x + e[6] * y + e[10] * z;

    //     return this.normalize();

    // }

    /**
     * divides current vector's components by the corresponding components of given vector
     * @param {Vec3} vec 
     * @returns {Vec3}
     */
    divide(vec: Vec3): Vec3 {

        this.x /= vec.x;
        this.y /= vec.y;
        this.z /= vec.z;

        return this;

    }

    /**
     * divide vector's components with an scalar value
     * @param {number} scalar number to be divided to the vector
     * @returns {Vec3} divided Vec3
     */
    divideScalar(scalar: number): Vec3 { return this.multiplyScalar(1 / scalar) }

    /**
     * it picks the minimum value of corresponding components
     * @param {Vec3} vec 
     * @returns {Vec3}
     */
    min(vec: Vec3): Vec3 {

        this.x = Math.min(this.x, vec.x);
        this.y = Math.min(this.y, vec.y);
        this.z = Math.min(this.z, vec.z);

        return this;

    }

    /**
     * it picks the maximum value of corresponding components
     * @param {Vec3} vec 
     * @returns {Vec3}
     */
    max(vec: Vec3): Vec3 {

        this.x = Math.max(this.x, vec.x);
        this.y = Math.max(this.y, vec.y);
        this.z = Math.max(this.z, vec.z);

        return this;

    }

    /**
     * for each components it choose the its value if it is between two min and max value. otherwise it choose min or max
     * @param {Vec3} min 
     * @param {Vec3} max 
     * @returns {Vec3}
     */
    clamp(min: Vec3, max: Vec3): Vec3 {

        // assumes min < max, componentwise

        this.x = Math.max(min.x, Math.min(max.x, this.x));
        this.y = Math.max(min.y, Math.min(max.y, this.y));
        this.z = Math.max(min.z, Math.min(max.z, this.z));

        return this;

    }

    /**
     * chooses its components between min and max values 
     * @param {number} minVal 
     * @param {number} maxVal 
     * @returns {Vec3}
     */
    clampScalar(minVal: number, maxVal: number): Vec3 {

        this.x = Math.max(minVal, Math.min(maxVal, this.x));
        this.y = Math.max(minVal, Math.min(maxVal, this.y));
        this.z = Math.max(minVal, Math.min(maxVal, this.z));

        return this;

    }

    /**
     * returns vector's length if it is between min and max value, otherwise return min or max in each case
     * @param {number} min 
     * @param {number} max 
     * @returns {number}
     */
    clampLength(min: number, max: number): Vec3 {

        const length = this.length();

        return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));

    }

    /**
     * calculates floor for each component
     * @returns {Vec3}
     */
    floor(): Vec3 {

        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);

        return this;

    }

    /**
     * calculates ceil for each components
     * @returns {Vec3}
     */
    ceil(): Vec3 {

        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.z = Math.ceil(this.z);

        return this;

    }

    /**
     * rounds every components
     * @returns {Vec3}
     */
    round(): Vec3 {

        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);

        return this;

    }

    /**
     * rounds components in order that they are newar to zero
     * @returns {Vec3}
     */
    roundToZero(): Vec3 {

        this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
        this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
        this.z = (this.z < 0) ? Math.ceil(this.z) : Math.floor(this.z);

        return this;

    }

    /**
     * returns an reverse vector
     * @returns {Vec3}
     */
    negate(): Vec3 {

        this.x = - this.x;
        this.y = - this.y;
        this.z = - this.z;

        return this;

    }

    /**
     * calculates dot products
     * @param {Vec3} vec 
     * @returns {number}
     */
    dot(vec: Vec3): number {

        return this.x * vec.x + this.y * vec.y + this.z * vec.z;

    }

    /**
     * return squared length of the vector
     * @returns {number}
     */
    lengthSq(): number { return this.x * this.x + this.y * this.y + this.z * this.z }


    /**
     * returns the length of the vector
     * @returns {number} 
     */
    length(): number { return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z) }

    /**
     * returns manhatan length of the vector
     * @returns {number}
     */
    manhattanLength(): number { return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) }

    /**
     * normalizes vector inorder that it has a length of 1 unit 
     * @returns {Vec3} a normalized vector
     */
    normalize(): Vec3 { return this.divideScalar(this.length() || 1) }


    /**
     * linear interpolation 
     * @param {Vec3} vec 
     * @param {number} alpha between 0 to 1 
     * @returns {Vec3}
     */
    lerp(vec: Vec3, alpha: number): Vec3 {

        this.x += (vec.x - this.x) * alpha;
        this.y += (vec.y - this.y) * alpha;
        this.z += (vec.z - this.z) * alpha;

        return this;

    }

    /**
     * this method rotates a vector toward another vector 
     * @param v the second vector that we want to rotate vector toward it
     * @param t the alpha/theta and t is between 0 and 1
     * @returns rotated Vec3
     */
    angleLerp(v: Vec3, t: number): Vec3 {
        t = Math.max(0, Math.min(t, 0, 1))
        const x = this.clone().normalize();
        const z = x.cross(v).normalize();
        const y = z.cross(x).normalize();
        return this.applyMat4(Mat4.makeRotationAxis(z, x.angleTo(v) * t));
    }

    /**
     * calculates cross products
     * @param {Vec3} vec 
     * @returns {Vec3}
     */
    cross(vec: Vec3): Vec3 { return Vec3.crossVectors(this, vec) }

    /**
     * projects current vector on the given vector 
     * @param {Vec3} vec 
     * @returns {Vec3}
     */
    projectOnVector(vec: Vec3): Vec3 {

        const denominator = vec.lengthSq();

        if (denominator === 0) return this.set(0, 0, 0);

        const scalar = vec.dot(this) / denominator;

        return this.copy(vec).multiplyScalar(scalar);

    }

    /**
     * projects current vector on the given plane with its normal vector
     * @param {Vec3} planeNormal 
     * @returns {Vec3}
     */
    projectOnPlane(planeNormal: Vec3): Vec3 { return this.sub(this.clone().projectOnVector(planeNormal)) }


    reflect(normal: Vec3): Vec3 {
        // TODO: it needs to be checked 
        // reflect incident vector off plane orthogonal to normal
        // normal is assumed to have unit length

        return this.sub(normal.clone().multiplyScalar(2 * this.dot(normal)));

    }

    /**
     * computes the angle between the vector and given vector
     * @param {Vec3} vec 
     * @returns {number}
     */
    angleTo(vec: Vec3): number {

        const denominator = Math.sqrt(this.lengthSq() * vec.lengthSq());

        if (denominator === 0) return Math.PI / 2;

        const theta = this.dot(vec) / denominator;

        // clamp, to handle numerical problems

        return Math.acos(Math.max(-1, Math.min(theta, 1)))

    }

    /**
     * returns distance of two vector's end (more like it calculates the distance of two points)
     * @param {Vec3} vec 
     * @returns {number}
     */
    distanceTo(vec: Vec3): number { return Math.sqrt(this.distanceToSquared(vec)) }

    /**
     * squared distance of two vector's end (it's more like it calculates the distance of two points)
     * @param {Vec3} vec 
     * @returns {number}
     */
    distanceToSquared(vec: Vec3): number {

        const dx = this.x - vec.x, dy = this.y - vec.y, dz = this.z - vec.z;

        return dx * dx + dy * dy + dz * dz;

    }

    /**
     * calculates the manhatan distance of the current vector with given vector
     * @param {Vec3} vec 
     * @returns {number}
     */
    manhattanDistanceTo(vec: Vec3): number {

        return Math.abs(this.x - vec.x) + Math.abs(this.y - vec.y) + Math.abs(this.z - vec.z);

    }

    setFromSpherical(s): Vec3 {
        return this.copy(Vec3.setFromSphericalCoords(s.radius, s.phi, s.theta))
    }

    setFromCylindrical(c): Vec3 {

        return this.copy(Vec3.setFromCylindricalCoords(c.radius, c.theta, c.y))

    }


    // setFromEuler(e: Euler): Vec3 {

    //     this.x = e._x;
    //     this.y = e._y;
    //     this.z = e._z;

    //     return this;

    // }

    // setFromColor(c): Vec3 {

    //     this.x = c.r;
    //     this.y = c.g;
    //     this.z = c.b;

    //     return this;

    // }

    /**
     * compares the current vector with the given Vec3
     * @param {Vec3} vec 
     * @returns {boolean}
     */
    equals(vec: Vec3): boolean {

        return ((vec.x === this.x) && (vec.y === this.y) && (vec.z === this.z));

    }

    /**
     * return an array includes all the components of the vector in a row
     * @example 
     * new Vec3(4,5,6).toArray() => [4,5,6]
     * 
     * @returns {Array}
     */
    toArray(): Array<number> { return [this.x, this.y, this.z] }

    /**
     * return an object 
     * @example
     * new Vec3(4,5,6).toArray() => { x:4, y:5, z:6 }
     * 
     * @returns {object}
     */
    toJson(): object { return { x: f(this.x), y: f(this.y), z: f(this.z) } }

    /**
     * return a text 
     * @example
     * new Vec3(4,5,6).toArray() => "Vec3 => x: 4, y: 5, z: 6"
     * 
     * @returns string
     */
    toString(): string { return `Vec3 => x: ${f(this.x)}, y: ${f(this.y)}, z: ${f(this.z)}` }

    // fromBufferAttribute(attribute, index) {

    //     this.x = attribute.getX(index);
    //     this.y = attribute.getY(index);
    //     this.z = attribute.getZ(index);

    //     return this;

    // }

    random() {

        this.x = Math.random();
        this.y = Math.random();
        this.z = Math.random();

        return this;

    }



    *[Symbol.iterator]() {

        yield this.x;
        yield this.y;
        yield this.z;

    }


    /** gives a normal vector in x direction */
    public static i(): Vec3 { return new Vec3(1, 0, 0); }
    /** gives a normal vector in y direction */
    public static j(): Vec3 { return new Vec3(0, 1, 0); }
    /** gives a normal vector in z direction */
    public static k(): Vec3 { return new Vec3(0, 0, 1); }
    /**
     * It generates a vector and sets the components of the current vector using Cylindrical Coordinate system
     * the important point is the cyilindrical direction
     * @param {number} radius 
     * @param {number} theta angle in radian from X axis 
     * @param {number} z 
     * @returns {Vec3} equivalent cartesian vector
     */
    public static setFromCylindricalCoords(radius: number, theta: number, z: number) {
        return new Vec3(
            radius * Math.cos(theta),
            radius * Math.sin(theta),
            z
        );
    }
    /**
     * create equivalent vector in cartesian coordinate system from spherical coordinate system
     * @param {number} radius 
     * @param {number} phi angled in `radian` from Z axis
     * @param {number} theta angled in `radian` from X axis
     * @returns {Vec3} cartesian equivalent vector
     */
    public static setFromSphericalCoords(radius: number, phi: number, theta: number): Vec3 {
        const sinPhiRadius = Math.sin(phi) * radius;
        return new Vec3(
            sinPhiRadius * Math.cos(theta),
            sinPhiRadius * Math.sin(theta),
            Math.cos(phi) * radius
        );
    }

    /**
     * it subtracts two vector together
     * @example
     * a - b => ( a.x - b.x , a.y - b.y , a.z - b.z )
     * @param {Vec3} a  
     * @param {Vec3} b 
     * @returns {Vec3} 
     */
    public static subVectors(a: Vec3, b: Vec3): Vec3 {
        const result = new Vec3();
        result.x = a.x - b.x;
        result.y = a.y - b.y;
        result.z = a.z - b.z;
        return result;
    }

    /**
     * calculate cross multiplication of two vectors
     * @param {Vec3} a 
     * @param {Vec3} b 
     * @returns {Vec3}
     */
    public static crossVectors(a: Vec3, b: Vec3): Vec3 {
        const result = new Vec3();
        const ax = a.x, ay = a.y, az = a.z;
        const bx = b.x, by = b.y, bz = b.z;
        result.x = ay * bz - az * by;
        result.y = az * bx - ax * bz;
        result.z = ax * by - ay * bx;
        return result;
    }

    /**
     * multiply two vector corresponding components together
     * @param {Vec3} a 
     * @param {Vec3} b 
     * @returns {Vec3}
     */
    public static multilpyVectors(a: Vec3, b: Vec3): Vec3 {
        const result = new Vec3();
        result.x = a.x * b.x;
        result.y = a.y * b.y;
        result.z = a.z * b.z;
        return result;
    }

    /**
     * calculate dot multiplication of two vectors
     * @param {Vec3} a 
     * @param {Vec3} b 
     * @returns {number}
     */
    public static dotVectors(a: Vec3, b: Vec3): number {
        return a.x * b.x + a.y * b.y + a.z * b.z
    }

    /**
     * adds two vector together
     * @param {Vec3} a 
     * @param {Vec3} b 
     * @returns {Vec3}
     */
    public static addVectors(a: Vec3, b: Vec3): Vec3 {
        const result = new Vec3();
        result.x = a.x + b.x;
        result.y = a.y + b.y;
        result.z = a.z + b.z;

        return result;

    }

    /**
     * generates a vector with random direction
     * @returns {Vec3}
     */
    public static randomDirection(): Vec3 {

        // Derived from https://mathworld.wolfram.com/SpherePointPicking.html

        const u = (Math.random() - 0.5) * 2;
        const t = Math.random() * Math.PI * 2;
        const f = Math.sqrt(1 - u ** 2);

        return new Vec3(
            f * Math.cos(t),
            f * Math.sin(t),
            u
        )
    }

    /**
     * gets an array and return a vector from array items started from offset in index
     * @example
     * Vec3.fromArray([5,6,7]) 
     * @param {Array<number>} array 
     * @param {number} offset 
     * @returns {Vec3}
     */
    public static fromArray(array: Array<number>, offset = 0): Vec3 {
        return new Vec3(
            array[offset],
            array[offset + 1],
            array[offset + 2]
        )
    }

    /**
     * linear interpolation between two vector
     * @param {Vec3} vec1 
     * @param {Vec3} vec2 
     * @param {number} alpha 
     * @returns {Vec3}
     */
    public static lerpVectors(vec1: Vec3, vec2: Vec3, alpha: number): Vec3 {
        const result = new Vec3()
        result.x = vec1.x + (vec2.x - vec1.x) * alpha;
        result.y = vec1.y + (vec2.y - vec1.y) * alpha;
        result.z = vec1.z + (vec2.z - vec1.z) * alpha;

        return result;

    }


    /**
     * extracts the position components of given matrix as a vector
     * @param {Mat4} mat 
     * @returns {Vec3}
     */
    public static setFromMatrixPosition(mat: Mat4): Vec3 {
        const e = mat.elements;
        return new Vec3(
            e[12],
            e[13],
            e[14],
        )
    }

    /**
     * extracts scale factors from given matrix 4x4
     * @param {Mat4} mat
     * @returns {Vec3}
     */
    public static setFromMat4Scale(mat: Mat4): Vec3 {

        const sx = Vec3.setFromMat4Row(mat, 0).length();
        const sy = Vec3.setFromMat4Row(mat, 1).length();
        const sz = Vec3.setFromMat4Row(mat, 2).length();

        return new Vec3(sx, sy, sz)
    }

    /**
     * extracts a row of given matrix 4x4 as a vector
     * @param {Mat4} mat 
     * @param index 
     * @returns {Vec3}
     */
    public static setFromMat4Row(mat: Mat4, index: number): Vec3 {
        return Vec3.fromArray(mat.elements, index * 4);
    }

    /**
     * extracts a row from given matrix 3x3
     * @param {Mat3} mat 
     * @param {number} index 
     * @returns {Vec3}
     */
    public static setFromMatrix3Column(mat: Mat3, index: number): Vec3 {
        return Vec3.fromArray(mat.elements, index * 3);
    }
}

export { Vec3 };