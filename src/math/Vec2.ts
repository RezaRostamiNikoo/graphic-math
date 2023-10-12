
import { Mat3 } from "./Mat3";
import { Vec3 } from "./Vec3";

export class Vec2 {

    isVector2: boolean = true;

    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    /** its another name for specific use case of vector for storing width and height of screen. returns x as width component */
    get width(): number { return this.x; }
    /** its another name for specific use case of vector for storing width and height of screen. sets x as width component */
    set width(value) { this.x = value; }
    /** its another name for specific use case of vector for storing width and height of screen. returns y as height component */
    get height(): number { return this.y; }
    /** its another name for specific use case of vector for storing width and height of screen. sets x as width component */
    set height(value) { this.y = value; }


    public get yx(): Vec2 { return new Vec2(this.y, this.x); }
    public get xyo(): Vec3 { return new Vec3(this.x, this.y, 0); }
    public get yxo(): Vec3 { return new Vec3(this.y, this.x, 0); }
    public get xoy(): Vec3 { return new Vec3(this.x, 0, this.y); }
    public get yox(): Vec3 { return new Vec3(this.y, 0, this.x); }
    public get oxy(): Vec3 { return new Vec3(0, this.x, this.y); }
    public get oyx(): Vec3 { return new Vec3(0, this.y, this.x); }


    /** sets vector's components */
    set(x: number, y: number): Vec2 {
        this.x = x;
        this.y = y;
        return this;
    }

    /**
     *  set a scalar value for all components
     * @param {number} scalar 
     * @returns {Vec2}
     */
    setScalar(scalar: number): Vec2 {
        this.x = scalar;
        this.y = scalar;
        return this;
    }

    /**
     * sets x components of the vector
     * @param {numver} x 
     * @returns {Vec2}
     */
    setX(x: number): Vec2 { this.x = x; return this; }

    /**
     * sets y components of the vector
     * @param {numver} y 
     * @returns {Vec2}
     */
    setY(y: number): Vec2 { this.y = y; return this; }

    /**
     * sets a compnents based on its index
     * @param {number} index index of components 0 or 1
     * @param {numbe} value 
     * @returns {Vec2}
     */
    setComponent(index: 0 | 1, value: number): Vec2 {
        switch (index) {
            case 0: this.x = value; break;
            case 1: this.y = value; break;
            default: throw new Error('index is out of range: ' + index);
        }
        return this;
    }

    /**
     * returns a component based on its index. 0 for x and 1 for y
     * @param {number} index index of components 0 or 1
     * @returns 
     */
    getComponent(index: 0 | 1) {
        switch (index) {
            case 0: return this.x;
            case 1: return this.y;
            default: throw new Error('index is out of range: ' + index);
        }
    }

    /**
     * adds a scalar value to the all components (X and Y)
     * @param {number} scalar 
     * @returns {Vec2}
     */
    addScalar(scalar: number): Vec2 {
        this.x += scalar;
        this.y += scalar;
        return this;
    }

    /**
     * adds given vector's components to the current vector's corresponding components
     * @param {Vec2} vec 
     * @returns {Vec2}
     */
    add(vec: Vec2): Vec2 {
        this.x += vec.x;
        this.y += vec.y;
        return this;
    }

    /**
     * method make the vector recerse
     * @returns return Vector21
     */
    reverse(): Vec2 { return this.multiplyScalar(-1); }

    /** returns a copy of vector */
    clone(): Vec2 { return new Vec2(this.x, this.y); }

    /** copys given vector's components and sets them to the current vector's components */
    copy(v: Vec2): Vec2 {
        this.x = v.x;
        this.y = v.y;
        return this;
    }

    /**
     * 
     * @param {number} [z=0] third component  
     * @returns {Vec3}
     */
    toVec3(z: number = 0): Vec3 { return new Vec3(this.x, this.y, 0); }

    /**
     * subtracts given vector from current vector
     * @param {Vec2} vec 
     * @returns {Vec2}
     */
    sub(vec: Vec2): Vec2 {

        this.x -= vec.x;
        this.y -= vec.y;

        return this;

    }

    /**
     * subtracts a scalar value from vector's components
     * @param {number} scalar 
     * @returns {Vec2}
     */
    subScalar(scalar: number): Vec2 {
        this.x -= scalar;
        this.y -= scalar;
        return this;
    }

    /**
     * multiplys components together
     * @param {Vec2} vec 
     * @returns {Vec2}
     */
    multiply(vec: Vec2): Vec2 {

        this.x *= vec.x;
        this.y *= vec.y;

        return this;

    }

    /**
     * multiplys scalar value to the components
     * @param {number} scalar 
     * @returns {Vec2}
     */
    multiplyScalar(scalar: number): Vec2 {

        this.x *= scalar;
        this.y *= scalar;

        return this;

    }

