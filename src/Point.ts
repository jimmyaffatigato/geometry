import Angle from "./Angle";
import Geometry, { RESOLUTION } from "./Geometry";
import Line from "./Line";
import { randomInt, randomNumber } from "./util";
import Vector from "./Vector";

export interface PointProps {
    x: number;
    y: number;
}

/**
 * The Point class contains x and y properties and various helper function for working with points.
 */
class Point extends Geometry<Point> {
    readonly x: number;
    readonly y: number;

    translate(x: number, y: number): Point;
    translate(distance: Point): Point;
    translate(a: Point | number, b?: number): Point {
        const distance = new Point(a, b);
        return new Point(this.x + distance.x, this.y + distance.y);
    }

    moveTowards(point: Point, distance: number): Point {
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
    multiply(factor: Point): Point;
    multiply(factor: Point | number): Point;
    multiply(a: Point | number): Point {
        let fX = 0;
        let fY = 0;
        if (typeof a == "number") {
            fX = this.x * a;
            fY = this.y * a;
        } else if (a instanceof Point) {
            fX = this.x * a.x;
            fY = this.y * a.y;
        }
        return new Point(fX, fY);
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
        let radians = Math.atan2(target.y - this.y, target.x - this.x);
        if (radians < 0) radians = Math.PI * 2 + radians;
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
        if (typeof a == "number") {
            return this.translate(origin.reflect()).toVector().rotate(a).toPoint().translate(origin);
        } else {
            return this.translate(origin.reflect()).toVector().rotate(a.radians).toPoint().translate(origin);
        }
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
     * Creates a new Point with the given position
     */
    constructor(x: number, y: number);
    constructor(xy: [number, number]);
    constructor(point: Point);
    constructor(a: number | Point | [number, number] | PointProps, b?: number);
    constructor(a: number | Point | [number, number] | PointProps, b?: number) {
        super("point");
        let x = undefined;
        let y = undefined;
        if (typeof a == "number" && typeof b == "number") {
            x = a;
            y = b;
        } else if (a instanceof Point) {
            x = a.x;
            y = a.y;
        } else if (Array.isArray(a) && a.length == 2) {
            x = a[0];
            y = a[1];
        } else if (typeof a == "object" && !Array.isArray(a) && a.hasOwnProperty("x") && a.hasOwnProperty("y")) {
            x = a.x;
            x = a.y;
        }
        this.x = Math.round(x * RESOLUTION) / RESOLUTION;
        this.y = Math.round(y * RESOLUTION) / RESOLUTION;
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

    static fromObject(obj: PointProps): Point {
        return new Point(obj.x, obj.y);
    }

    static random(max: number = 1, min: number = 0): Point {
        const x = randomNumber(max, min);
        const y = randomNumber(max, min);
        return new Point(x, y);
    }
}

export default Point;
