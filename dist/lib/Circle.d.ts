import Angle from "./Angle";
import Arc from "./Arc";
import Geometry from "./Geometry";
import Point, { PointProps } from "./Point";
import Rectangle from "./Rectangle";
export interface CircleProps {
    origin: PointProps;
    radius: number;
}
declare class Circle extends Geometry<Circle, CircleProps> {
    readonly origin: Point;
    readonly radius: number;
    get diameter(): number;
    get area(): number;
    get circumference(): number;
    get bounds(): Rectangle;
    get center(): Point;
    pointAt(a: number | Angle): Point;
    setPosition(position: Point): Circle;
    translate(point: Point): Circle;
    contains(point: Point): boolean;
    overlaps(circle: Circle): boolean;
    clone(): Circle;
    match(circle: Circle, tolerance?: number): boolean;
    toArc(): Arc;
    toObject(): CircleProps;
    toString(digits?: number): string;
    constructor(position: Point, radius: number);
    constructor(props: CircleProps);
    static isProps(obj: any): obj is CircleProps;
}
export default Circle;
