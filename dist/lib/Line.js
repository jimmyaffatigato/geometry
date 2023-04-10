"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Circle_1 = __importDefault(require("./Circle"));
const Geometry_1 = __importDefault(require("./Geometry"));
const Point_1 = __importDefault(require("./Point"));
const Rectangle_1 = __importDefault(require("./Rectangle"));
const Triangle_1 = __importDefault(require("./Triangle"));
const Vector_1 = __importDefault(require("./Vector"));
class Line extends Geometry_1.default {
    origin;
    end;
    get length() {
        return this.origin.distance(this.end);
    }
    get angle() {
        return this.origin.direction(this.end);
    }
    get midpoint() {
        return this.pointAt(0.5);
    }
    pointAt(pct) {
        return this.toVector()
            .setMagnitude(this.length * pct)
            .toLine(this.origin).end;
    }
    reverse() {
        return new Line(this.end, this.origin);
    }
    translate(a, b) {
        if (a instanceof Point_1.default) {
            return new Line(this.origin.translate(a), this.end.translate(a));
        }
        else if (typeof a == "number" && typeof b == "number") {
            return new Line(this.origin.translate(a, b), this.end.translate(a, b));
        }
    }
    rotate(radians) {
        return this.toVector().rotate(radians).toLine(this.origin);
    }
    rotateByDegree(degree) {
        return this.rotate((Math.PI / 180) * degree);
    }
    setAngle(angle) {
        return this.toVector().setDirection(angle).toLine(this.origin);
    }
    toVector() {
        return new Vector_1.default(this.angle, this.length);
    }
    toRectangle() {
        return new Rectangle_1.default(this.origin, this.end.difference(this.origin));
    }
    toCircle() {
        return new Circle_1.default(this.origin, this.length);
    }
    toTriangle(c) {
        return new Triangle_1.default(this.origin, this.end, c);
    }
    clone() {
        return new Line(this);
    }
    match(line, tolerance = 0) {
        return line.origin.match(this.origin, tolerance) && line.end.match(this.end, tolerance);
    }
    floor() {
        return new Line(this.origin.floor(), this.end.floor());
    }
    toObject() {
        return { origin: this.origin.toObject(), end: this.end.toObject() };
    }
    toString() {
        return `${this.origin.toString()} => ${this.end.toString()}`;
    }
    constructor(a, b) {
        super("line");
        if (a instanceof Point_1.default && b instanceof Point_1.default) {
            this.origin = a;
            this.end = b;
        }
        else if (Line.isProps(a)) {
            this.origin = new Point_1.default(a.origin);
            this.end = new Point_1.default(a.end);
        }
    }
    static fromObject(obj) {
        return new Line(new Point_1.default(obj.origin), new Point_1.default(obj.end));
    }
    static random() {
        return new Line(Point_1.default.random(), Point_1.default.random());
    }
    static isProps(obj) {
        return (typeof obj == "object" &&
            obj.hasOwnProperty("origin") &&
            Point_1.default.isProps(obj.origin) &&
            obj.hasOwnProperty("end") &&
            Point_1.default.isProps(obj.end));
    }
}
exports.default = Line;
