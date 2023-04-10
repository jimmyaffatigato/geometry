"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Geometry_1 = __importDefault(require("./Geometry"));
const Line_1 = __importDefault(require("./Line"));
const Point_1 = __importDefault(require("./Point"));
/**
 * An instance of `Rectangle` contains `position` and `size` properties as well as various methods for working with rectangles.
 */
class Rectangle extends Geometry_1.default {
    position;
    size;
    /**
     * X coordinate of top left corner
     */
    get x() {
        return this.position.x;
    }
    /**
     * Y coordinate of top left corner
     */
    get y() {
        return this.position.y;
    }
    get width() {
        return this.size.x;
    }
    get height() {
        return this.size.y;
    }
    get [0]() {
        return this.x;
    }
    get [1]() {
        return this.y;
    }
    get [2]() {
        return this.width;
    }
    get [3]() {
        return this.height;
    }
    get area() {
        return this.width * this.height;
    }
    get perimeter() {
        return this.width * 2 + this.height * 2;
    }
    get left() {
        return this.x;
    }
    get right() {
        return this.x + this.width;
    }
    get top() {
        return this.y;
    }
    get bottom() {
        return this.y + this.height;
    }
    get topLeft() {
        return this.position;
    }
    get topRight() {
        return new Point_1.default(this.right, this.top);
    }
    get bottomLeft() {
        return new Point_1.default(this.left, this.bottom);
    }
    get bottomRight() {
        return this.position.translate(this.size);
    }
    get topSide() {
        return new Line_1.default(this.topLeft, this.topRight);
    }
    get leftSide() {
        return new Line_1.default(this.topLeft, this.bottomLeft);
    }
    get bottomSide() {
        return new Line_1.default(this.bottomLeft, this.bottomRight);
    }
    get rightSide() {
        return new Line_1.default(this.topRight, this.bottomRight);
    }
    setPosition(position) {
        return new Rectangle(position, this.size);
    }
    setSize(size) {
        return new Rectangle(this.position, size);
    }
    translate(point) {
        return this.setPosition(this.position.translate(point));
    }
    scale(factor) {
        return this.setSize(this.size.multiply(factor));
    }
    expand(amount) {
        return new Rectangle(this.position.translate(amount.reflect()), this.size.translate(amount.multiply(2)));
    }
    contains(point) {
        return point.x >= this.left && point.x <= this.right && point.y >= this.top && point.y <= this.bottom;
    }
    reflect() {
        return new Rectangle(this.position.reflect(), this.size.reflect());
    }
    reflectX() {
        return new Rectangle(this.position.reflectX(), this.size.reflectX());
    }
    reflectY() {
        return new Rectangle(this.position.reflectY(), this.size.reflectY());
    }
    intersects(rectangle) {
        return !(rectangle.left > this.right ||
            rectangle.right < this.left ||
            rectangle.top > this.bottom ||
            rectangle.bottom < this.top);
    }
    floor() {
        return new Rectangle(this.position.floor(), this.size.floor());
    }
    toArray() {
        return [this.x, this.y, this.width, this.height];
    }
    clone() {
        return new Rectangle(this);
    }
    match(rectangle, tolerance = 0) {
        return this.position.match(rectangle.position, tolerance) && this.size.match(rectangle.size, tolerance);
    }
    toObject() {
        return { position: this.position.toObject(), size: this.size.toObject() };
    }
    /**
     * `[x, y, w, h]`
     */
    toString(digits = 2) {
        const { x, y, width, height } = this;
        return `[${x.toFixed(digits)}, ${y.toFixed(digits)}, ${width.toFixed(digits)}, ${height.toFixed(digits)}]`;
    }
    constructor(a, b, c, d) {
        super("rectangle");
        let x;
        let y;
        let width;
        let height;
        if (typeof a == "number" && typeof b == "number" && typeof c == "number" && typeof d == "number") {
            // number, number, number, number
            x = a;
            y = b;
            width = c;
            height = d;
        }
        else if (a instanceof Point_1.default && b instanceof Point_1.default) {
            // Point, Point
            x = a.x;
            y = a.y;
            width = b.x;
            height = b.y;
        }
        else if (Array.isArray(a) && a.length == 4) {
            x = a[0];
            y = a[1];
            width = a[2];
            height = a[3];
        }
        else if (Rectangle.isProps(a)) {
            x = a.position.x;
            y = a.position.y;
            width = a.size.x;
            height = a.size.y;
        }
        this.position = new Point_1.default(x, y);
        this.size = new Point_1.default(width, height);
    }
    static random() {
        return new Rectangle(Point_1.default.random(), Point_1.default.random());
    }
    static isProps(obj) {
        return (typeof obj == "object" &&
            !(obj instanceof Point_1.default) &&
            obj.hasOwnProperty("position") &&
            obj.position instanceof Point_1.default &&
            obj.hasOwnProperty("size") &&
            obj.size instanceof Point_1.default);
    }
}
exports.default = Rectangle;
