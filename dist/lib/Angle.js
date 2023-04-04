"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Geometry_1 = __importDefault(require("./Geometry"));
const Vector_1 = __importDefault(require("./Vector"));
const util_1 = require("./util");
/**
 * The Angle class contains a radians property and various helper functions for working with angles.
 */
class Angle extends Geometry_1.default {
    radians;
    get degrees() {
        return (0, util_1.radiansToDegrees)(this.radians);
    }
    /**
     * Rotate by radians.
     * @param {number} radians
     * @returns {Angle}
     */
    rotate(radians) {
        return new Angle(this.radians + radians);
    }
    /**
     * Rotate by degrees.
     * @param degrees
     * @returns
     */
    rotateByDegrees(degrees) {
        return this.rotate((0, util_1.degreesToRadians)(degrees));
    }
    add(angle) {
        return new Angle(this.radians + angle.radians);
    }
    difference(angle) {
        return new Angle(this.radians - angle.radians);
    }
    multiply(factor) {
        return new Angle(this.radians * factor);
    }
    absolute() {
        return new Angle(Math.abs(this.radians));
    }
    match(angle) {
        return this.radians == angle.radians;
    }
    /**
     * Returns a new Angle instance with the same properties
     */
    clone() {
        return new Angle(this.radians);
    }
    /**
     *
     */
    toVector(magnitude) {
        return new Vector_1.default(this, magnitude);
    }
    toObject() {
        return { radians: this.radians };
    }
    /**
     *
     */
    toString() {
        return `${this.degrees.toFixed(1)}° (${this.radians.toFixed(1)})`;
    }
    constructor(a) {
        super("angle");
        let radians;
        if (typeof a == "number") {
            radians = a;
        }
        else if (Angle.isProps(a)) {
            radians = a.radians;
        }
        this.radians = (0, util_1.clampToRadians)(radians);
    }
    /**
     * Creates an Angle from degrees
     */
    static fromDegrees(degrees) {
        return new Angle((0, util_1.degreesToRadians)(degrees));
    }
    /**
     * Creates a random Angle
     */
    static random() {
        return new Angle((0, util_1.randomRadians)());
    }
    static isProps(obj) {
        return typeof obj == "object" && obj.hasOwnProperty("radians") && typeof obj.radians == "number";
    }
}
exports.default = Angle;
