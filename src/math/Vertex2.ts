import { Vec2 } from ".";

export class Vertex2 {
    position: Vec2;
    normal: Vec2;

    constructor(point: Vec2, normal: Vec2 = new Vec2(1, 0)) {
        this.position = point.clone();
        this.normal = normal.clone().normalize();
    }

    add(v: Vec2): Vertex2 {
        this.position.add(v);
        return this;
    }

    clone = (): Vertex2 => new Vertex2(this.position.clone(), this.normal.clone());
}
