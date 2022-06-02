import Vector from "./Vector.js";
class Point {
    /**
     * Creates a new Point with the given position
     */
    constructor(x, y = x) {
        this.type = "point";
        this.x = x;
        this.y = y;
    }
    get position() {
        return this.clone();
    }
    /**
     * `[0, 0]`
     */
    static get zero() {
        return new Point(0);
    }
    /**
     * `[1, 1]`
     */
    static get one() {
        return new Point(1);
    }
    match(point) {
        return this.x == point.x && this.y == point.y;
    }
    setPosition(position) {
        return new Point(position.x, position.y);
    }
    translateX(distance) {
        return new Point(this.x + distance, this.y);
    }
    translateY(distance) {
        return new Point(this.x, this.y + distance);
    }
    translate(distance) {
        return new Point(this.x + distance.x, this.y + distance.y);
    }
    difference(target) {
        return new Point(target.x - this.x, target.y - this.y);
    }
    distance(target) {
        const { x, y } = this.difference(target);
        return Math.sqrt(x ** 2 + y ** 2);
    }
    floor() {
        return new Point(Math.floor(this.x), Math.floor(this.y));
    }
    direction(target) {
        return Math.atan2(target.y - this.y, target.x - this.x);
    }
    absolute() {
        return new Point(Math.abs(this.x), Math.abs(this.y));
    }
    scale(factor) {
        if (typeof factor == "number") {
            return new Point(this.x * factor, this.y * factor);
        }
        return new Point(this.x * factor.x, this.y * factor.y);
    }
    reflect() {
        return new Point(-this.x, -this.y);
    }
    reflectX() {
        return new Point(-this.x, this.y);
    }
    reflectY() {
        return new Point(this.x, -this.y);
    }
    xZero() {
        return new Point(this.x, 0);
    }
    zeroY() {
        return new Point(0, this.y);
    }
    isWithin(center, range) {
        const distance = this.distance(center);
        return distance <= range;
    }
    clone() {
        return new Point(this.x, this.y);
    }
    toString(digits = 2) {
        return `[${this.x.toFixed(digits)}, ${this.y.toFixed(digits)}]`;
    }
    toArray() {
        return [this.x, this.y];
    }
    toVector() {
        return new Vector(Point.zero.direction(this), Point.zero.distance(this));
    }
}
export default Point;
//# sourceMappingURL=Point.js.map