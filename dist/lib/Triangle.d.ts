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
    clone(): Triangle;
    match(triangle: Triangle): boolean;
    toObject(): TriangleProps;
    toString(): string;
    constructor(a: Point, b: Point, c: Point);
    constructor(props: TriangleProps);
    static random(): Triangle;
    static isProps(obj: any): obj is TriangleProps;
}
export default Triangle;