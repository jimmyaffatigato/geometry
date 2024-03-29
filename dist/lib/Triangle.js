"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Angle_1 = __importDefault(require("./Angle"));
const Geometry_1 = __importDefault(require("./Geometry"));
const Line_1 = __importDefault(require("./Line"));
const Point_1 = __importDefault(require("./Point"));
const util_1 = require("./util");
/**
 * An instance of `Triangle` contains Points `a`, `b`, and `c` as well as various methods for working with triangles.
 */
class Triangle extends Geometry_1.default {
    a;
    b;
    c;
    get angleA() {
        const ab = this.ab.angle;
        const ac = this.ac.angle;
        const max = ab.radians > ac.radians ? ab : ac;
        const min = max === ab ? ac : ab;
        let angle = new Angle_1.default(max.radians - min.radians).absolute();
        if (angle.radians > Math.PI)
            angle = new Angle_1.default(Math.PI * 2 - angle.radians);
        return angle;
    }
    get angleB() {
        const bc = this.bc.angle;
        const ba = this.ab.reverse().angle;
        const max = bc.radians > ba.radians ? bc : ba;
        const min = max === bc ? ba : bc;
        let angle = new Angle_1.default(max.radians - min.radians).absolute();
        if (angle.radians > Math.PI)
            angle = new Angle_1.default(Math.PI * 2 - angle.radians);
        return angle;
    }
    get angleC() {
        const ca = this.ac.reverse().angle;
        const cb = this.bc.reverse().angle;
        const max = cb.radians > ca.radians ? cb : ca;
        const min = max === cb ? ca : cb;
        let angle = new Angle_1.default(max.radians - min.radians).absolute();
        if (angle.radians > Math.PI)
            angle = new Angle_1.default(Math.PI * 2 - angle.radians);
        return angle;
    }
    get ab() {
        return new Line_1.default(this.a, this.b);
    }
    get ac() {
        return new Line_1.default(this.a, this.c);
    }
    get bc() {
        return new Line_1.default(this.b, this.c);
    }
    get center() {
        return new Point_1.default((this.a.x + this.b.x + this.c.x) / 3, (this.a.y + this.b.y + this.c.y) / 3);
    }
    get area() {
        const { ab, ac, bc } = this;
        return (0, util_1.roundOffZeroes)(0.25 *
            Math.sqrt(ab.length + bc.length + ac.length) *
            Math.sqrt(-ab.length + bc.length + ac.length) *
            Math.sqrt(ab.length - bc.length + ac.length) *
            Math.sqrt(ab.length + bc.length - ac.length));
    }
    translate(a, b) {
        if (a instanceof Point_1.default) {
            return new Triangle(this.a.translate(a), this.b.translate(a), this.c.translate(a));
        }
        else if (typeof a == "number" && typeof b == "number") {
            return new Triangle(this.a.translate(a, b), this.b.translate(a, b), this.c.translate(a, b));
        }
    }
    rotate(radians, around = this.center) {
        return new Triangle(this.a.rotate(radians, around), this.b.rotate(radians, around), this.c.rotate(radians, around));
    }
    clone() {
        return new Triangle(this);
    }
    match(triangle, tolerance = 0) {
        const { a: a1, b: b1, c: c1 } = this;
        const { a: a2, b: b2, c: c2 } = triangle;
        return a1.match(a2, tolerance) && b1.match(b2, tolerance) && c1.match(c2, tolerance);
    }
    toObject() {
        return { a: this.a.toObject(), b: this.b.toObject(), c: this.c.toObject() };
    }
    toString() {
        return "";
    }
    constructor(a, b, c) {
        super("triangle");
        if (a instanceof Point_1.default && b instanceof Point_1.default && c instanceof Point_1.default) {
            this.a = a;
            this.b = b;
            this.c = c;
        }
        else if (Point_1.default.isProps(a) && Point_1.default.isProps(b) && Point_1.default.isProps(c)) {
            this.a = new Point_1.default(a);
            this.b = new Point_1.default(b);
            this.c = new Point_1.default(c);
        }
        else if (Array.isArray(a) &&
            a.length == 2 &&
            Array.isArray(b) &&
            a.length == 2 &&
            Array.isArray(c) &&
            a.length == 2) {
            this.a = new Point_1.default(a);
            this.b = new Point_1.default(b);
            this.c = new Point_1.default(c);
        }
        else if (Triangle.isProps(a)) {
            this.a = new Point_1.default(a.a);
            this.b = new Point_1.default(a.b);
            this.c = new Point_1.default(a.c);
        }
    }
    static random(max = Point_1.default.one, min = Point_1.default.zero) {
        return new Triangle(Point_1.default.random(max, min), Point_1.default.random(max, min), Point_1.default.random(max, min));
    }
    static isProps(obj) {
        return (typeof obj == "object" &&
            obj.hasOwnProperty("a") &&
            Point_1.default.isProps(obj.a) &&
            obj.hasOwnProperty("b") &&
            Point_1.default.isProps(obj.b) &&
            obj.hasOwnProperty("c") &&
            Point_1.default.isProps(obj.c));
    }
}
exports.default = Triangle;
