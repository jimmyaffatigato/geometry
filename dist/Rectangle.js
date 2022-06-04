import Point from "./Point.js";
class Rectangle {
    constructor(a, b, c, d) {
        this.type = "rectangle";
        this.type = "rectangle";
        if (typeof a == "number" && typeof b == "number" && typeof c == "number" && typeof d == "number") {
            this.position = new Point(a, b);
            this.size = new Point(c, d);
        }
        else if (a instanceof Point && b instanceof Point) {
            this.position = a;
            this.size = b;
        }
    }
    get area() {
        return this.width * this.height;
    }
    get x() {
        return this.position.x;
    }
    get y() {
        return this.position.y;
    }
    get width() {
        return this.size.x;
    }
    get height() {
        return this.size.y;
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
    clone() {
        return new Rectangle(this.position, this.size);
    }
    match(rectangle) {
        return this.position.match(rectangle.position) && this.size.match(rectangle.size);
    }
    translate(point) {
        return new Rectangle(this.position.translate(point), this.size);
    }
    setPosition(position) {
        return new Rectangle(position, this.size);
    }
    floor() {
        return new Rectangle(this.position.floor(), this.size.floor());
    }
    absolute() {
        return new Rectangle(this.position.absolute(), this.size.absolute());
    }
    scale(factor) {
        return new Rectangle(this.position, this.size.scale(factor));
    }
    expand(amount) {
        return new Rectangle(this.position.translate(amount.reflect()), this.size.translate(amount.scale(2)));
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
    contains(point) {
        return point.x >= this.left && point.x <= this.right && point.y >= this.top && point.y <= this.bottom;
    }
    toString(digits = 2) {
        const { x, y, width, height } = this;
        return `[${x.toFixed(digits)}, ${y.toFixed(digits)}, ${width.toFixed(digits)}, ${height.toFixed(digits)}]`;
    }
    toArray() {
        return [this.x, this.y, this.width, this.height];
    }
}
export default Rectangle;
//# sourceMappingURL=Rectangle.js.map