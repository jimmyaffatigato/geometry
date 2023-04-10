"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Geometry_1 = __importDefault(require("./Geometry"));
const Line_1 = __importDefault(require("./Line"));
const Vector_1 = __importDefault(require("./Vector"));
const util_1 = require("./util");
class Arc extends Geometry_1.default {
    origin;
    startAngle;
    endAngle;
    radius;
    get angle() {
        return this.endAngle.difference(this.angle);
    }
    get arcLength() {
        return this.angle.radians * this.radius;
    }
    get chord() {
        return new Line_1.default(this.startPoint, this.endPoint);
    }
    get sectorArea() {
        return Math.PI * this.radius ** 2 * (this.angle.radians / (Math.PI * 2));
    }
    get startPoint() {
        return new Vector_1.default(this.startAngle, this.radius).toLine(this.origin).end;
    }
    get endPoint() {
        return new Vector_1.default(this.endAngle, this.radius).toLine(this.origin).end;
    }
    clone() {
        return new Arc(this.origin, this.startAngle, this.endAngle, this.radius);
    }
    match(arc, tolerance = 0) {
        return (this.origin.match(arc.origin, tolerance) &&
            this.startAngle.match(arc.startAngle, tolerance) &&
            this.endAngle.match(arc.endAngle, tolerance) &&
            (0, util_1.matchNumber)(this.radius, arc.radius, tolerance));
    }
    toObject() {
        return { angle: this.angle.toObject(), radius: this.radius };
    }
    toString() {
        return "";
    }
    constructor(origin, startAngle, endAngle, radius) {
        super("arc");
        this.origin = origin;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.radius = radius;
    }
    static fromPoint(point, startAngle, endAngle, radius) {
        return null;
    }
}
exports.default = Arc;
