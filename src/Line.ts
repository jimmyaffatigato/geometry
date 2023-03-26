import Angle from "./Angle";
import { Geometry } from "./Geometry";
import Point from "./Point";
import Rectangle from "./Rectangle";
import Vector from "./Vector";

class Line implements Geometry<Line> {
    public readonly origin: Point;
    public readonly end: Point;

    public get length(): number {
        return this.origin.distance(this.end);
    }

    public get angle(): Angle {
        return this.origin.direction(this.end);
    }

    public reverse(): Line {
        return new Line(this.end, this.origin);
    }

    // Transformations

    public translate(point: Point): Line {
        return new Line(this.origin.translate(point), this.end.translate(point));
    }

    public rotate(radians: number): Line {
        return this.toVector().rotate(radians).toLine(this.origin);
    }

    public rotateByDegree(degree: number): Line {
        return this.rotate((Math.PI / 180) * degree);
    }

    public setAngle(angle: Angle): Line {
        return this.toVector().setAngle(angle).toLine(this.origin);
    }

    // Format

    public toVector(): Vector {
        return new Vector(this.angle, this.length);
    }

    public toRectangle(): Rectangle {
        return new Rectangle(this.origin, this.end);
    }

    // Geometry

    public readonly type = "line";

    public clone(): Line {
        return new Line(this.origin, this.end);
    }

    public match(line: Line): boolean {
        return line.origin.match(this.origin) && line.end.match(this.end);
    }

    public floor(): Line {
        return new Line(this.origin.floor(), this.end.floor());
    }

    public toString() {
        return `${this.origin.toString()} => ${this.end.toString()}`;
    }

    constructor(origin: Point, end: Point) {
        this.origin = origin;
        this.end = end;
    }

    public static random(): Line {
        return new Line(Point.random(), Point.random());
    }
}

export default Line;
