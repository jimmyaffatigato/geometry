import Angle from "./Angle";
import Geometry from "./Geometry";
import Line from "./Line";
import Point, { PointProps } from "./Point";
export interface TriangleProps {
    a: PointProps;
    b: PointProps;
    c: PointProps;
}
/**
 * An instance of `Triangle` contains Points `a`, `b`, and `c` as well as various methods for working with triangles.
 */
declare class Triangle extends Geometry<Triangle, TriangleProps> {
    readonly a: Point;
    readonly b: Point;
    readonly c: Point;
    get angleA(): Angle;
    get angleB(): Angle;
    get angleC(): Angle;
    get ab(): Line;
    get ac(): Line;
    get bc(): Line;
    get center(): Point;
    get area(): number;
    translate(a: Point): Triangle;
    translate(a: number, b: number): Triangle;
    translate(a: Point | number, b?: number): Triangle;
    rotate(radians: number, around?: Point): Triangle;
    clone(): Triangle;
    match(triangle: Triangle, tolerance?: number): boolean;
    toObject(): TriangleProps;
    toString(): string;
    constructor(a: Point, b: Point, c: Point);
    constructor(a: PointProps, b: PointProps, c: PointProps);
    constructor(a: [number, number], b: [number, number], c: [number, number]);
    constructor(props: TriangleProps);
    static random(max?: Point, min?: Point): Triangle;
    static isProps(obj: any): obj is TriangleProps;
}
export default Triangle;
