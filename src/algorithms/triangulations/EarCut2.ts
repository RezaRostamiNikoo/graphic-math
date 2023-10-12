// import { Mesh2, Vector3, Vertex2 } from "..";
// import NodeVector3 from "../NodeVector3";

// export default class EarcutAlg {


//     earcut(data: Array<number>, holeIndices: Array<number>, dimension: number): Array<number> {

//         dimension = dimension || 2;

//         var hasHoles = holeIndices && holeIndices.length,
//             outerLen = hasHoles ? holeIndices[0] * dimension : data.length,
//             outerNode = this.linkedList(data, 0, outerLen, dimension, true),
//             triangles: Array<number> = [];

//         if (!outerNode || outerNode.next === outerNode.prev) return triangles;

//         var minX, minY, maxX, maxY, x, y, invSize;

//         if (hasHoles) outerNode = this.eliminateHoles(data, holeIndices, outerNode, dimension);

//         // if the shape is not too simple, we'll use z-order curve hash later; calculate polygon bbox
//         if (data.length > 80 * dimension) {
//             minX = maxX = data[0];
//             minY = maxY = data[1];

//             for (var i = dimension; i < outerLen; i += dimension) {
//                 x = data[i];
//                 y = data[i + 1];
//                 if (x < minX) minX = x;
//                 if (y < minY) minY = y;
//                 if (x > maxX) maxX = x;
//                 if (y > maxY) maxY = y;
//             }

//             // minX, minY and invSize are later used to transform coords into integers for z-order calculation
//             invSize = Math.max(maxX - minX, maxY - minY);
//             invSize = invSize !== 0 ? 32767 / invSize : 0;
//         }

//         this.earcutLinked(outerNode, triangles, dimension, minX, minY, invSize, 0);

//         return triangles;
//     }

//     // create a circular doubly linked list from polygon points in the specified winding order
//     linkedList(data: Array<number>, start: number, end: number, dimension: number, clockwise: boolean) {
//         var i, last;

//         if (clockwise === (this.signedArea(data, start, end, dimension) > 0)) {
//             for (i = start; i < end; i += dimension) last = this.insertNode(i, data[i], data[i + 1], last);
//         } else {
//             for (i = end - dimension; i >= start; i -= dimension) last = this.insertNode(i, data[i], data[i + 1], last);
//         }

//         if (last && this.equals(last, last.next)) {
//             this.removevNode(last);
//             last = last.next;
//         }

//         return last;
//     }

//     // eliminate colinear or duplicate points
//     filterPoints(start: NodeVector3, end: NodeVector3 = null) {
//         if (!start) return start;
//         if (!end) end = start;

//         var p: NodeVector3 = start,
//             again;
//         do {
//             again = false;

//             if (!p.steiner && (this.equals(p, p.next) || this.area(p.prev, p, p.next) === 0)) {
//                 this.removevNode(p);
//                 p = end = p.prev;
//                 if (p === p.next) break;
//                 again = true;

//             } else {
//                 p = p.next;
//             }
//         } while (again || p !== end);

//         return end;
//     }

//     // main ear slicing loop which triangulates a polygon (given as a linked list)
//     earcutLinked(ear: NodeVector3, triangles: Array<number>, dimension: number, minX: number, minY: number, invSize: number, pass: any) {
//         if (!ear) return;

//         // interlink polygon nodes in z-order
//         if (!pass && invSize) this.indexCurve(ear, minX, minY, invSize);

//         var stop = ear,
//             prev, next;

//         // iterate through ears, slicing them one by one
//         while (ear.prev !== ear.next) {
//             prev = ear.prev;
//             next = ear.next;

//             if (invSize ? this.isEarHashed(ear, minX, minY, invSize) : this.isEar(ear)) {
//                 // cut off the triangle
//                 triangles.push(prev.vectorIndex / dimension | 0);
//                 triangles.push(ear.vectorIndex / dimension | 0);
//                 triangles.push(next.vectorIndex / dimension | 0);

//                 this.removevNode(ear);

//                 // skipping the next vertex leads to less sliver triangles
//                 ear = next.next;
//                 stop = next.next;

//                 continue;
//             }

//             ear = next;

