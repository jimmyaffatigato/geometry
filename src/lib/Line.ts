import Angle from "./Angle";
import Circle from "./Circle";
import Geometry from "./Geometry";
import Point, { PointProps } from "./Point";
import Rectangle from "./Rectangle";
import Triangle from "./Triangle";
import Vector from "./Vector";

export interface LineProps {
    origin: PointProps;
    end: PointProps;
}

class Line extends Geometry<Line, LineProps> {
    readonly origin: Point;
    readonly end: Point;

    get length(): number {
        return this.origin.distance(this.end);
    }

    get angle(): Angle {
        return this.origin.direction(this.end);
    }

    get midpoint(): Point {
        return this.pointAt(0.5);
    }

    pointAt(pct: number): Point {
        return this.toVector()
            .setMagnitude(this.length * pct)
            .toLine(this.origin).end;
    }

    reverse(): Line {
        return new Line(this.end, this.origin);
    }

    translate(point: Point): Line;
    translate(x: number, y: number): Line;
    translate(a: Point | number, b?: number): Line {
        if (a instanceof Point) {
            return new Line(this.origin.translate(a), this.end.translate(a));
        } else if (typeof a == "number" && typeof b == "number") {
            return new Line(this.origin.translate(a, b), this.end.translate(a, b));
        }
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

    toCircle(): Circle {
        return new Circle(this.origin, this.length);
    }

    toTriangle(c: Point): Triangle {
        return new Triangle(this.origin, this.end, c);
    }

    clone(): Line {
        return new Line(this);
    }

    match(line: Line, tolerance: number = 0): boolean {
        return line.origin.match(this.origin, tolerance) && line.end.match(this.end, tolerance);
    }

    floor(): Line {
        return new Line(this.origin.floor(), this.end.floor());
    }

    toObject(): LineProps {
        return { origin: this.origin.toObject(), end: this.end.toObject() };
    }

    toString() {
        return `${this.origin.toString()} => ${this.end.toString()}`;
    }

    constructor(origin: Point, end: Point);
    constructor(props: LineProps);
    constructor(a: Point | LineProps, b?: Point) {
        super("line");
        if (a instanceof Point && b instanceof Point) {
            this.origin = a;
            this.end = b;
        } else if (Line.isProps(a)) {
            this.origin = new Point(a.origin);
            this.end = new Point(a.end);
        }
    }

    static fromObject(obj: LineProps): Line {
        return new Line(new Point(obj.origin), new Point(obj.end));
    }

    static random(): Line {
        return new Line(Point.random(), Point.random());
    }

    static isProps(obj: any): obj is LineProps {
        return (
            typeof obj == "object" &&
            obj.hasOwnProperty("origin") &&
            Point.isProps(obj.origin) &&
            obj.hasOwnProperty("end") &&
            Point.isProps(obj.end)
        );
    }
}

export default Line;
