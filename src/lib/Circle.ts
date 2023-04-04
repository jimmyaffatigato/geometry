import Geometry from "./Geometry";
import Point, { PointProps } from "./Point";
import Rectangle from "./Rectangle";

export interface CircleProps {
    origin: PointProps;
    radius: number;
}

class Circle extends Geometry<Circle, CircleProps> {
    readonly origin: Point;
    readonly radius: number;

    get diameter(): number {
        return this.radius * 2;
    }

    get area(): number {
        return this.radius ** 2 * Math.PI;
    }

    get circumference(): number {
        return 2 * Math.PI * this.radius;
    }

    get bounds(): Rectangle {
        return new Rectangle(this.center.x - this.radius, this.center.y - this.radius, this.diameter, this.diameter);
    }

    // Position

    get center(): Point {
        return this.origin;
    }

    setPosition(position: Point): Circle {
        return new Circle(position, this.radius);
    }

    translate(point: Point): Circle {
        return this.setPosition(this.center.translate(point));
    }

    contains(point: Point): boolean {
        return point.distance(this.origin) <= this.radius;
    }

    overlaps(circle: Circle): boolean {
        return this.center.distance(circle.center) <= this.radius * 2;
    }

    clone(): Circle {
        return new Circle(this.origin, this.radius);
    }

    match(circle: Circle): boolean {
        return circle.origin.match(this.origin) && circle.radius == this.radius;
    }

    toObject(): CircleProps {
        return { origin: this.origin.toObject(), radius: this.radius };
    }

    toString(digits: number = 2): string {
        const { x, y } = this.center;
        return `[x: ${x.toFixed(digits)}, y: ${y.toFixed(digits)}, r: ${this.radius}]`;
    }

    constructor(position: Point, radius: number);
    constructor(props: CircleProps);
    constructor(a: Point | CircleProps, b?: number) {
        super("circle");
        if (a instanceof Point && typeof b == "number") {
            this.origin = a;
            this.radius = b;
        } else if (Circle.isProps(a)) {
            this.origin = new Point(a.origin);
            this.radius = a.radius;
        }
    }

    static isProps(obj: any): obj is CircleProps {
        return (
            typeof obj == "object" &&
            obj.hasOwnProperty("origin") &&
            Point.isProps(obj.origin) &&
            obj.hasOwnProperty("radius") &&
            typeof obj.radius == "number"
        );
    }
}

export default Circle;