//             // if we looped through the whole remaining polygon and can't find any more ears
//             if (ear === stop) {
//                 // try filtering points and slicing again
//                 if (!pass) {
//                     this.earcutLinked(this.filterPoints(ear), triangles, dimension, minX, minY, invSize, 1);

//                     // if this didn't work, try curing all small self-intersections locally
//                 } else if (pass === 1) {
//                     ear = this.cureLocalIntersections(this.filterPoints(ear), triangles, dimension);
//                     this.earcutLinked(ear, triangles, dimension, minX, minY, invSize, 2);

//                     // as a last resort, try splitting the remaining polygon into two
//                 } else if (pass === 2) {
//                     this.splitEarcut(ear, triangles, dimension, minX, minY, invSize);
//                 }

//                 break;
//             }
//         }
//     }

//     // check whether a polygon vnode forms a valid ear with adjacent nodes
//     isEar(ear: NodeVector3) {
//         var a: NodeVector3 = ear.prev,
//             b: NodeVector3 = ear,
//             c: NodeVector3 = ear.next;

//         if (this.area(a, b, c) >= 0) return false; // reflex, can't be an ear

//         // now make sure we don't have other points inside the potential ear
//         var ax = a.x, bx = b.x, cx = c.x, ay = a.y, by = b.y, cy = c.y;

//         // triangle bbox; min & max are calculated like this for speed
//         var x0 = ax < bx ? (ax < cx ? ax : cx) : (bx < cx ? bx : cx),
//             y0 = ay < by ? (ay < cy ? ay : cy) : (by < cy ? by : cy),
//             x1 = ax > bx ? (ax > cx ? ax : cx) : (bx > cx ? bx : cx),
//             y1 = ay > by ? (ay > cy ? ay : cy) : (by > cy ? by : cy);

//         var p = c.next;
//         while (p !== a) {
//             if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1 &&
//                 this.pointInTriangle(ax, ay, bx, by, cx, cy, p.x, p.y) &&
//                 this.area(p.prev, p, p.next) >= 0) return false;
//             p = p.next;
//         }

//         return true;
//     }

//     isEarHashed(ear: NodeVector3, minX: number, minY: number, invSize: number) {
//         var a: NodeVector3 = ear.prev,
//             b = ear,
//             c = ear.next;

//         if (this.area(a, b, c) >= 0) return false; // reflex, can't be an ear

//         var ax = a.x, bx = b.x, cx = c.x, ay = a.y, by = b.y, cy = c.y;

//         // triangle bbox; min & max are calculated like this for speed
//         var x0 = ax < bx ? (ax < cx ? ax : cx) : (bx < cx ? bx : cx),
//             y0 = ay < by ? (ay < cy ? ay : cy) : (by < cy ? by : cy),
//             x1 = ax > bx ? (ax > cx ? ax : cx) : (bx > cx ? bx : cx),
//             y1 = ay > by ? (ay > cy ? ay : cy) : (by > cy ? by : cy);

//         // z-order range for the current triangle bbox;
//         var minZ: number = this.zOrder(x0, y0, minX, minY, invSize),
//             maxZ: number = this.zOrder(x1, y1, minX, minY, invSize);

//         var p: NodeVector3 = ear.prevZ,
//             n: NodeVector3 = ear.nextZ;

//         // look for points inside the triangle in both directions
//         while (p && p.zIndex >= minZ && n && n.zIndex <= maxZ) {
//             if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1 && p !== a && p !== c &&
//                 this.pointInTriangle(ax, ay, bx, by, cx, cy, p.x, p.y) && this.area(p.prev, p, p.next) >= 0) return false;
//             p = p.prevZ;

//             if (n.x >= x0 && n.x <= x1 && n.y >= y0 && n.y <= y1 && n !== a && n !== c &&
//                 this.pointInTriangle(ax, ay, bx, by, cx, cy, n.x, n.y) && this.area(n.prev, n, n.next) >= 0) return false;
//             n = n.nextZ;
//         }

//         // look for remaining points in decreasing z-order
//         while (p && p.zIndex >= minZ) {
//             if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1 && p !== a && p !== c &&
//                 this.pointInTriangle(ax, ay, bx, by, cx, cy, p.x, p.y) && this.area(p.prev, p, p.next) >= 0) return false;
//             p = p.prevZ;
//         }

