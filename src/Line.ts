import { Geometry, Position, Size, Angle } from "./Geometry.js";
import Point from "./Point.js";
import Rectangle from "./Rectangle.js";
import Vector from "./Vector.js";

class Line implements Geometry<Line>, Position<Line>, Angle<Line>, Size {
    public readonly type = "line";
    public readonly origin: Point;
    public readonly end: Point;

    public get size(): Point {
        return new Point(this.width, this.height);
    }

    public get position(): Point {
        return this.origin;
    }

    public get width(): number {
        return this.end.x - this.origin.x;
    }

    public get height(): number {
        return this.end.y - this.origin.y;
    }

    public get area(): number {
        return this.width * this.height;
    }

    public get length(): number {
        return Math.sqrt(this.width ** 2 + this.height ** 2);
    }

    public get angle(): number {
        return this.origin.direction(this.end);
    }

    constructor(origin: Point, end: Point) {
        this.origin = origin;
        this.end = end;
    }

    public clone(): Line {
        return new Line(this.origin, this.end);
    }

    public reverse(): Line {
        return new Line(this.end, this.origin);
    }

    public translate(point: Point): Line {
        return new Line(this.origin.translate(point), this.end.translate(point));
    }

    public setPosition(position: Point): Line {
        return new Line(this.origin, this.end).translate(this.position.difference(position));
    }

    public rotate(angle: number): Line {
        return new Vector(this.angle + angle, this.length).toLine(this.origin);
    }

    public rotateByDegree(degree: number): Line {
        return this.rotate((Math.PI / 180) * degree);
    }

    public setAngle(angle: number): Line {
        return new Vector(angle, this.length).toLine(this.origin);
    }

    public toString() {
        return `${this.origin.toString()} => ${this.end.toString()}`;
    }

    public toVector(): Vector {
        return new Vector(this.angle, this.length);
    }

    public toRectanlge(): Rectangle {
        return new Rectangle(this.origin, this.end);
    }
}

export default Line;
