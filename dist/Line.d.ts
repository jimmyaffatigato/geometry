import { Geometry, Position, Size, Angle } from "./Geometry.js";
import Point from "./Point.js";
import Rectangle from "./Rectangle.js";
import Vector from "./Vector.js";
declare class Line implements Geometry<Line>, Position<Line>, Angle<Line>, Size {
    readonly type = "line";
    readonly origin: Point;
    readonly end: Point;
    get size(): Point;
    get position(): Point;
    get width(): number;
    get height(): number;
    get area(): number;
    get length(): number;
    get angle(): number;
    constructor(origin: Point, end: Point);
    clone(): Line;
    reverse(): Line;
    translate(point: Point): Line;
    setPosition(position: Point): Line;
    rotate(angle: number): Line;
    rotateByDegree(degree: number): Line;
    setAngle(angle: number): Line;
    toString(): string;
    toVector(): Vector;
    toRectanlge(): Rectangle;
}
export default Line;