//         // look for remaining points in increasing z-order
//         while (n && n.zIndex <= maxZ) {
//             if (n.x >= x0 && n.x <= x1 && n.y >= y0 && n.y <= y1 && n !== a && n !== c &&
//                 this.pointInTriangle(ax, ay, bx, by, cx, cy, n.x, n.y) && this.area(n.prev, n, n.next) >= 0) return false;
//             n = n.nextZ;
//         }

//         return true;
//     }

//     // go through all polygon nodes and cure small local self-intersections
//     cureLocalIntersections(start: NodeVector3, triangles: Array<number>, dimension: number) {
//         var p: NodeVector3 = start;
//         do {
//             var a = p.prev,
//                 b = p.next.next;

//             if (!this.equals(a, b) && this.intersects(a, p, p.next, b) && this.locallyInside(a, b) && this.locallyInside(b, a)) {

//                 triangles.push(a.vectorIndex / dimension | 0);
//                 triangles.push(p.vectorIndex / dimension | 0);
//                 triangles.push(b.vectorIndex / dimension | 0);

//                 // remove two nodes involved
//                 this.removevNode(p);
//                 this.removevNode(p.next);

//                 p = start = b;
//             }
//             p = p.next;
//         } while (p !== start);

//         return this.filterPoints(p);
//     }

//     // try splitting polygon into two and triangulate them independently
//     splitEarcut(start: NodeVector3, triangles: Array<number>, dimension: number, minX: number, minY: number, invSize: number) {
//         // look for a valid diagonal that divides the polygon into two
//         var a: NodeVector3 = start;
//         do {
//             var b = a.next.next;
//             while (b !== a.prev) {
//                 if (a.vectorIndex !== b.vectorIndex && this.isValidDiagonal(a, b)) {
//                     // split the polygon in two by the diagonal
//                     var c = this.splitPolygon(a, b);

//                     // filter colinear points around the cuts
//                     a = this.filterPoints(a, a.next);
//                     c = this.filterPoints(c, c.next);

//                     // run earcut on each half
//                     this.earcutLinked(a, triangles, dimension, minX, minY, invSize, 0);
//                     this.earcutLinked(c, triangles, dimension, minX, minY, invSize, 0);
//                     return;
//                 }
//                 b = b.next;
//             }
//             a = a.next;
//         } while (a !== start);
//     }

//     // link every hole into the outer loop, producing a single-ring polygon without holes
//     eliminateHoles(data: Array<number>, holeIndices: Array<number>, outerNode: NodeVector3, dimension: number) {
//         var queue = [],
//             i, len, start, end, list;

//         for (i = 0, len = holeIndices.length; i < len; i++) {
//             start = holeIndices[i] * dimension;
//             end = i < len - 1 ? holeIndices[i + 1] * dimension : data.length;
//             list = this.linkedList(data, start, end, dimension, false);
//             if (list === list.next) list.steiner = true;
//             queue.push(this.getLeftmost(list));
//         }

//         queue.sort(this.compareX);

//         // process holes from left to right
//         for (i = 0; i < queue.length; i++) {
//             outerNode = this.eliminateHole(queue[i], outerNode);
//         }

//         return outerNode;
//     }

//     compareX(a: NodeVector3, b: NodeVector3) {
//         return a.x - b.x;
//     }

//     // find a bridge between vertices that connects hole with an outer ring and and link it
//     eliminateHole(hole: NodeVector3, outerNode: NodeVector3) {
//         var bridge = this.findHoleBridge(hole, outerNode);
//         if (!bridge) {
//             return outerNode;
//         }

//         var bridgeReverse = this.splitPolygon(bridge, hole);

//         // filter collinear points around the cuts
//         this.filterPoints(bridgeReverse, bridgeReverse.next);
//         return this.filterPoints(bridge, bridge.next);
//     }

//     // David Eberly's algorithm for finding a bridge between hole and outer polygon
//     findHoleBridge(hole: NodeVector3, outerNode: NodeVector3) {
//         var p = outerNode,
//             hx = hole.x,
//             hy = hole.y,
//             qx = -Infinity,
//             m;

