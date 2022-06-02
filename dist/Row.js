import { arrayOf } from "./Grid.js";
import Grid from "./Grid.js";
class Row {
    constructor(values) {
        this.type = "row";
        this.values = values;
    }
    get length() {
        return this.values.length;
    }
    static of(length, f) {
        const a = [];
        for (let i = 0; i < length; i++) {
            a.push(f(i));
        }
        return new Row(a);
    }
    static zero(length) {
        return Row.of(length, () => 0);
    }
    valueAt(index) {
        return this.values[index];
    }
    reverse() {
        return new Row(this.values.reverse());
    }
    map(f) {
        return new Row(this.values.map(f));
    }
    shiftRight(distance) {
        if (distance > 0) {
            const cells = this.values.slice(0, -distance);
            return new Row(arrayOf(this.length - cells.length, () => 0).concat(cells));
        }
        if (distance < 0) {
            return this.shiftLeft(-distance);
        }
        if (distance == 0) {
            return this.clone();
        }
    }
    shiftLeft(distance) {
        if (distance > 0) {
            const cells = this.values.slice(distance);
            return new Row(cells.concat(arrayOf(this.length - cells.length, () => 0)));
        }
        if (distance < 0) {
            return this.shiftRight(-distance);
        }
        if (distance == 0) {
            return this.clone();
        }
    }
    stretch(factor) {
        const r = [];
        for (let i = 0; i < this.length; i++) {
            for (let ii = 0; ii < factor; ii++) {
                r.push(this.valueAt(i));
            }
        }
        return new Row(r);
    }
    clone() {
        return new Row(this.values);
    }
    sum(row, offset = 0) {
        const sums = this.values.map((value, i) => value + row.shiftRight(offset).valueAt(i));
        return new Row(sums);
    }
    toString() {
        return this.values.map((value) => `[${value.toString().padEnd(3, " ")}]`).join("");
    }
    toArray() {
        return this.values.slice(0);
    }
    toGrid() {
        return new Grid([this]);
    }
}
export default Row;
//# sourceMappingURL=Row.js.map