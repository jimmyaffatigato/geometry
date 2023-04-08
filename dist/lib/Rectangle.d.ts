import Geometry from "./Geometry";
import Point, { PointProps } from "./Point";
export interface RectangleProps {
    position: PointProps;
    size: PointProps;
}
/**
 * An instance of `Rectangle` contains `position` and `size` properties as well as various methods for working with rectangles.
 */
declare class Rectangle extends Geometry<Rectangle, RectangleProps> {
    readonly position: Point;
    readonly size: Point;
    /**
     * X coordinate of top left corner
     */
    get x(): number;
    /**
     * Y coordinate of top left corner
     */
    get y(): number;
    get width(): number;
    get height(): number;
    get area(): number;
    get perimeter(): number;
    get left(): number;
    get right(): number;
    get top(): number;
    get bottom(): number;
    setPosition(position: Point): Rectangle;
    setSize(size: Point): Rectangle;
    translate(point: Point): Rectangle;
    scale(factor: Point | number): Rectangle;
    expand(amount: Point): Rectangle;
    contains(point: Point): boolean;
    reflect(): Rectangle;
    reflectX(): Rectangle;
    reflectY(): Rectangle;
    intersects(rectangle: Rectangle): boolean;
    floor(): Rectangle;
    toArray(): [number, number, number, number];
    clone(): Rectangle;
    match(rectangle: Rectangle): boolean;
    toObject(): RectangleProps;
    /**
     * `[x, y, w, h]`
     */
    toString(digits?: number): string;
    constructor(x: number, y: number, width: number, height: number);
    constructor(position: Point, size: Point);
    constructor(xywh: [number, number, number, number]);
    constructor(props: RectangleProps);
    static random(): Rectangle;
    static isProps(obj: any): obj is RectangleProps;
}
export default Rectangle;
