import Angle from "./Angle";
import Geometry from "./Geometry";
import Point, { PointProps } from "./Point";
import Rectangle from "./Rectangle";
import Vector from "./Vector";

export interface LineProps {
    type: "line";
    origin: PointProps;
    end: PointProps;
}

class Line extends Geometry<Line> {
    readonly origin: Point;
    readonly end: Point;

    get length(): number {
        return this.origin.distance(this.end);
    }

    get angle(): Angle {
        return this.origin.direction(this.end);
    }

    reverse(): Line {
        return new Line(this.end, this.origin);
    }

    translate(point: Point): Line {
        return new Line(this.origin.translate(point), this.end.translate(point));
    }

    rotate(radians: number): Line {
        return this.toVector().rotate(radians).toLine(this.origin);
    }

    rotateByDegree(degree: number): Line {
        return this.rotate((Math.PI / 180) * degree);
    }

    setAngle(angle: Angle): Line {
        return this.toVector().setDirection(angle).toLine(this.origin);
    }

    toVector(): Vector {
        return new Vector(this.angle, this.length);
    }

    toRectangle(): Rectangle {
        return new Rectangle(this.origin, this.end.difference(this.origin));
    }

    clone(): Line {
        return new Line(this.origin, this.end);
    }

    match(line: Line): boolean {
        return line.origin.match(this.origin) && line.end.match(this.end);
    }

    floor(): Line {
        return new Line(this.origin.floor(), this.end.floor());
    }

    toObject(): LineProps {
        return { type: "line", origin: this.origin.toObject(), end: this.end.toObject() };
    }

    toString() {
        return `${this.origin.toString()} => ${this.end.toString()}`;
    }

    constructor(origin: Point, end: Point) {
        super("line");
        this.origin = origin;
        this.end = end;
    }

    static fromObject(obj: LineProps): Line {
        return new Line(Point.fromObject(obj.origin), Point.fromObject(obj.end));
    }

    static random(): Line {
        return new Line(Point.random(), Point.random());
    }
}

export default Line;
