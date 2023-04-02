import Geometry from "./Geometry";
import Grid from "./Grid";

export interface RowProps {
    values: readonly number[];
}

class Row extends Geometry<Row, RowProps> {
    readonly values: readonly number[];

    get length(): number {
        return this.values.length;
    }

    valueAt(index: number): number {
        return this.values[index];
    }

    clone(): Row {
        return new Row(this.values.slice());
    }

    match(row: Row): boolean {
        return false;
    }

    toArray(): number[] {
        return this.values.slice();
    }

    toGrid(): Grid {
        return new Grid([this]);
    }

    toObject(): RowProps {
        return { values: this.values.slice() };
    }

    toString(): string {
        return this.values.map((value) => `[${value.toString().padEnd(3, " ")}]`).join("");
    }

    constructor(values: number[]) {
        super("row");
        this.values = values;
    }

    static zero(length: number): Row {
        let array = [];
        for (let i = 0; i < length; i++) {
            array.push(0);
        }
        return new Row(array);
    }
}

export default Row;
