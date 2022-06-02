import Point from "./Point.js";
import Rectangle from "./Rectangle.js";
import Vector from "./Vector.js";
class Line {
    constructor(origin, end) {
        this.type = "line";
        this.origin = origin;
        this.end = end;
    }
    get size() {
        return new Point(this.width, this.height);
    }
    get position() {
        return this.origin;
    }
    get width() {
        return this.end.x - this.origin.x;
    }
    get height() {
        return this.end.y - this.origin.y;
    }
    get area() {
        return this.width * this.height;
    }
    get length() {
        return Math.sqrt(this.width ** 2 + this.height ** 2);
    }
    get angle() {
        return this.origin.direction(this.end);
    }
    clone() {
        return new Line(this.origin, this.end);
    }
    reverse() {
        return new Line(this.end, this.origin);
    }
    translate(point) {
        return new Line(this.origin.translate(point), this.end.translate(point));
    }
    setPosition(position) {
        return new Line(this.origin, this.end).translate(this.position.difference(position));
    }
    rotate(angle) {
        return new Vector(this.angle + angle, this.length).toLine(this.origin);
    }
    rotateByDegree(degree) {
        return this.rotate((Math.PI / 180) * degree);
    }
    setAngle(angle) {
        return new Vector(angle, this.length).toLine(this.origin);
    }
    toString() {
        return `${this.origin.toString()} => ${this.end.toString()}`;
    }
    toVector() {
        return new Vector(this.angle, this.length);
    }
    toRectanlge() {
        return new Rectangle(this.origin, this.end);
    }
}
export default Line;
//# sourceMappingURL=Line.js.map