import { Mat4, Vec3 } from ".";

export default class Vertex3 {
    position: Vec3;
    normal: Vec3;

    id: string;

    constructor(point: Vec3, normal: Vec3 = new Vec3(1, 0, 0)) {
        this.position = point;
        this.normal = normal;
        this.generateId()
    }

    clone = (): Vertex3 => new Vertex3(this.position.clone(), this.normal.clone());

    generateId() {
        this.id = `${JSON.stringify(this.toJson())}`;
    }

    /**
     * applys given transformation matrix 
     * @param {Mat4} math 
     * @returns {Vertex3}
     */
    applyMat4(math: Mat4): this {
        this.position.applyMat4(math)
        this.normal.applyMat4(math)
        return this
    }

    toJson(): object {
        return {
            position: this.position.toJson(),
            normal: this.normal.toJson()
        }
    }

}