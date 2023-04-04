import Angle from "./Angle";
import Geometry from "./Geometry";
import Line from "./Line";
import Point, { PointProps } from "./Point";
import { roundOffZeroes } from "./util";

export interface TriangleProps {
    a: PointProps;
    b: PointProps;
    c: PointProps;
}

/**
 * An instance of `Triangle` contains Points `a`, `b`, and `c` as well as various methods for working with triangles.
 */
class Triangle extends Geometry<Triangle, TriangleProps> {
    readonly a: Point;
    readonly b: Point;
    readonly c: Point;

    get angleA(): Angle {
        const ab = this.ab.angle;
        const ac = this.ac.angle;
        const max = ab.radians > ac.radians ? ab : ac;
        const min = max === ab ? ac : ab;
        let angle = new Angle(max.radians - min.radians).absolute();
        if (angle.radians > Math.PI) angle = new Angle(Math.PI * 2 - angle.radians);
        return angle;
    }

    get angleB(): Angle {
        const bc = this.bc.angle;
        const ba = this.ab.reverse().angle;
        const max = bc.radians > ba.radians ? bc : ba;
        const min = max === bc ? ba : bc;
        let angle = new Angle(max.radians - min.radians).absolute();
        if (angle.radians > Math.PI) angle = new Angle(Math.PI * 2 - angle.radians);
        return angle;
    }

    get angleC(): Angle {
        const ca = this.ac.reverse().angle;
        const cb = this.bc.reverse().angle;
        const max = cb.radians > ca.radians ? cb : ca;
        const min = max === cb ? ca : cb;
        let angle = new Angle(max.radians - min.radians).absolute();
        if (angle.radians > Math.PI) angle = new Angle(Math.PI * 2 - angle.radians);
        return angle;
    }

    get ab(): Line {
        return new Line(this.a, this.b);
    }

    get ac(): Line {
        return new Line(this.a, this.c);
    }

    get bc(): Line {
        return new Line(this.b, this.c);
    }

    get center(): Point {
        return new Point((this.a.x + this.b.x + this.c.x) / 3, (this.a.y + this.b.y + this.c.y) / 3);
    }

    get area(): number {
        const { ab, ac, bc } = this;
        return roundOffZeroes(
            0.25 *
                Math.sqrt(ab.length + bc.length + ac.length) *
                Math.sqrt(-ab.length + bc.length + ac.length) *
                Math.sqrt(ab.length - bc.length + ac.length) *
                Math.sqrt(ab.length + bc.length - ac.length)
        );
    }

    clone(): Triangle {
        return new Triangle(this.a, this.b, this.c);
    }

    match(triangle: Triangle): boolean {
        const { a: a1, b: b1, c: c1 } = this;
        const { a: a2, b: b2, c: c2 } = triangle;
        return a1.match(a2) && b1.match(b2) && c1.match(c2);
    }

    toObject(): TriangleProps {
        return { a: this.a.toObject(), b: this.b.toObject(), c: this.c.toObject() };
    }

    toString(): string {
        return "";
    }

    constructor(a: Point, b: Point, c: Point);
    constructor(a: PointProps, b: PointProps, c: PointProps);
    constructor(a: [number, number], b: [number, number], c: [number, number]);
    constructor(props: TriangleProps);
    constructor(
        a: Point | PointProps | [number, number] | TriangleProps,
        b?: Point | PointProps | [number, number],
        c?: Point | PointProps | [number, number]
    ) {
        super("triangle");
        if (a instanceof Point && b instanceof Point && c instanceof Point) {
            this.a = a;
            this.b = b;
            this.c = c;
        } else if (Point.isProps(a) && Point.isProps(b) && Point.isProps(c)) {
            this.a = new Point(a);
            this.b = new Point(b);
            this.c = new Point(c);
        } else if (
            Array.isArray(a) &&
            a.length == 2 &&
            Array.isArray(b) &&
            a.length == 2 &&
            Array.isArray(c) &&
            a.length == 2
        ) {
            this.a = new Point(a);
            this.b = new Point(b);
            this.c = new Point(c);
        } else if (Triangle.isProps(a)) {
            this.a = new Point(a.a);
            this.b = new Point(a.b);
            this.c = new Point(a.c);
        }
    }

    static random(max: Point = Point.one, min: Point = Point.zero): Triangle {
        return new Triangle(Point.random(max, min), Point.random(max, min), Point.random(max, min));
    }

    static isProps(obj: any): obj is TriangleProps {
        return (
            typeof obj == "object" &&
            obj.hasOwnProperty("a") &&
            Point.isProps(obj.a) &&
            obj.hasOwnProperty("b") &&
            Point.isProps(obj.b) &&
            obj.hasOwnProperty("c") &&
            Point.isProps(obj.c)
        );
    }
}

export default Triangle;
