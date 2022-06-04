import { Geometry, Bounds, Size, Position } from "./Geometry.js";
import Point from "./Point.js";

class Rectangle implements Geometry<Rectangle>, Size, Bounds, Position<Rectangle> {
    public readonly type = "rectangle";
    public readonly position: Point;
    public readonly size: Point;

    public get area(): number {
        return this.width * this.height;
    }

    public get x(): number {
        return this.position.x;
    }

    public get y(): number {
        return this.position.y;
    }

    public get width(): number {
        return this.size.x;
    }

    public get height(): number {
        return this.size.y;
    }

    public get left(): number {
        return this.x;
    }

    public get right(): number {
        return this.x + this.width;
    }

    public get top(): number {
        return this.y;
    }

    public get bottom(): number {
        return this.y + this.height;
    }

    constructor(position: Point, size: Point);
    constructor(x: number, y: number, width: number, height: number);
    constructor(a: Point | number, b: Point | number, c?: number, d?: number) {
        this.type = "rectangle";
        if (typeof a == "number" && typeof b == "number" && typeof c == "number" && typeof d == "number") {
            this.position = new Point(a, b);
            this.size = new Point(c, d);
        } else if (a instanceof Point && b instanceof Point) {
            this.position = a;
            this.size = b;
        }
    }

    public clone(): Rectangle {
        return new Rectangle(this.position, this.size);
    }

    public match(rectangle: Rectangle): boolean {
        return this.position.match(rectangle.position) && this.size.match(rectangle.size);
    }

    public translate(point: Point): Rectangle {
        return new Rectangle(this.position.translate(point), this.size);
    }

    public setPosition(position: Point): Rectangle {
        return new Rectangle(position, this.size);
    }

    public floor(): Rectangle {
        return new Rectangle(this.position.floor(), this.size.floor());
    }

    public absolute(): Rectangle {
        return new Rectangle(this.position.absolute(), this.size.absolute());
    }

    public scale(factor: Point | number): Rectangle {
        return new Rectangle(this.position, this.size.scale(factor));
    }

    public expand(amount: Point): Rectangle {
        return new Rectangle(this.position.translate(amount.reflect()), this.size.translate(amount.scale(2)));
    }

    public reflect(): Rectangle {
        return new Rectangle(this.position.reflect(), this.size.reflect());
    }

    public reflectX(): Rectangle {
        return new Rectangle(this.position.reflectX(), this.size.reflectX());
    }

    public reflectY(): Rectangle {
        return new Rectangle(this.position.reflectY(), this.size.reflectY());
    }

    public intersects(rectangle: Rectangle): boolean {
        return !(
            rectangle.left > this.right ||
            rectangle.right < this.left ||
            rectangle.top > this.bottom ||
            rectangle.bottom < this.top
        );
    }

    public contains(point: Point): boolean {
        return point.x >= this.left && point.x <= this.right && point.y >= this.top && point.y <= this.bottom;
    }

    public toString(digits: number = 2): string {
        const { x, y, width, height } = this;
        return `[${x.toFixed(digits)}, ${y.toFixed(digits)}, ${width.toFixed(digits)}, ${height.toFixed(digits)}]`;
    }

    public toArray(): [number, number, number, number] {
        return [this.x, this.y, this.width, this.height];
    }
}

export default Rectangle;
