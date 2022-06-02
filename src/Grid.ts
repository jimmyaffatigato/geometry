import { Geometry, Size } from "./Geometry.js";
import Point from "./Point.js";
import Row from "./Row.js";

export const arrayOf = <T>(length: number, f: (i: number) => T): T[] => {
    const r: T[] = [];
    for (let i = 0; i < length; i++) {
        r.push(f(i));
    }
    return r;
};

class Grid implements Geometry<Grid>, Size {
    public readonly type = "grid";
    public readonly rows: Row[];
    public readonly width: number;
    public readonly height: number;

    public get area(): number {
        return this.width * this.height;
    }

    public get size(): Point {
        return new Point(this.width, this.height);
    }

    constructor(rows: Row[]) {
        this.rows = rows;
        this.width = rows[0].length;
        this.height = rows.length;
    }

    public clone(): Grid {
        return new Grid(this.rows.map((row) => row.clone()));
    }

    public valueAt(point: Point): number {
        if (point.y >= 0 && point.y < this.rows.length) {
            return this.rows[point.y].valueAt(point.x);
        }
        return null;
    }

    public rowAt(index: number): Row {
        if (index >= 0 && index < this.rows.length) {
            return this.rows[index];
        }
        return Row.zero(this.width);
    }

    public mapRows(f: (row: Row, i: number) => Row): Grid {
        const rows = this.rows.map(f);
        return new Grid(rows);
    }

    public shiftLeft(distance: number): Grid {
        return new Grid(this.rows.map((row) => row.shiftLeft(distance)));
    }

    public shiftRight(distance: number): Grid {
        return new Grid(this.rows.map((row) => row.shiftRight(distance)));
    }

    public shiftUp(distance: number): Grid {
        const rows = this.rows.slice(distance);
        return new Grid(rows.concat(arrayOf(this.height - rows.length, () => Row.zero(this.width))));
    }

    public shiftDown(distance: number): Grid {
        const rows = this.rows.slice(0, -distance);
        return new Grid(arrayOf(this.height - rows.length, () => Row.zero(this.width)).concat(rows));
    }

    public stretch(factor: Point): Grid {
        const rows: Row[] = [];
        for (let i = 0; i < this.rows.length; i++) {
            for (let ii = 0; ii < factor.y; ii++) {
                rows.push(this.rowAt(i).stretch(factor.x));
            }
        }
        return new Grid(rows);
    }

    public sum(grid: Grid, offset: Point = Point.zero): Grid {
        const shifted = grid.shiftDown(offset.y).shiftRight(offset.x);
        return new Grid(this.rows.map((row, i) => row.sum(shifted.rowAt(i))));
    }

    public toString(): string {
        return this.rows.map((row) => `${row.toString()}`).join("\n");
    }
}

export default Grid;
