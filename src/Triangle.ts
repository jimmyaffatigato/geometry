import Angle from "./Angle";
import Geometry from "./Geometry";
import Line from "./Line";
import Point, { PointProps } from "./Point";

export interface TriangleProps {
    a: PointProps;
    b: PointProps;
    c: PointProps;
}

class Triangle extends Geometry<Triangle> {
    readonly a: Point;
    readonly b: Point;
    readonly c: Point;

    get angleA(): Angle {
        return new Angle(this.a.direction(this.b).radians - this.a.direction(this.c).radians);
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

    constructor(a: Point, b: Point, c: Point) {
        super("triangle");
        this.a = a;
        this.b = b;
        this.c = c;
    }

    static fromObject(obj: TriangleProps): Triangle {
        return new Triangle(Point.fromObject(obj.a), Point.fromObject(obj.b), Point.fromObject(obj.c));
    }
}

export default Triangle;
