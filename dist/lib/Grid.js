"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Geometry_1 = __importDefault(require("./Geometry"));
const Point_1 = __importDefault(require("./Point"));
class Grid extends Geometry_1.default {
    rows;
    width;
    height;
    get size() {
        return new Point_1.default(this.width, this.height);
    }
    addRow(row) {
        const grid = new Grid(this.rows.concat(row));
        return grid;
    }
    insertRow(row, index) {
        const before = this.rows.slice(0, index);
        const after = this.rows.slice(index);
        return new Grid(before.concat(row).concat(after));
    }
    deleteRow(a) {
        if (typeof a == "number") {
            return new Grid(this.rows.filter((r, i) => {
                i != a;
            }));
        }
        else {
            return new Grid(this.rows.filter((r) => {
                r !== a;
            }));
        }
    }
    clone() {
        return new Grid(this.rows.map((row) => row.clone()));
    }
    match(grid) {
        return false;
    }
    toObject() {
        return { rows: this.rows.map((row) => row.toObject()), width: this.width, height: this.height };
    }
    toString() {
        return this.rows.map((row) => `${row.toString()}`).join("\n");
    }
    constructor(rows) {
        super("grid");
        this.rows = rows;
        this.width = rows[0].length;
        this.height = rows.length;
    }
}
exports.default = Grid;