//         // find a segment intersected by a ray from the hole's leftmost point to the left;
//         // segment's endpoint with lesser x will be potential connection point
//         do {
//             if (hy <= p.y && hy >= p.next.y && p.next.y !== p.y) {
//                 var x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);
//                 if (x <= hx && x > qx) {
//                     qx = x;
//                     m = p.x < p.next.x ? p : p.next;
//                     if (x === hx) return m; // hole touches outer segment; pick leftmost endpoint
//                 }
//             }
//             p = p.next;
//         } while (p !== outerNode);

//         if (!m) return null;

//         // look for points inside the triangle of hole point, segment intersection and endpoint;
//         // if there are no points found, we have a valid connection;
//         // otherwise choose the point of the minimum angle with the ray as connection point

//         var stop = m,
//             mx = m.x,
//             my = m.y,
//             tanMin = Infinity,
//             tan;

//         p = m;

//         do {
//             if (hx >= p.x && p.x >= mx && hx !== p.x &&
//                 this.pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y)) {

//                 tan = Math.abs(hy - p.y) / (hx - p.x); // tangential

//                 if (this.locallyInside(p, hole) &&
//                     (tan < tanMin || (tan === tanMin && (p.x > m.x || (p.x === m.x && this.sectorContainsSector(m, p)))))) {
//                     m = p;
//                     tanMin = tan;
//                 }
//             }

//             p = p.next;
//         } while (p !== stop);

//         return m;
//     }

//     // whether sector in vertex m contains sector in vertex p in the same coordinates
//     sectorContainsSector(m: NodeVector3, p: NodeVector3) {
//         return this.area(m.prev, m, p.prev) < 0 && this.area(p.next, m, m.next) < 0;
//     }

//     // interlink polygon nodes in z-order
//     indexCurve(start: NodeVector3, minX: number, minY: number, invSize: number) {
//         var p = start;
//         do {
//             if (p.zIndex === 0) p.zIndex = this.zOrder(p.x, p.y, minX, minY, invSize);
//             p.prevZ = p.prev;
//             p.nextZ = p.next;
//             p = p.next;
//         } while (p !== start);

//         p.prevZ.nextZ = null;
//         p.prevZ = null;

//         this.sortLinked(p);
//     }

//     // Simon Tatham's linked list merge sort algorithm
//     // http://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html
//     sortLinked(list: NodeVector3) {
//         var i, p: NodeVector3, q: NodeVector3, e, tail, numMerges, pSize, qSize,
//             inSize = 1;

//         do {
//             p = list;
//             list = null;
//             tail = null;
//             numMerges = 0;

//             while (p) {
//                 numMerges++;
//                 q = p;
//                 pSize = 0;
//                 for (i = 0; i < inSize; i++) {
//                     pSize++;
//                     q = q.nextZ;
//                     if (!q) break;
//                 }
//                 qSize = inSize;

//                 while (pSize > 0 || (qSize > 0 && q)) {

//                     if (pSize !== 0 && (qSize === 0 || !q || p.zIndex <= q.zIndex)) {
//                         e = p;
//                         p = p.nextZ;
//                         pSize--;
//                     } else {
//                         e = q;
//                         q = q.nextZ;
//                         qSize--;
//                     }

//                     if (tail) tail.nextZ = e;
//                     else list = e;

//                     e.prevZ = tail;
//                     tail = e;
//                 }

//                 p = q;
//             }

//             tail.nextZ = null;
//             inSize *= 2;

//         } while (numMerges > 1);

//         return list;
//     }

//     // z-order of a point given coords and inverse of the longer side of data bbox
//     zOrder(x: number, y: number, minX: number, minY: number, invSize: number) {
//         // coords are transformed into non-negative 15-bit integer range
//         x = (x - minX) * invSize | 0;
//         y = (y - minY) * invSize | 0;

//         x = (x | (x << 8)) & 0x00FF00FF;
//         x = (x | (x << 4)) & 0x0F0F0F0F;
//         x = (x | (x << 2)) & 0x33333333;
//         x = (x | (x << 1)) & 0x55555555;

//         y = (y | (y << 8)) & 0x00FF00FF;
//         y = (y | (y << 4)) & 0x0F0F0F0F;
//         y = (y | (y << 2)) & 0x33333333;
//         y = (y | (y << 1)) & 0x55555555;

//         return x | (y << 1);
//     }

