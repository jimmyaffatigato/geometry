import Geometry from "./Geometry";
import Point from "./Point";
import Row from "./Row";

class Grid implements Geometry<Grid> {
    readonly type = "grid";
    readonly rows: Row[];
    readonly width: number;
    readonly height: number;

    get size(): Point {
        return new Point(this.width, this.height);
    }

    addRow(row: Row): Grid {
        const grid = new Grid(this.rows.concat(row));
        return grid;
    }

    insertRow(row: Row, index: number): Grid {
        const before = this.rows.slice(0, index);
        const after = this.rows.slice(index);
        return new Grid(before.concat(row).concat(after));
    }

    deleteRow(row: Row): Grid;
    deleteRow(index: number): Grid;
    deleteRow(a: Row | number): Grid {
        if (typeof a == "number") {
            return new Grid(
                this.rows.filter((r, i) => {
                    i != a;
                })
            );
        } else {
            return new Grid(
                this.rows.filter((r) => {
                    r !== a;
                })
            );
        }
    }

    clone(): Grid {
        return new Grid(this.rows.map((row) => row.clone()));
    }

    match(grid: Grid): boolean {
        return false;
    }

    toString(): string {
        return this.rows.map((row) => `${row.toString()}`).join("\n");
    }

    constructor(rows: Row[]) {
        this.rows = rows;
        this.width = rows[0].length;
        this.height = rows.length;
    }
}

export default Grid;
