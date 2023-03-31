import Geometry from "./Geometry";
import Grid from "./Grid";

class Row extends Geometry<Row> {
    readonly values: readonly number[];

    get length(): number {
        return this.values.length;
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

    valueAt(index: number): number {
        return this.values[index];
    }

    clone(): Row {
        return new Row(this.values.slice());
    }

    match(row: Row): boolean {
        return false;
    }

    toString(): string {
        return this.values.map((value) => `[${value.toString().padEnd(3, " ")}]`).join("");
    }

    toArray(): number[] {
        return this.values.slice();
    }

    toGrid(): Grid {
        return new Grid([this]);
    }
}

export default Row;
