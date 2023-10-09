import Vec3 from "./Vec3";

export default class Plane3 {

	private _point: Vec3;
	private _normal: Vec3;

	constructor(onePoint: Vec3, normal: Vec3) {
		this._normal = normal.normalize()
		this._point = onePoint
	}

}

export { Plane3 };