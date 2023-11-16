import { CircularLinkedList } from 'predefined-ds';
import { Mesh3, Vec3 } from "../../math";
import { Vertex3 } from "../../math/Vertex3";
import { earcut } from "./EarCut";
import { ITriangulation3 } from "./ITriangulation";

export default class EarcutTriangulation3 implements ITriangulation3 {

    vertices: CircularLinkedList<Vec3>;
    holes: CircularLinkedList<Vec3>[];
    data: Array<number>;
    holesIndices: Array<number>;
    dim: number = 3;
    generateMesh(vertices: CircularLinkedList<Vec3>, holes: CircularLinkedList<Vec3>[]): Mesh3 {
        this.vertices = vertices;
        this.holes = holes;

        this.data = this.getFlat(this.vertices.toArray());
        this.holesIndices = this.getHoleIndices();
        // console.log("Data", this.data);
        // console.log("holesIndices", this.holesIndices);

        const triangles: Array<number> = earcut(this.data, this.holesIndices, this.dim);
        // console.log("Triangles", triangles);
        const result = new Mesh3(
            [
                ...vertices.map((val, i) => new Vertex3(val.value.clone())),
                ...holes.flat().map((vals, i) => vals.map(val => new Vertex3(val.value.clone())))
            ],
            triangles
        );

        return result;
    }

    get normal(): Vec3 {
        const result = this.vertices.at(1).value.clone().sub(this.vertices.at(0).value.clone())
            .cross(this.vertices.at(2).value.clone().sub(this.vertices.at(0).value.clone())).normalize();
        // console.log("Normal : ", result.toJson());
        return result;
    }

    getFlat(vertices: Array<Vec3>): Array<number> {
        if (Math.abs(Math.round(this.normal.x)) === 1) return vertices.flatMap(v => { return v.yzx.toArray() });
        else if (Math.abs(Math.round(this.normal.y)) === 1) return vertices.flatMap(v => { return v.xzy.toArray() });
        else if (Math.abs(Math.round(this.normal.z)) === 1) return vertices.flatMap(v => { return v.xyz.toArray() });
        else {
            console.log("Normal ", this.normal.toJson());
            console.log("DATA", this.data)
            console.log("Holes", this.holes)
            console.log("HoleIndices", this.holesIndices)
            throw new Error("EarcutTriangulation3.getFlatVertices | here should be modified")
            // TODO: new axes should be generated and transform all the data to local coordinate
            // then you can triangulate them
        }
    }

    getHoleIndices(): Array<number> {
        // this indices are the indices of the first element of holes at the data array
        const holesIndices: Array<number> = [];
        let nextIndex = this.vertices.length;
        this.holes.forEach(h => {
            holesIndices.push(nextIndex);
            nextIndex += h.length;
            this.data.push(...this.getFlat(h.toArray()));
        })
        return holesIndices;
    }



}