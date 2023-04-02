"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Angle_1 = __importDefault(require("./Angle"));
const Geometry_1 = __importDefault(require("./Geometry"));
class Arc extends Geometry_1.default {
    angle;
    radius;
    get arcLength() {
        return this.angle.radians * this.radius;
    }
    get chordLength() {
        return NaN;
    }
    get sectorArea() {
        return 0;
    }
    constructor(angle, radius) {
        super("arc");
        this.angle = angle;
        this.radius = radius;
    }
    clone() {
        return new Arc(new Angle_1.default(0), 0);
    }
    match() {
        return false;
    }
    toObject() {
        return { angle: this.angle.toObject(), radius: this.radius };
    }
    toString() {
        return "";
    }
}
exports.default = Arc;
