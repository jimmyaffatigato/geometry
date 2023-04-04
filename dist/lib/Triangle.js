"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Angle_1 = __importDefault(require("./Angle"));
const Geometry_1 = __importDefault(require("./Geometry"));
const Line_1 = __importDefault(require("./Line"));
const Point_1 = __importDefault(require("./Point"));
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
    clone() {
        return new Triangle(this.a, this.b, this.c);
    }
    match(triangle) {
        const { a: a1, b: b1, c: c1 } = this;
        const { a: a2, b: b2, c: c2 } = triangle;
        return a1.match(a2) && b1.match(b2) && c1.match(c2);
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
