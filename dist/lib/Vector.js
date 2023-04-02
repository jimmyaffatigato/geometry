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
const Line_1 = __importDefault(require("./Line"));
const Point_1 = __importDefault(require("./Point"));
const util_1 = require("./util");
/**
 * An instance of `Vector` contains `direction` and `magnitude` properties as well as various methods for working with vectors.
 */
class Vector extends Geometry_1.default {
    direction;
    magnitude;
    scale(factor) {
        return new Vector(this.direction, this.magnitude * factor);
    }
    setDirection(direction) {
        return new Vector(direction, this.magnitude);
    }
    setMagnitude(magnitude) {
        return new Vector(this.direction, magnitude);
    }
    rotate(a) {
        return new Vector(this.direction.rotate(typeof a == "number" ? a : a.radians), this.magnitude);
    }
    /**
     * Rotates the Vector by degrees
     */
    rotateByDegrees(degrees) {
        return this.rotate((Math.PI / 180) * degrees);
    }
    clone() {
        return new Vector(this.direction, this.magnitude);
    }
    match(vector) {
        return vector.direction == this.direction && vector.magnitude == this.magnitude;
    }
    toPoint() {
        return new Point_1.default(Math.cos(this.direction.radians) * this.magnitude, -Math.sin(this.direction.radians) * this.magnitude);
    }
    toLine(origin = Point_1.default.zero) {
        return new Line_1.default(Point_1.default.zero, this.toPoint()).translate(origin);
    }
    toObject() {
        return { direction: this.direction.toObject(), magnitude: this.magnitude };
    }
    toString(digits = 2) {
        return `${this.direction.degrees.toFixed(digits)}° x ${this.magnitude.toFixed(digits)}`;
    }
    constructor(a, b = 0) {
        super("vector");
        let direction;
        let magnitude;
        if (a instanceof Angle_1.default) {
            direction = a;
            magnitude = b;
        }
        else if (Vector.isProps(a)) {
            direction = new Angle_1.default(a.direction);
            magnitude = a.magnitude;
        }
        this.direction = direction;
        this.magnitude = (0, util_1.roundToPrecision)(magnitude, Geometry_1.PRECISION);
    }
    static get zero() {
        return new Vector(new Angle_1.default(0));
    }
    static random() {
        return new Vector(Angle_1.default.random(), (0, util_1.random)(Infinity, -Infinity, Geometry_1.PRECISION));
    }
    static isProps(obj) {
        return (typeof obj == "object" &&
            obj.hasOwnProperty("direction") &&
            Angle_1.default.isProps(obj.direction) &&
            obj.hasOwnProperty("magnitude") &&
            typeof obj.magnitude == "number");
    }
}
exports.default = Vector;
