"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Geometry_1 = __importDefault(require("./Geometry"));
const Line_1 = __importDefault(require("./Line"));
const Point_1 = __importDefault(require("./Point"));
class Path extends Geometry_1.default {
    points;
    get segments() {
        let arr = [];
        for (let i = 0; i < this.points.length - 1; i++) {
            const origin = this.points[i];
            const end = this.points[i + 1];
            arr.push(new Line_1.default(origin, end));
        }
        return arr;
    }
    get length() {
        let total = 0;
        this.segments.forEach((line) => {
            total += line.length;
        });
        return total;
    }
    addPoint(point) {
        return new Path(this.points.concat(point));
    }
    toArray() {
        return this.points.map((point) => {
            return [point.x, point.y];
        });
    }
    clone() {
        return new Path(this.points.slice());
    }
    match(path) {
        if (this === path)
            return true;
        if (this.points.length == path.length) {
            for (let i = 0; i < this.points.length; i++) {
                if (this.points[i] != path.points[i]) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
    toObject() {
        return { points: this.points.map((point) => point.toObject()) };
    }
    toString() {
        return `[${this.points
            .map((point) => {
            return `[${point.x}, ${point.y}]`;
        })
            .join(", ")}]`;
    }
    constructor(a) {
        super("path");
        if (Array.isArray(a)) {
            this.points = a.map((i) => {
                if (i instanceof Point_1.default) {
                    return i;
                }
                else if (Array.isArray(i)) {
                    return new Point_1.default(i);
                }
            });
        }
    }
}
exports.default = Path;
