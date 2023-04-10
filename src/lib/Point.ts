import Angle from "./Angle";
import Circle from "./Circle";
import Geometry from "./Geometry";
import Line from "./Line";
import Rectangle from "./Rectangle";
import { matchNumber, random, roundOffZeroes } from "./util";
import Vector from "./Vector";

export interface PointProps {
    x: number;
    y: number;
}

/**
 * An instance of `Point` contains `x` and `y` properties.
 * `Point` provides various methods for working with points.
 */
class Point extends Geometry<Point, PointProps> {
    readonly x: number;
    readonly y: number;

    get [0](): number {
        return this.x;
    }
    get [1](): number {
        return this.y;
    }

    translate(x: number, y: number): Point;
    translate(distance: Point): Point;
    translate(a: Point | number, b?: number): Point {
        const distance = new Point(a, b);
        return new Point(this.x + distance.x, this.y + distance.y);
    }

    moveTowards(point: Point, distance: number): Point;
    moveTowards(x: number, y: number, distance: number): Point;
    moveTowards(a: Point | number, b: number, c?: number): Point {
        let point: Point;
        let distance: number;
        if (a instanceof Point && typeof b == "number") {
            point = a;
            distance = b;
        } else if (typeof a == "number" && typeof b == "number" && typeof c == "number") {
            point = new Point(a, b);
            distance = c;
        }
        const p = new Vector(this.direction(point), distance).toLine(this).end;
        return p;
    }

    distance(target: Point): number;
    distance(x: number, y: number): number;
    distance(a: Point | number, b?: number): number {
        const target = new Point(a, b);
        const { x, y } = this.difference(target.x, target.y);
        return Math.sqrt(x ** 2 + y ** 2);
    }

    multiply(factor: number): Point;
    multiply(factors: Point): Point;
    multiply(x: number, y: number): Point;
    multiply(xy: [number, number]): Point;
    multiply(a: Point | number | [number, number], b?: number): Point;
    multiply(a: Point | number | [number, number], b?: number): Point {
        const point = new Point(a, b);
        return new Point(this.x * point.x, this.y * point.y);
    }

    difference(target: Point): Point;
    difference(x: number, y: number): Point;
    difference(a: Point | number, b?: number): Point {
        const target = new Point(a, b);
        return new Point(target.x - this.x, target.y - this.y);
    }

    direction(target: Point): Angle;
    direction(x: number, y: number): Angle;
    direction(a: Point | number, b?: number): Angle {
        const target = new Point(a, b);
        const difference = this.difference(target);
        let radians = Math.atan2(difference.y, difference.x);
        return new Angle(radians);
    }

    floor(): Point {
        return new Point(Math.floor(this.x), Math.floor(this.y));
    }

    absolute(): Point {
        return new Point(Math.abs(this.x), Math.abs(this.y));
    }

    reverse(): Point {
        return new Point(this.y, this.x);
    }

    reflect(): Point {
        return new Point(-this.x, -this.y);
    }

    reflectX(): Point {
        return new Point(-this.x, this.y);
    }

    reflectY(): Point {
        return new Point(this.x, -this.y);
    }

    rotate(radians: number, origin?: Point): Point;
    rotate(angle: Angle, origin?: Point): Point;
    rotate(a: number | Angle, origin: Point = Point.zero): Point {
        return this.translate(origin.reflect()).toVector().rotate(a).toPoint().translate(origin);
    }

    match(point: Point, tolerance: number = 0): boolean {
        return matchNumber(this.x, point.x, tolerance) && matchNumber(this.y, point.y, tolerance);
    }

    /**
     * Returns a new Point instance with the same properties
     */
    clone(): Point {
        return new Point(this);
    }

    toArray(): [number, number] {
        return [this.x, this.y];
    }

    toVector(): Vector {
        return new Vector(Point.zero.direction(this), Point.zero.distance(this));
    }

    toLine(end: Point): Line {
        return new Line(this, end);
    }

    toRectangle(size: Point): Rectangle {
        return new Rectangle(this, size);
    }

    toCircle(radius: number): Circle {
        return new Circle(this, radius);
    }

    toObject(): PointProps {
        return { x: this.x, y: this.y };
    }

    toString(digits: number = 2): string {
        return `[${this.x.toFixed(digits)}, ${this.y.toFixed(digits)}]`;
    }

    /**
     * Creates a new Point with coordinates `x` and `y`.
     * If `y` is undefined, it will be set to the same value as `x`.
     */
    constructor(x: number, y?: number);
    constructor(xy: [number, number]);
    constructor(point: Point);
    constructor(props: PointProps);
    constructor(a: number | Point | [number, number] | PointProps, b?: number);
    constructor(a: number | Point | [number, number] | PointProps, b?: number) {
        super("point");
        let x = undefined;
        let y = undefined;
        if (typeof a == "number" && typeof b == "number") {
            // number, number
            x = a;
            y = b;
        } else if (typeof a == "number" && typeof b == "undefined") {
            // number
            x = a;
            y = a;
        } else if (Array.isArray(a) && a.length == 2) {
            // [number, number]
            x = a[0];
            y = a[1];
        } else if (a instanceof Point) {
            // Point
            x = a.x;
            y = a.y;
        } else if (Point.isProps(a)) {
            // PointProps
            x = a.x;
            x = a.y;
        }
        this.x = roundOffZeroes(x);
        this.y = roundOffZeroes(y);
    }

    /**
     * `[0, 0]`
     */
    static get zero(): Point {
        return new Point(0, 0);
    }

    /**
     * `[1, 1]`
     */
    static get one(): Point {
        return new Point(1, 1);
    }

    static get infinity(): Point {
        return new Point(Infinity, Infinity);
    }

    static random(max: Point = Point.one, min: Point = Point.zero): Point {
        const x = random(max.x, min.x);
        const y = random(max.y, min.y);
        return new Point(x, y);
    }

    static isProps(obj: any): obj is PointProps {
        return (
            typeof obj == "object" &&
            !Array.isArray(obj) &&
            obj.hasOwnProperty("x") &&
            typeof obj.x == "number" &&
            obj.hasOwnProperty("y") &&
            typeof obj.y == "number"
        );
    }
}

export default Point;
