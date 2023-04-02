import Angle from "./Angle";
import Geometry, { PRECISION } from "./Geometry";
import { random, roundToPrecision } from "./util";
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
        return new Vector(point.direction(this), point.distance(this) - distance).toLine(point).end;
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
        const difference = target.difference(this);
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

    match(point: Point): boolean {
        return this.x == point.x && this.y == point.y;
    }

    /**
     * Returns a new Point instance with the same properties
     */
    clone(): Point {
        return new Point(this.x, this.y);
    }

    toArray(): [number, number] {
        return [this.x, this.y];
    }

    toVector(): Vector {
        return new Vector(Point.zero.direction(this), Point.zero.distance(this));
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
        this.x = roundToPrecision(x, PRECISION);
        this.y = roundToPrecision(y, PRECISION);
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

    static random(max: number = 1, min: number = 0): Point {
        const x = random(max, min);
        const y = random(max, min);
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