//     // find the leftmost vnode of a polygon ring
//     getLeftmost(start: NodeVector3) {
//         var p: NodeVector3 = start,
//             leftmost: NodeVector3 = start;
//         do {
//             if (p.x < leftmost.x || (p.x === leftmost.x && p.y < leftmost.y)) leftmost = p;
//             p = p.next;
//         } while (p !== start);

//         return leftmost;
//     }

//     // check if a point lies within a convex triangle
//     pointInTriangle(ax: number, ay: number, bx: number, by: number, cx: number, cy: number, px: number, py: number) {
//         return (cx - px) * (ay - py) >= (ax - px) * (cy - py) &&
//             (ax - px) * (by - py) >= (bx - px) * (ay - py) &&
//             (bx - px) * (cy - py) >= (cx - px) * (by - py);
//     }

//     // check if a diagonal between two polygon nodes is valid (lies in polygon interior)
//     isValidDiagonal(a: NodeVector3, b: NodeVector3) {
//         return a.next.vectorIndex !== b.vectorIndex && a.prev.vectorIndex !== b.vectorIndex && !this.intersectsPolygon(a, b) && // dones't intersect other edges
//             (this.locallyInside(a, b) && this.locallyInside(b, a) && this.middleInside(a, b) && // locally visible
//                 (this.area(a.prev, a, b.prev) || this.area(a, b.prev, b)) || // does not create opposite-facing sectors
//                 this.equals(a, b) && this.area(a.prev, a, a.next) > 0 && this.area(b.prev, b, b.next) > 0); // special zero-length case
//     }

//     // signed area of a triangle
//     area(p: NodeVector3, q: NodeVector3, r: NodeVector3) {
//         return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
//     }

//     // check if two points are equal
//     equals(p1: NodeVector3, p2: NodeVector3) {
//         return p1.x === p2.x && p1.y === p2.y;
//     }

//     // check if two segments intersect
//     intersects(p1: NodeVector3, q1: NodeVector3, p2: NodeVector3, q2: NodeVector3) {
//         var o1 = this.sign(this.area(p1, q1, p2));
//         var o2 = this.sign(this.area(p1, q1, q2));
//         var o3 = this.sign(this.area(p2, q2, p1));
//         var o4 = this.sign(this.area(p2, q2, q1));

//         if (o1 !== o2 && o3 !== o4) return true; // general case

//         if (o1 === 0 && this.onSegment(p1, p2, q1)) return true; // p1, q1 and p2 are collinear and p2 lies on p1q1
//         if (o2 === 0 && this.onSegment(p1, q2, q1)) return true; // p1, q1 and q2 are collinear and q2 lies on p1q1
//         if (o3 === 0 && this.onSegment(p2, p1, q2)) return true; // p2, q2 and p1 are collinear and p1 lies on p2q2
//         if (o4 === 0 && this.onSegment(p2, q1, q2)) return true; // p2, q2 and q1 are collinear and q1 lies on p2q2

//         return false;
//     }

//     // for collinear points p, q, r, check if point q lies on segment pr
//     onSegment(p: NodeVector3, q: NodeVector3, r: NodeVector3) {
//         return q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) && q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y);
//     }

//     sign(num: number) {
//         return num > 0 ? 1 : num < 0 ? -1 : 0;
//     }

//     // check if a polygon diagonal intersects any polygon segments
//     intersectsPolygon(a: NodeVector3, b: NodeVector3) {
//         var p = a;
//         do {
//             if (p.vectorIndex !== a.vectorIndex && p.next.vectorIndex !== a.vectorIndex && p.vectorIndex !== b.vectorIndex && p.next.vectorIndex !== b.vectorIndex &&
//                 this.intersects(p, p.next, a, b)) return true;
//             p = p.next;
//         } while (p !== a);

//         return false;
//     }

//     // check if a polygon diagonal is locally inside the polygon
//     locallyInside(a: NodeVector3, b: NodeVector3) {
//         return this.area(a.prev, a, a.next) < 0 ?
//             this.area(a, b, a.next) >= 0 && this.area(a, a.prev, b) >= 0 :
//             this.area(a, b, a.prev) < 0 || this.area(a, a.next, b) < 0;
//     }

