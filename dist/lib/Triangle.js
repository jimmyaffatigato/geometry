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
        return new Angle_1.default(this.ab.angle.difference(this.ac.angle));
    }
    get angleB() {
        return new Angle_1.default(this.ab.reverse().angle.absolute().difference(this.bc.angle));
    }
    get angleC() {
        //return new Angle(this.bc.reverse().angle.difference(this.ac.reverse().angle.absolute()));
        return this.bc.reverse().angle;
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
    static random() {
        return new Triangle(Point_1.default.random(), Point_1.default.random(), Point_1.default.random());
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
