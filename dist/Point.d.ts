import { Geometry, Position } from "./Geometry.js";
import Vector from "./Vector.js";
declare class Point implements Geometry<Point>, Position {
    readonly type = "point";
    readonly x: number;
    readonly y: number;
    get position(): Point;
    /**
     * Creates a new Point with the given position
     */
    constructor(x: number, y?: number);
    /**
     * `[0, 0]`
     */
    static get zero(): Point;
    /**
     * `[1, 1]`
     */
    static get one(): Point;
    match(point: Point): boolean;
    setPosition(position: Point): Point;
    translateX(distance: number): Point;
    translateY(distance: number): Point;
    translate(distance: Point): Point;
    difference(target: Point): Point;
    distance(target: Point): number;
    floor(): Point;
    direction(target: Point): number;
    absolute(): Point;
    scale(factor: Point | number): Point;
    reflect(): Point;
    reflectX(): Point;
    reflectY(): Point;
    xZero(): Point;
    zeroY(): Point;
    isWithin(center: Point, range: number): boolean;
    clone(): Point;
    toString(digits?: number): string;
    toArray(): [number, number];
    toVector(): Vector;
}
export default Point;
