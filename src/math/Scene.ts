// import { Obj } from "../formats";
// import { ParamMLObjectType } from "../schema";
import { Face3, Line3, Mat4, Mesh3, Polygon3, Vec3 } from ".";

export type SceneCopyOptions = {
    points?: boolean;
    lines?: boolean;
    polyLines?: boolean;
    polygons?: boolean;
    holes?: boolean;
    faces?: boolean;
    meshes?: boolean;
}

export default class Scene {
    // TODO: check which option is better: init all as parameter or init them in method

    private static _id: number = 0;
    id: number;
    points: Array<Vec3> = [];
    lines: Array<Line3> = [];
    // polyLines: Array<Polyline3> = [];
    polygons: Array<Polygon3> = [];
    holes: Array<Polygon3> = [];
    faces: Array<Face3> = [];
    meshes: Array<Mesh3> = [];

    constructor(public generatedBy: ParamMLObjectType) {
        this.id = ++Scene._id;
    }

    private mergePoints(scene: Scene): Scene { this.points.push(...scene.points); return this; }
    private mergeLines(scene: Scene): Scene { this.lines.push(...scene.lines); return this; }
    private mergePolylines(scene: Scene): Scene { this.polyLines.push(...scene.polyLines); return this; }
    private mergePolygons(scene: Scene): Scene { this.polygons.push(...scene.polygons); return this; }
    private mergeHoles(scene: Scene): Scene { this.holes.push(...scene.holes); return this; }
    private mergeFaces(scene: Scene): Scene { this.faces.push(...scene.faces); return this; }
    private mergeMeshes(scene: Scene): Scene { this.meshes.push(...scene.meshes); return this; }

    mergeScene(scene: Scene, options: SceneCopyOptions | null = null): Scene {
        if (!options) {
            this.mergePoints(scene);
            this.mergeLines(scene);
            this.mergePolylines(scene);
            this.mergePolygons(scene);
            this.mergeHoles(scene);
            this.mergeFaces(scene);
            this.mergeMeshes(scene);
        } else {
            if (options.points) this.mergePoints(scene);
            if (options.lines) this.mergeLines(scene);
            if (options.polyLines) this.mergePolylines(scene);
            if (options.polygons) this.mergePolygons(scene);
            if (options.holes) this.mergeHoles(scene);
            if (options.faces) this.mergeFaces(scene);
            if (options.meshes) this.mergeMeshes(scene);
        }
        return this;
    }

    mergeScenes(scenes: Array<Scene>, options: SceneCopyOptions | null = null,): Scene {
        scenes.forEach(s => {
            this.mergeScene(s, options);
        });
        return this;
    }
    addPoint(point: Vec3): Scene {
        this.points.push(point)
        return this;
    }
    addMesh(mesh: Mesh3): Scene {
        this.meshes.push(mesh);
        return this;
    }
    addFace(face: Face3): Scene {
        this.faces.push(face);
        return this;
    }
    addPolygon(polygon: Polygon3): Scene {
        this.polygons.push(polygon);
        return this;
    }
    addPolygons(polygons: Array<Polygon3>): Scene {
        polygons.forEach(p => this.addPolygon(p));
        return this;
    }
    addHole(holes: Polygon3): Scene {
        this.holes.push(holes);
        return this;
    }
    addHoles(holes: Array<Polygon3>): Scene {
        holes.forEach(h => this.addHole(h));
        return this;
    }
    addLine(line: Line3): Scene {
        this.lines.push(line);
        return this;
    }
    toJson(): object {
        return {
            generatedBy: this.generatedBy,
            points: this.points.map(v => v.toJson()),
            lines: this.lines.map(l => l.toJson()),
            polylines: this.polyLines.map(p => p.toJson()),
            polygons: this.polygons.map(p => p.toJson()),
            holes: this.holes.map(p => p.toJson()),
            faces: this.faces.map(face => face.toJson()),
            meshes: this.meshes.map(mesh => mesh.toJson())
        }
    }

    toObj(): string {
        const obj = new Obj();

        obj.mergeMany(this.meshes.map(m => m.toObj()));
        // obj.mergeMany(this.faces.map(m => m.toObj()));

        return obj.toString();
    }

    applyMat4x4(mat: Mat4x4): Scene {
        this.points.forEach(m => m.applyMat4x4(mat));
        this.lines.forEach(m => m.applyMat4x4(mat));
        this.polyLines.forEach(m => m.applyMat4x4(mat));
        this.polygons.forEach(m => m.applyMat4x4(mat));
        this.holes.forEach(m => m.applyMat4x4(mat));
        this.faces.forEach(m => m.applyMat4x4(mat));
        this.meshes.forEach(m => m.applyMat4x4(mat));
        return this;
    }

    public static fromTwoFaces(generatedby: ParamMLObjectType, faceA: Face3, faceB: Face3, options: SceneFromFacesOptions): Scene {
        if (!options) throw new Error("Scene.fromTwoFaces | options to draw should be defined")
        const result = new Scene(generatedby);
        const mesh = new Mesh3();
        if (options.DrawFaceA) mesh.mergeOne(faceA.toMesh3())
        if (options.DrawFaceB) mesh.mergeOne(faceB.toMesh3())
        if (options.DrawFaceABorder) {
            faceA.polygons.forEach(p => result.addPolygon(p))
            faceA.holes.forEach(p => result.addPolygon(p))
        }
        if (options.DrawFaceBBorder) {
            faceB.polygons.forEach(p => result.addPolygon(p))
            faceB.holes.forEach(p => result.addPolygon(p))
        }
        // side lines
        if (options.DrawBorder) {
            for (let p = 0; p < faceA.polygons.length; p++) {
                faceA.polygons[p].closePolygon();
                for (let i = 0; i < faceA.polygons[p].points.length; i++) {
                    result.addLine(new Line3(faceA.polygons[p].points[i], faceB.polygons[p].points[i]))
                }
            }
            for (let p = 0; p < faceA.holes.length; p++) {
                faceA.holes[p].closePolygon();
                for (let i = 0; i < faceA.holes[p].points.length; i++) {
                    result.addLine(new Line3(faceA.holes[p].points[i], faceB.holes[p].points[i]))
                }
            }
        }

        // side faces
        mesh.mergeOne(Mesh3.sidesFromTwoFaces(faceA, faceB));
        result.addMesh(mesh);

        return result;
    }
}
export type SceneFromFacesOptions = {
    DrawFaceA?: boolean;
    DrawFaceB?: boolean;
    DrawBorder?: boolean;
    DrawFaceABorder?: boolean;
    DrawFaceBBorder?: boolean;
    PolyLine?: boolean;

}