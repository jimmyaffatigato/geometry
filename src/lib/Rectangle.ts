import Geometry from "./Geometry";
import Point, { PointProps } from "./Point";

export interface RectangleProps {
    position: PointProps;
    size: PointProps;
}

/**
 * An instance of `Rectangle` contains `position` and `size` properties as well as various methods for working with rectangles.
 */
class Rectangle extends Geometry<Rectangle, RectangleProps> {
    readonly position: Point;
    readonly size: Point;

    /**
     * X coordinate of top left corner
     */
    get x(): number {
        return this.position.x;
    }

    /**
     * Y coordinate of top left corner
     */
    get y(): number {
        return this.position.y;
    }

    get width(): number {
        return this.size.x;
    }

    get height(): number {
        return this.size.y;
    }

    get area(): number {
        return this.width * this.height;
    }

    get perimeter(): number {
        return this.width * 2 + this.height * 2;
    }

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

    setPosition(position: Point): Rectangle {
        return new Rectangle(position, this.size);
    }

    setSize(size: Point): Rectangle {
        return new Rectangle(this.position, size);
    }

    translate(point: Point): Rectangle {
        return this.setPosition(this.position.translate(point));
    }

    scale(factor: Point | number): Rectangle {
        return this.setSize(this.size.multiply(factor));
    }

    expand(amount: Point): Rectangle {
        return new Rectangle(this.position.translate(amount.reflect()), this.size.translate(amount.multiply(2)));
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

    toObject(): RectangleProps {
        return { position: this.position.toObject(), size: this.size.toObject() };
    }

    /**
     * `[x, y, w, h]`
     */
    toString(digits: number = 2): string {
        const { x, y, width, height } = this;
        return `[${x.toFixed(digits)}, ${y.toFixed(digits)}, ${width.toFixed(digits)}, ${height.toFixed(digits)}]`;
    }

    constructor(x: number, y: number, width: number, height: number);
    constructor(position: Point, size: Point);
    constructor(props: RectangleProps);
    constructor(a: Point | number | RectangleProps, b?: Point | number, c?: number, d?: number) {
        super("rectangle");
        if (typeof a == "number" && typeof b == "number" && typeof c == "number" && typeof d == "number") {
            // number, number, number, number
            this.position = new Point(a, b);
            this.size = new Point(c, d);
        } else if (a instanceof Point && b instanceof Point) {
            // Point, Point
            this.position = a;
            this.size = b;
        } else if (Rectangle.isProps(a)) {
            this.position = new Point(a.position);
            this.size = new Point(a.size);
        }
    }

    static random(): Rectangle {
        return new Rectangle(Point.random(), Point.random());
    }

    static isProps(obj: any): obj is RectangleProps {
        return (
            typeof obj == "object" &&
            !(obj instanceof Point) &&
            obj.hasOwnProperty("position") &&
            obj.position instanceof Point &&
            obj.hasOwnProperty("size") &&
            obj.size instanceof Point
        );
    }
}

export default Rectangle;
