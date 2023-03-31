import Geometry from "./Geometry";
import Point, { PointProps } from "./Point";

export interface RectangleProps {
    position: PointProps;
    size: PointProps;
}

class Rectangle extends Geometry<Rectangle> {
    readonly position: Point;

    get x(): number {
        return this.position.x;
    }

    get y(): number {
        return this.position.y;
    }

    translate(point: Point): Rectangle {
        return new Rectangle(this.position.translate(point), this.size);
    }

    setPosition(position: Point): Rectangle {
        return new Rectangle(position, this.size);
    }

    // Size

    readonly size: Point;

    get width(): number {
        return this.size.x;
    }

    get height(): number {
        return this.size.y;
    }

    get area(): number {
        return this.width * this.height;
    }

    scale(factor: Point | number): Rectangle {
        return new Rectangle(this.position, this.size.multiply(factor));
    }

    expand(amount: Point): Rectangle {
        return new Rectangle(this.position.translate(amount.reflect()), this.size.translate(amount.multiply(2)));
    }

    // Bounds

    get left(): number {
        return this.x;
    }

    get right(): number {
        return this.x + this.width;
    }

    get top(): number {
        return this.y;
    }

    get bottom(): number {
        return this.y + this.height;
    }

    contains(point: Point): boolean {
        return point.x >= this.left && point.x <= this.right && point.y >= this.top && point.y <= this.bottom;
    }

    reflect(): Rectangle {
        return new Rectangle(this.position.reflect(), this.size.reflect());
    }

    reflectX(): Rectangle {
        return new Rectangle(this.position.reflectX(), this.size.reflectX());
    }

    reflectY(): Rectangle {
        return new Rectangle(this.position.reflectY(), this.size.reflectY());
    }

    intersects(rectangle: Rectangle): boolean {
        return !(
            rectangle.left > this.right ||
            rectangle.right < this.left ||
            rectangle.top > this.bottom ||
            rectangle.bottom < this.top
        );
    }

    floor(): Rectangle {
        return new Rectangle(this.position.floor(), this.size.floor());
    }

    toArray(): [number, number, number, number] {
        return [this.x, this.y, this.width, this.height];
    }

    clone(): Rectangle {
        return new Rectangle(this.position, this.size);
    }

    match(rectangle: Rectangle): boolean {
        return this.position.match(rectangle.position) && this.size.match(rectangle.size);
    }

    /**
     * "[x, y, w, h]"
     */
    toString(digits: number = 2): string {
        const { x, y, width, height } = this;
        return `[${x.toFixed(digits)}, ${y.toFixed(digits)}, ${width.toFixed(digits)}, ${height.toFixed(digits)}]`;
    }

    constructor(position: Point, size: Point);
    constructor(x: number, y: number, width: number, height: number);
    constructor(a: Point | number, b: Point | number, c?: number, d?: number) {
        super("rectangle");
        if (typeof a == "number" && typeof b == "number" && typeof c == "number" && typeof d == "number") {
            this.position = new Point(a, b);
            this.size = new Point(c, d);
        } else if (a instanceof Point && b instanceof Point) {
            this.position = a;
            this.size = b;
        }
    }

    static fromObject(obj: RectangleProps): Rectangle {
        return new Rectangle(Point.fromObject(obj.position), Point.fromObject(obj.size));
    }

    static random(): Rectangle {
        return new Rectangle(Point.random(), Point.random());
    }
}

export default Rectangle;
