"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Geometry_1 = __importDefault(require("./Geometry"));
const Point_1 = __importDefault(require("./Point"));
const Rectangle_1 = __importDefault(require("./Rectangle"));
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
    reverse() {
        return new Line(this.end, this.origin);
    }
    translate(point) {
        return new Line(this.origin.translate(point), this.end.translate(point));
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
    clone() {
        return new Line(this.origin, this.end);
    }
    match(line) {
        return line.origin.match(this.origin) && line.end.match(this.end);
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