    /**
     * divides corresponding components by components of the given vectors
     * @param {Vec2} vec 
     * @returns {Vec2}
     */
    divide(vec: Vec2): Vec2 {
        this.x /= vec.x;
        this.y /= vec.y;
        return this;
    }

    /**
     * divides components by a scalar value
     * @param {number} scalar 
     * @returns {Vec2}
     */
    divideScalar(scalar: number): Vec2 { return this.multiplyScalar(1 / scalar); }

    applyMat3(mat: Mat3): Vec2 {

        const x = this.x, y = this.y;
        const e = mat.elements;

        this.x = e[0] * x + e[3] * y + e[6];
        this.y = e[1] * x + e[4] * y + e[7];

        return this;

    }

    /**
     * choose minimum value for each components in comparison with given vector
     * @param {Vec2} vec 
     * @returns {Vec2}
     */
    min(vec: Vec2): Vec2 {

        this.x = Math.min(this.x, vec.x);
        this.y = Math.min(this.y, vec.y);

        return this;

    }

    /**
     * choose maximum value for each components in comparison with given vector
     * @param {Vec2} vec 
     * @returns {Vec2}
     */
    max(v: Vec2): Vec2 {
        this.x = Math.max(this.x, v.x);
        this.y = Math.max(this.y, v.y);
        return this;
    }

    /**
     * choose values for components based on min and max values 
     * @param {Vec2} min 
     * @param {Vec2} max 
     * @returns {number}
     */
    clamp(min: Vec2, max: Vec2): Vec2 {

        // assumes min < max, componentwise

        this.x = Math.max(min.x, Math.min(max.x, this.x));
        this.y = Math.max(min.y, Math.min(max.y, this.y));

        return this;

    }

    /**
     * choose values for components based on min and max values 
     * @param {number} minVal 
     * @param {number} maxVal 
     * @returns {Vec2}
     */
    clampScalar(minVal: number, maxVal: number): Vec2 {

        this.x = Math.max(minVal, Math.min(maxVal, this.x));
        this.y = Math.max(minVal, Math.min(maxVal, this.y));

        return this;

    }

    /**
     * sets a length for the vectors between min and max 
     * @param {number} min 
     * @param {numbe} max 
     * @returns {Vec2}
     */
    clampLength(min: number, max: number): Vec2 {
        return this.setLength(Math.max(min, Math.min(max, this.length())));
    }

    /**
     * calculates fllor for all components
     * @returns {Vec2}
     */
    floor(): Vec2 {

        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);

