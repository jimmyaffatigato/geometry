import Angle from "./Angle";
import Geometry from "./Geometry";
import Line from "./Line";
import Point, { PointProps } from "./Point";

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
        return new Angle(this.ab.angle.difference(this.ac.angle));
    }

    get angleB(): Angle {
        return new Angle(this.ab.reverse().angle.absolute().difference(this.bc.angle));
    }

    get angleC(): Angle {
        //return new Angle(this.bc.reverse().angle.difference(this.ac.reverse().angle.absolute()));
        return this.bc.reverse().angle;
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
    constructor(props: TriangleProps);
    constructor(a: Point | TriangleProps, b?: Point, c?: Point) {
        super("triangle");
        if (a instanceof Point && b instanceof Point && c instanceof Point) {
            this.a = a;
            this.b = b;
            this.c = c;
        } else if (Triangle.isProps(a)) {
            this.a = new Point(a.a);
            this.b = new Point(a.b);
            this.c = new Point(a.c);
        }
    }

    static random(): Triangle {
        return new Triangle(Point.random(), Point.random(), Point.random());
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
