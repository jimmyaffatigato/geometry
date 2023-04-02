"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Geometry_1 = __importDefault(require("./Geometry"));
const Grid_1 = __importDefault(require("./Grid"));
class Row extends Geometry_1.default {
    values;
    get length() {
        return this.values.length;
    }
    valueAt(index) {
        return this.values[index];
    }
    clone() {
        return new Row(this.values.slice());
    }
    match(row) {
        return false;
    }
    toArray() {
        return this.values.slice();
    }
    toGrid() {
        return new Grid_1.default([this]);
    }
    toObject() {
        return { values: this.values.slice() };
    }
    toString() {
        return this.values.map((value) => `[${value.toString().padEnd(3, " ")}]`).join("");
    }
    constructor(values) {
        super("row");
        this.values = values;
    }
    static zero(length) {
        let array = [];
        for (let i = 0; i < length; i++) {
            array.push(0);
        }
        return new Row(array);
    }
}
exports.default = Row;
