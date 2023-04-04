import Angle from "./Angle";
import Geometry from "./Geometry";
import Vector from "./Vector";
export interface PointProps {
    x: number;
    y: number;
}
/**
 * An instance of `Point` contains `x` and `y` properties.
 * `Point` provides various methods for working with points.
 */
declare class Point extends Geometry<Point, PointProps> {
    readonly x: number;
    readonly y: number;
    translate(x: number, y: number): Point;
    translate(distance: Point): Point;
    moveTowards(point: Point, distance: number): Point;
    moveTowards(x: number, y: number, distance: number): Point;
    distance(target: Point): number;
    distance(x: number, y: number): number;
    multiply(factor: number): Point;
    multiply(factors: Point): Point;
    multiply(x: number, y: number): Point;
    multiply(xy: [number, number]): Point;
    multiply(a: Point | number | [number, number], b?: number): Point;
    difference(target: Point): Point;
    difference(x: number, y: number): Point;
    direction(target: Point): Angle;
    direction(x: number, y: number): Angle;
    floor(): Point;
    absolute(): Point;
    reverse(): Point;
    reflect(): Point;
    reflectX(): Point;
    reflectY(): Point;
    rotate(radians: number, origin?: Point): Point;
    rotate(angle: Angle, origin?: Point): Point;
    match(point: Point): boolean;
    /**
     * Returns a new Point instance with the same properties
     */
    clone(): Point;
    toArray(): [number, number];
    toVector(): Vector;
    toObject(): PointProps;
    toString(digits?: number): string;
    /**
     * Creates a new Point with coordinates `x` and `y`.
     * If `y` is undefined, it will be set to the same value as `x`.
     */
    constructor(x: number, y?: number);
    constructor(xy: [number, number]);
    constructor(point: Point);
    constructor(props: PointProps);
    constructor(a: number | Point | [number, number] | PointProps, b?: number);
    /**
     * `[0, 0]`
     */
    static get zero(): Point;
    /**
     * `[1, 1]`
     */
    static get one(): Point;
    static get infinity(): Point;
    static random(max?: Point, min?: Point): Point;
    static isProps(obj: any): obj is PointProps;
}
export default Point;
