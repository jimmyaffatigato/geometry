import Angle from "./Angle";
import { Geometry, Position } from "./Geometry";
import Scalar from "./Scalar";
import Vector from "./Vector";

// TODO: Accept Scalar parameters anywhere numbers are used
class Point implements Geometry<Point>, Position {
    private _x: Scalar;
    private _y: Scalar;

    public get x(): number {
        return this._x.value;
    }
    public get y(): number {
        return this._y.value;
    }

    public get position(): Point {
        return this.clone();
    }

    // Transformations

    public setPosition(point: Point): Point;
    public setPosition(x: number, y: number): Point;
    public setPosition(a: Point | number, b?: number): Point {
        let x = 0;
        let y = 0;
        if (typeof a == "number" && typeof b == "number") {
            x = a;
            y = b;
        } else if (a instanceof Point) {
            x = a.x;
            y = a.y;
        }
        return new Point(x, y);
    }

    public translateX(distance: number): Point {
        return new Point(this.x + distance, this.y);
    }

    public translateY(distance: number): Point {
        return new Point(this.x, this.y + distance);
    }

    public translate(distance: Point): Point {
        return new Point(this.x + distance.x, this.y + distance.y);
    }

    public scale(factor: number): Point;
    public scale(point: Point): Point;
    public scale(factor: Point | number): Point;
    public scale(a: Point | number): Point {
        if (typeof a == "number") {
            return new Point(this.x * a, this.y * a);
        } else if (a instanceof Point) {
            return new Point(this.x * a.x, this.y * a.y);
        }
    }

    public floor(): Point {
        return new Point(Math.floor(this.x), Math.floor(this.y));
    }

    public absolute(): Point {
        return new Point(Math.abs(this.x), Math.abs(this.y));
    }

    // Operations

    public difference(target: Point): Point {
        return new Point(target.x - this.x, target.y - this.y);
    }

    public distance(target: Point): number {
        const { x, y } = this.difference(target);
        return Math.sqrt(x ** 2 + y ** 2);
    }

    public direction(target: Point): Angle {
        return new Angle(Math.atan2(target.y - this.y, target.x - this.x));
    }

    public reflect(): Point {
        return new Point(-this.x, -this.y);
    }

    public reflectX(): Point {
        return new Point(-this.x, this.y);
    }

    public reflectY(): Point {
        return new Point(this.x, -this.y);
    }

    public isWithin(center: Point, range: number): boolean {
        const distance = this.distance(center);
        return distance <= range;
    }

    public rotate(radians: number): Point {
        return this.toVector().rotate(radians).toPoint();
    }

    // Formats

    public toArray(): [number, number] {
        return [this.x, this.y];
    }

    public toVector(): Vector {
        return new Vector(Point.zero.direction(this), Point.zero.distance(this));
    }

    // Geometry
    public readonly type = "point";

    public clone(): Point {
        return new Point(this.x, this.y);
    }

    public match(point: Point): boolean {
        return this.x == point.x && this.y == point.y;
    }

    public toString(digits: number = 2): string {
        return `[${this.x.toFixed(digits)}, ${this.y.toFixed(digits)}]`;
    }

    /**
     * Creates a new Point with the given position
     */
    constructor(x: number, y: number);
    constructor(x: Scalar, y: Scalar);
    constructor(xy: [number, number]);
    constructor(point: Point);
    constructor(a: number | Scalar | Point | [number, number], b?: number | Scalar) {
        let x = 0;
        let y = 0;
        if (typeof a == "number" && typeof b == "number") {
            x = a;
            y = b;
        } else if (a instanceof Point) {
            x = a.x;
            y = a.y;
        } else if (Array.isArray(a)) {
            x = a[0];
            y = a[1];
        } else if (a instanceof Scalar && b instanceof Scalar) {
            x = a.value;
            y = b.value;
        }
        this._x = new Scalar(x);
        this._y = new Scalar(y);
    }

    // Static

    /**
     * `[0, 0]`
     */
    public static get zero(): Point {
        return new Point(0, 0);
    }

    /**
     * `[1, 1]`
     */
    public static get one(): Point {
        return new Point(1, 1);
    }

    public static random(): Point {
        return new Point(Math.random(), Math.random());
    }
}

export default Point;
