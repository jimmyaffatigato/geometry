import Angle from "./Angle";
import Circle from "./Circle";
import Geometry from "./Geometry";
import Point, { PointProps } from "./Point";
import Rectangle from "./Rectangle";
import Triangle from "./Triangle";
import Vector from "./Vector";
export interface LineProps {
    origin: PointProps;
    end: PointProps;
}
declare class Line extends Geometry<Line, LineProps> {
    readonly origin: Point;
    readonly end: Point;
    get length(): number;
    get angle(): Angle;
    get midpoint(): Point;
    pointAt(pct: number): Point;
    reverse(): Line;
    translate(point: Point): Line;
    translate(x: number, y: number): Line;
    rotate(radians: number): Line;
    rotateByDegree(degree: number): Line;
    setAngle(angle: Angle): Line;
    toVector(): Vector;
    toRectangle(): Rectangle;
    toCircle(): Circle;
    toTriangle(c: Point): Triangle;
    clone(): Line;
    match(line: Line, tolerance?: number): boolean;
    floor(): Line;
    toObject(): LineProps;
    toString(): string;
    constructor(origin: Point, end: Point);
    constructor(props: LineProps);
    static fromObject(obj: LineProps): Line;
    static random(): Line;
    static isProps(obj: any): obj is LineProps;
}
export default Line;
