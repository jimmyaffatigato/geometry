import Point from "./Point.js";
import Row from "./Row.js";
export const arrayOf = (length, f) => {
    const r = [];
    for (let i = 0; i < length; i++) {
        r.push(f(i));
    }
    return r;
};
class Grid {
    constructor(rows) {
        this.type = "grid";
        this.rows = rows;
        this.width = rows[0].length;
        this.height = rows.length;
    }
    get area() {
        return this.width * this.height;
    }
    get size() {
        return new Point(this.width, this.height);
    }
    clone() {
        return new Grid(this.rows.map((row) => row.clone()));
    }
    valueAt(point) {
        if (point.y >= 0 && point.y < this.rows.length) {
            return this.rows[point.y].valueAt(point.x);
        }
        return null;
    }
    rowAt(index) {
        if (index >= 0 && index < this.rows.length) {
            return this.rows[index];
        }
        return Row.zero(this.width);
    }
    mapRows(f) {
        const rows = this.rows.map(f);
        return new Grid(rows);
    }
    shiftLeft(distance) {
        return new Grid(this.rows.map((row) => row.shiftLeft(distance)));
    }
    shiftRight(distance) {
        return new Grid(this.rows.map((row) => row.shiftRight(distance)));
    }
    shiftUp(distance) {
        const rows = this.rows.slice(distance);
        return new Grid(rows.concat(arrayOf(this.height - rows.length, () => Row.zero(this.width))));
    }
    shiftDown(distance) {
        const rows = this.rows.slice(0, -distance);
        return new Grid(arrayOf(this.height - rows.length, () => Row.zero(this.width)).concat(rows));
    }
    stretch(factor) {
        const rows = [];
        for (let i = 0; i < this.rows.length; i++) {
            for (let ii = 0; ii < factor.y; ii++) {
                rows.push(this.rowAt(i).stretch(factor.x));
            }
        }
        return new Grid(rows);
    }
    sum(grid, offset = Point.zero) {
        const shifted = grid.shiftDown(offset.y).shiftRight(offset.x);
        return new Grid(this.rows.map((row, i) => row.sum(shifted.rowAt(i))));
    }
    toString() {
        return this.rows.map((row) => `${row.toString()}`).join("\n");
    }
}
export default Grid;
//# sourceMappingURL=Grid.js.map