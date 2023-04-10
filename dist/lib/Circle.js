"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Angle_1 = __importDefault(require("./Angle"));
const Arc_1 = __importDefault(require("./Arc"));
const Geometry_1 = __importDefault(require("./Geometry"));
const Point_1 = __importDefault(require("./Point"));
const Rectangle_1 = __importDefault(require("./Rectangle"));
const Vector_1 = __importDefault(require("./Vector"));
const util_1 = require("./util");
class Circle extends Geometry_1.default {
    origin;
    radius;
    get diameter() {
        return this.radius * 2;
    }
    get area() {
        return this.radius ** 2 * Math.PI;
    }
    get circumference() {
        return 2 * Math.PI * this.radius;
    }
    get bounds() {
        return new Rectangle_1.default(this.center.x - this.radius, this.center.y - this.radius, this.diameter, this.diameter);
    }
    // Position
    get center() {
        return this.origin;
    }
    pointAt(a) {
        return new Vector_1.default(a, this.radius).toLine(this.center).end;
    }
    setPosition(position) {
        return new Circle(position, this.radius);
    }
    translate(point) {
        return this.setPosition(this.center.translate(point));
    }
    contains(point) {
        return point.distance(this.origin) <= this.radius;
    }
    overlaps(circle) {
        return this.center.distance(circle.center) <= this.radius * 2;
    }
    clone() {
        return new Circle(this);
    }
    match(circle, tolerance = 0) {
        return circle.origin.match(this.origin, tolerance) && (0, util_1.matchNumber)(this.radius, circle.radius, tolerance);
    }
    toArc() {
        return new Arc_1.default(this.origin, new Angle_1.default(0), new Angle_1.default(Math.PI * 2), this.radius);
    }
    toObject() {
        return { origin: this.origin.toObject(), radius: this.radius };
    }
    toString(digits = 2) {
        const { x, y } = this.center;
        return `[x: ${x.toFixed(digits)}, y: ${y.toFixed(digits)}, r: ${this.radius}]`;
    }
    constructor(a, b) {
        super("circle");
        if (a instanceof Point_1.default && typeof b == "number") {
            this.origin = a;
            this.radius = b;
        }
        else if (Circle.isProps(a)) {
            this.origin = new Point_1.default(a.origin);
            this.radius = a.radius;
        }
    }
    static isProps(obj) {
        return (typeof obj == "object" &&
            obj.hasOwnProperty("origin") &&
            Point_1.default.isProps(obj.origin) &&
            obj.hasOwnProperty("radius") &&
            typeof obj.radius == "number");
    }
}
exports.default = Circle;
