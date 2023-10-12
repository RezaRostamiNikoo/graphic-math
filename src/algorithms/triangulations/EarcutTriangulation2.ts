// import { earcut } from "./EarCut";
// import { ITriangulation2 } from "./ITriangulation";

// export default class EarcutTriangulation2 implements ITriangulation2 {
//     generateMesh(vertices: Array<Vertex2>, holes: Array<Array<Vertex2>>): Mesh2 {

//         const result = new Mesh2();
//         const data: Array<number> = vertices.map((value, i): Array<number> => { return [value.position.x, value.position.y] })
//             .flat(1);

//         const h = holes.map((value, i) => value.map((value, i): Array<number> => { return [value.position.x, value.position.y] })
//             .flat(1));

//         // this indices are the indices of the first element of holes at the data array
//         const holesIndices: Array<number> = [];

//         h.forEach((val, i) => {
//             holesIndices.push(data.length);
//             data.push(...val);
//         })

//         const triangles: Array<number> = earcut(data, holesIndices, 2);



//         result.vertices = vertices.map((val, i) => val.clone())
//             .concat(holes.flat(1).map((v, i) => v.clone()));
//         result.indices = triangles;

//         return result;
//     }


// }