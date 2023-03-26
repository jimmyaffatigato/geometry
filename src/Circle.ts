import { Geometry, Bounds, Position } from "./Geometry";
import Point from "./Point";

class Circle implements Geometry<Circle>, Position<Circle>, Bounds {
    public readonly origin: Point;
    public readonly radius: number;

    public get diameter(): number {
        return this.radius * 2;
    }

    public get area(): number {
        return this.radius ** 2 * Math.PI;
    }

    public get circumference(): number {
        return 2 * Math.PI * this.radius;
    }

    // Position

    public get position(): Point {
        return this.origin;
    }

    public get x(): number {
        return this.origin.x;
    }

    public get y(): number {
        return this.origin.y;
    }

    public setPosition(position: Point): Circle {
        return new Circle(position, this.radius);
    }

    public translate(point: Point): Circle {
        return this.setPosition(this.position.translate(point));
    }

    // Size

    public get size(): Point {
        return new Point(this.diameter, this.diameter);
    }

    public get width(): number {
        return this.size.x;
    }

    public get height(): number {
        return this.size.y;
    }

    // Bounds

    public get left(): number {
        return this.x - this.radius;
    }

    public get right(): number {
        return this.x + this.radius;
    }

    public get top(): number {
        return this.y - this.radius;
    }

    public get bottom(): number {
        return this.y + this.radius;
    }

    public contains(point: Point): boolean {
        return point.distance(this.origin) <= this.radius;
    }

    // Geometry

    public readonly type = "circle";

    public clone(): Circle {
        return new Circle(this.origin, this.radius);
    }

    public match(circle: Circle): boolean {
        return circle.origin.match(this.origin) && circle.radius == this.radius;
    }

    public toString(digits: number = 2): string {
        const { x, y, radius } = this;
        return `[x: ${x.toFixed(digits)}, y: ${y.toFixed(digits)}, r: ${radius}]`;
    }

    constructor(position: Point, radius: number) {
        this.origin = position;
        this.radius = radius;
    }
}

export default Circle;