//     // check if the middle point of a polygon diagonal is inside the polygon
//     middleInside(a: NodeVector3, b: NodeVector3) {
//         var p = a,
//             inside = false,
//             px = (a.x + b.x) / 2,
//             py = (a.y + b.y) / 2;
//         do {
//             if (((p.y > py) !== (p.next.y > py)) && p.next.y !== p.y &&
//                 (px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x))
//                 inside = !inside;
//             p = p.next;
//         } while (p !== a);

//         return inside;
//     }

//     // link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two;
//     // if one belongs to the outer ring and another to a hole, it merges it into a single ring
//     splitPolygon(a: NodeVector3, b: NodeVector3): NodeVector3 {
//         var a2 = new NodeVector3(a, a.vectorIndex),
//             b2 = new NodeVector3(b, b.vectorIndex),
//             an = a.next,
//             bp = b.prev;

//         a.next = b;
//         b.prev = a;

//         a2.next = an;
//         an.prev = a2;

//         b2.next = a2;
//         a2.prev = b2;

//         bp.next = b2;
//         b2.prev = bp;

//         return b2;
//     }

//     // create a vnode and optionally link it with previous one (in a circular doubly linked list)
//     insertNode(i: number, x: number, y: number, last: NodeVector3) {
//         var p = new NodeVector3(new Vector3(x, y, 0), i);

//         if (!last) {
//             p.prev = p;
//             p.next = p;

//         } else {
//             p.next = last.next;
//             p.prev = last;
//             last.next.prev = p;
//             last.next = p;
//         }
//         return p;
//     }

//     removevNode(p: NodeVector3) {
//         p.next.prev = p.prev;
//         p.prev.next = p.next;

//         if (p.prevZ) p.prevZ.nextZ = p.nextZ;
//         if (p.nextZ) p.nextZ.prevZ = p.prevZ;
//     }



//     // return a percentage difference between the polygon area and its triangulation area;
//     // used to verify correctness of triangulation
//     public static deviation = function (data: Array<number>, holeIndices: Array<number>, dimension: number, triangles: Array<number>) {
//         var hasHoles = holeIndices && holeIndices.length;
//         var outerLen = hasHoles ? holeIndices[0] * dimension : data.length;

//         var polygonArea = Math.abs(this.signedArea(data, 0, outerLen, dimension));
//         if (hasHoles) {
//             for (var i = 0, len = holeIndices.length; i < len; i++) {
//                 var start = holeIndices[i] * dimension;
//                 var end = i < len - 1 ? holeIndices[i + 1] * dimension : data.length;
//                 polygonArea -= Math.abs(this.signedArea(data, start, end, dimension));
//             }
//         }

//         var trianglesArea = 0;
//         for (i = 0; i < triangles.length; i += 3) {
//             var a = triangles[i] * dimension;
//             var b = triangles[i + 1] * dimension;
//             var c = triangles[i + 2] * dimension;
//             trianglesArea += Math.abs(
//                 (data[a] - data[c]) * (data[b + 1] - data[a + 1]) -
//                 (data[a] - data[b]) * (data[c + 1] - data[a + 1]));
//         }

//         return polygonArea === 0 && trianglesArea === 0 ? 0 :
//             Math.abs((trianglesArea - polygonArea) / polygonArea);
//     };

//     signedArea(data: Array<number>, start: number, end: number, dimension: number) {
//         var sum = 0;
//         for (var i = start, j = end - dimension; i < end; i += dimension) {
//             sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
//             j = i;
//         }
//         return sum;
//     }

//     // turn a polygon in a multi-dimensional array form (e.g. as in GeoJSON) into a form Earcut accepts
//     public static flatten(data: Array<Array<Array<number>>>) {
//         var dim = data[0][0].length,
//             result: { vertices: Array<number>, holes: Array<number>, dimensions: number } =
//                 { vertices: [], holes: [], dimensions: dim },
//             holeIndex = 0;

//         for (var i = 0; i < data.length; i++) {
//             for (var j = 0; j < data[i].length; j++) {
//                 for (var d = 0; d < dim; d++) result.vertices.push(data[i][j][d]);
//             }
//             if (i > 0) {
//                 holeIndex += data[i - 1].length;
//                 result.holes.push(holeIndex);
//             }
//         }
//         return result;
//     };

// }


