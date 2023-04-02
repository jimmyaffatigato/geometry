"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Geometry_1 = __importDefault(require("./Geometry"));
const Line_1 = __importDefault(require("./Line"));
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
    toArray() {
        return this.points.map((point) => {
            return [point.x, point.y];
        });
    }
    clone() {
        return new Path(this.points.slice());
    }
    match(path) {
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
    constructor(points) {
        super("path");
        this.points = points.slice();
    }
}
exports.default = Path;
