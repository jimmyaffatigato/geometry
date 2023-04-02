"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Angle_1 = __importDefault(require("./Angle"));
const Geometry_1 = __importStar(require("./Geometry"));
const util_1 = require("./util");
const Vector_1 = __importDefault(require("./Vector"));
/**
 * An instance of `Point` contains `x` and `y` properties.
 * `Point` provides various methods for working with points.
 */
class Point extends Geometry_1.default {
    x;
    y;
    translate(a, b) {
        const distance = new Point(a, b);
        return new Point(this.x + distance.x, this.y + distance.y);
    }
    moveTowards(a, b, c) {
        let point;
        let distance;
        if (a instanceof Point && typeof b == "number") {
            point = a;
            distance = b;
        }
        else if (typeof a == "number" && typeof b == "number" && typeof c == "number") {
            point = new Point(a, b);
            distance = c;
        }
        return new Vector_1.default(point.direction(this), point.distance(this) - distance).toLine(point).end;
    }
    distance(a, b) {
        const target = new Point(a, b);
        const { x, y } = this.difference(target.x, target.y);
        return Math.sqrt(x ** 2 + y ** 2);
    }
    multiply(a, b) {
        const point = new Point(a, b);
        return new Point(this.x * point.x, this.y * point.y);
    }
    difference(a, b) {
        const target = new Point(a, b);
        return new Point(target.x - this.x, target.y - this.y);
    }
    direction(a, b) {
        const target = new Point(a, b);
        const difference = target.difference(this);
        let radians = Math.atan2(difference.y, difference.x);
        return new Angle_1.default(radians);
    }
    floor() {
        return new Point(Math.floor(this.x), Math.floor(this.y));
    }
    absolute() {
        return new Point(Math.abs(this.x), Math.abs(this.y));
    }
    reverse() {
        return new Point(this.y, this.x);
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
    rotate(a, origin = Point.zero) {
        return this.translate(origin.reflect()).toVector().rotate(a).toPoint().translate(origin);
    }
    match(point) {
        return this.x == point.x && this.y == point.y;
    }
    /**
     * Returns a new Point instance with the same properties
     */
    clone() {
        return new Point(this.x, this.y);
    }
    toArray() {
        return [this.x, this.y];
    }
    toVector() {
        return new Vector_1.default(Point.zero.direction(this), Point.zero.distance(this));
    }
    toObject() {
        return { x: this.x, y: this.y };
    }
    toString(digits = 2) {
        return `[${this.x.toFixed(digits)}, ${this.y.toFixed(digits)}]`;
    }
    constructor(a, b) {
        super("point");
        let x = undefined;
        let y = undefined;
        if (typeof a == "number" && typeof b == "number") {
            // number, number
            x = a;
            y = b;
        }
        else if (typeof a == "number" && typeof b == "undefined") {
            // number
            x = a;
            y = a;
        }
        else if (Array.isArray(a) && a.length == 2) {
            // [number, number]
            x = a[0];
            y = a[1];
        }
        else if (a instanceof Point) {
            // Point
            x = a.x;
            y = a.y;
        }
        else if (Point.isProps(a)) {
            // PointProps
            x = a.x;
            x = a.y;
        }
        this.x = (0, util_1.roundToPrecision)(x, Geometry_1.PRECISION);
        this.y = (0, util_1.roundToPrecision)(y, Geometry_1.PRECISION);
    }
    /**
     * `[0, 0]`
     */
    static get zero() {
        return new Point(0, 0);
    }
    /**
     * `[1, 1]`
     */
    static get one() {
        return new Point(1, 1);
    }
    static random(max = 1, min = 0) {
        const x = (0, util_1.random)(max, min);
        const y = (0, util_1.random)(max, min);
        return new Point(x, y);
    }
    static isProps(obj) {
        return (typeof obj == "object" &&
            !Array.isArray(obj) &&
            obj.hasOwnProperty("x") &&
            typeof obj.x == "number" &&
            obj.hasOwnProperty("y") &&
            typeof obj.y == "number");
    }
}
exports.default = Point;