        return this;

    }

    /**
     * calculates ceil for all components
     * @returns {Vec2}
     */
    ceil(): Vec2 {

        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);

        return this;

    }

    /**
     * makes all the components rounded
     * @returns {Vec2}
     */
    round(): Vec2 {

        this.x = Math.round(this.x);
        this.y = Math.round(this.y);

        return this;

    }

    /**
     * makes all the components rounded near to zero
     * @returns {Vec2}
     */
    roundToZero(): Vec2 {

        this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
        this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);

        return this;

    }

    /**
     * negates all the components
     * @returns {Vec2}
     */
    negate(): Vec2 {

        this.x = - this.x;
        this.y = - this.y;

        return this;

    }

    /**
     * calaulates dot product 
     * @param {Vec2} vec 
     * @returns 
     */
    dot(vec: Vec2): number {

        return this.x * vec.x + this.y * vec.y;

    }

    /**
     * calculates cross product
     * @param {Vec2} vec  
     * @returns {Vec2}
     */
    cross(vec: Vec2): number {

        return this.x * vec.y - this.y * vec.x;

    }

    /**
     * squared length of the vector
     * @returns {number}
     */
    lengthSq(): number {

        return this.x * this.x + this.y * this.y;

    }

    /**
     * length of the vector
     * @returns {number}
     */
    length(): number {

        return Math.sqrt(this.x * this.x + this.y * this.y);

    }

    /**
     * returns the manhatan length of the vector
     * @returns {number}
     */
    manhattanLength(): number {

        return Math.abs(this.x) + Math.abs(this.y);

    }

    /**
     * normalizes the vector in order to have a length of one unit
     * @returns {Vec2}
     */
    normalize(): Vec2 {

        return this.divideScalar(this.length() || 1);

    }

    /**
     * computes the angle in radians with respect to the positive x-axis
     * @returns {number}
     */
    angle(): number {
        const angle = Math.atan2(- this.y, - this.x) + Math.PI;
        return angle;
    }

    /**
     * computs the angle of the vector respect to the given vector
     * @param {Vec2} vec 
     * @returns {number}
     */
    angleTo(vec: Vec2): number {
        const denominator = Math.sqrt(this.lengthSq() * vec.lengthSq());
        if (denominator === 0) return Math.PI / 2;
        const theta = this.dot(vec) / denominator;
        // clamp, to handle numerical problems
        return Math.acos(Math.max(-1, Math.min(theta, 1)))
    }

    /**
     * computes distance between the vector and given vector
     * @param {Vec2} vec 
     * @returns {Vec2}
     */
    distanceTo(vec: Vec2): number {

        return Math.sqrt(this.distanceToSquared(vec));

    }

    /**
     * squared distance between two vectors
     * @param {Vec2} vec 
     * @returns {number}
     */
    distanceToSquared(vec: Vec2): number {

        const dx = this.x - vec.x, dy = this.y - vec.y;
        return dx * dx + dy * dy;

    }

    /**
     * computes manhatan distance between two vector
     * @param {Vec2} v 
     * @returns {Vec2}
     */
    manhattanDistanceTo(v: Vec2): number { return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) }

    /**
     * sets a specific length for the vector. actually it changes the length of the vector
     * @param {number} length 
     * @returns {Vec2}
     */
    setLength(length: number): Vec2 {

        return this.normalize().multiplyScalar(length);

    }

    /**
     * interpolates between to vector's components
     * @param {Vec2} vec 
     * @param {number} alpha 
     * @returns {Vec2}
     */
    lerp(vec: Vec2, alpha: number): Vec2 {

        this.x += (vec.x - this.x) * alpha;
        this.y += (vec.y - this.y) * alpha;

        return this;

    }

    /**
     * compares current vector with given vector and if their components were equal so they are equal and returns true otherwise returns false
     * @param {Vec2} vec 
     * @returns {boolean}
     */
    equals(vec: Vec2): boolean {

        return ((vec.x === this.x) && (vec.y === this.y));

    }

    /**
     * returns an array of components
     * @param {Array<number>} [array=[]] 
     * @param {number} offset 
     * @returns {Array<number>}
     */
    toArray(array: Array<number> = [], offset: number = 0) {

        array[offset] = this.x;
        array[offset + 1] = this.y;

        return array;

    }

    /**
     * rotates vector around the prependicular vector to the xy plan and arounf a center 
     * @param {Vec2} center 
     * @param {number} angle 
     * @returns 
     */
    rotateAround(center: Vec2, angle: number) {

        const c = Math.cos(angle), s = Math.sin(angle);

        const x = this.x - center.x;
        const y = this.y - center.y;

        this.x = x * c - y * s + center.x;
        this.y = x * s + y * c + center.y;

        return this;

    }

    /**
     * create a random vec2 
     * @returns {Vec2}
     */
    random() {

        this.x = Math.random();
        this.y = Math.random();

        return this;

    }

    *[Symbol.iterator]() {

        yield this.x;
        yield this.y;

    }

    /** normal vector for X Axis */
    public static i(): Vec2 { return new Vec2(1, 0); }

    /** normal vector for Y Axis */
    public static j(): Vec2 { return new Vec2(0, 1); }

    /**
     * this methos create a unit Vector from an angle
     * @param angle in radian - angle starts from X axis counter clockwise
     * @returns returns a Vec2
     */
    public static fromAngle = (angle: number): Vec2 => new Vec2(Math.sin(angle), Math.cos(angle));
    // public static fromPoints = (p0: Point2, p1: Point2): Vec2 => new Vec2(p1.x - p0.x, p1.y - p0.y);

    /**
     * adds two vectors' components together
     * @param {Vec2} a 
     * @param {Vec2} b 
     * @returns {Vec2}
     */
    public static addVectors(a: Vec2, b: Vec2): Vec2 {
        return new Vec2(a.x + b.x, a.y + b.y);
    }

    /**
     * subtracts two vector from each other
     * @param {Vec2} a 
     * @param {Vec2} b 
     * @returns {Vec2}
     */
    public static subVectors(a: Vec2, b: Vec2): Vec2 {
        return new Vec2(
            a.x - b.x,
            a.y - b.y
        );
    }

    /**
     * interpolates between two vectors
     * @param {Vec2} v1 
     * @param {Vec2} v2 
     * @param {number} t between 0 to 1 
     * @returns {Vec2}
     */
    public static lerpVectors(v1: Vec2, v2: Vec2, t: number): Vec2 {
        const result = new Vec2();
        result.x = v1.x + (v2.x - v1.x) * t;
        result.y = v1.y + (v2.y - v1.y) * t;
        return result;
    }

    /**
     * creates vector2 from an array
     * @param {Array<number>} array 
     * @param {number} offset 
     * @returns {Vec2}
     */
    public static fromArray(array: Array<number>, offset: number = 0) {
        return new Vec2(
            array[offset],
            array[offset + 1]
        )
    }

}
