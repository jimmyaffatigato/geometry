import { Geometry, Position } from "./Geometry.js";
import Vector from "./Vector.js";

class Point implements Geometry<Point>, Position {
    public readonly type = "point";
    public readonly x: number;
    public readonly y: number;

    public get position(): Point {
        return this.clone();
    }

    /**
     * Creates a new Point with the given position
     */
    constructor(x: number, y: number = x) {
        this.x = x;
        this.y = y;
    }

    /**
     * `[0, 0]`
     */
    public static get zero(): Point {
        return new Point(0);
    }

    /**
     * `[1, 1]`
     */
    public static get one(): Point {
        return new Point(1);
    }

    public match(point: Point): boolean {
        return this.x == point.x && this.y == point.y;
    }

    public setPosition(position: Point) {
        return new Point(position.x, position.y);
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

    public difference(target: Point): Point {
        return new Point(target.x - this.x, target.y - this.y);
    }

    public distance(target: Point): number {
        const { x, y } = this.difference(target);
        return Math.sqrt(x ** 2 + y ** 2);
    }

    public floor(): Point {
        return new Point(Math.floor(this.x), Math.floor(this.y));
    }

    public direction(target: Point): number {
        return Math.atan2(target.y - this.y, target.x - this.x);
    }

    public absolute(): Point {
        return new Point(Math.abs(this.x), Math.abs(this.y));
    }

    public scale(factor: Point | number): Point {
        if (typeof factor == "number") {
            return new Point(this.x * factor, this.y * factor);
        }
        return new Point(this.x * factor.x, this.y * factor.y);
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

    public xZero(): Point {
        return new Point(this.x, 0);
    }

    public zeroY(): Point {
        return new Point(0, this.y);
    }

    public isWithin(center: Point, range: number): boolean {
        const distance = this.distance(center);
        return distance <= range;
    }

    public clone(): Point {
        return new Point(this.x, this.y);
    }

    public toString(digits: number = 2): string {
        return `[${this.x.toFixed(digits)}, ${this.y.toFixed(digits)}]`;
    }

    public toArray(): [number, number] {
        return [this.x, this.y];
    }

    public toVector(): Vector {
        return new Vector(Point.zero.direction(this), Point.zero.distance(this));
    }
}

export default Point;
