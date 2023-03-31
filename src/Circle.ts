import Geometry from "./Geometry";
import Point from "./Point";
import Rectangle from "./Rectangle";

class Circle extends Geometry<Circle> {
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
        return new Rectangle(
            this.position.x - this.radius,
            this.position.y - this.radius,
            this.diameter,
            this.diameter
        );
    }

    // Position

    get position(): Point {
        return this.origin;
    }

    setPosition(position: Point): Circle {
        return new Circle(position, this.radius);
    }

    translate(point: Point): Circle {
        return this.setPosition(this.position.translate(point));
    }

    contains(point: Point): boolean {
        return point.distance(this.origin) <= this.radius;
    }

    clone(): Circle {
        return new Circle(this.origin, this.radius);
    }

    match(circle: Circle): boolean {
        return circle.origin.match(this.origin) && circle.radius == this.radius;
    }

    toString(digits: number = 2): string {
        const { x, y } = this.position;
        return `[x: ${x.toFixed(digits)}, y: ${y.toFixed(digits)}, r: ${this.radius}]`;
    }

    constructor(position: Point, radius: number) {
        super("circle");
        this.origin = position;
        this.radius = radius;
    }
}

export default Circle;
