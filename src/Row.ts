import { Geometry } from "./Geometry";
import Grid, { arrayOf } from "./Grid";

class Row implements Geometry<Row> {
    public readonly type = "row";
    public readonly values: number[];

    public get length(): number {
        return this.values.length;
    }

    constructor(values: number[]) {
        this.values = values;
    }

    public static of(length: number, f: (i: number) => number): Row {
        const a: number[] = [];
        for (let i = 0; i < length; i++) {
            a.push(f(i));
        }
        return new Row(a);
    }

    public static zero(length: number): Row {
        return Row.of(length, () => 0);
    }

    public valueAt(index: number): number {
        return this.values[index];
    }

    public reverse(): Row {
        return new Row(this.values.reverse());
    }

    public map(f: (value: number, i: number) => number): Row {
        return new Row(this.values.map(f));
    }

    public shiftRight(distance: number): Row {
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

    public shiftLeft(distance: number): Row {
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

    public stretch(factor: number): Row {
        const r: number[] = [];
        for (let i = 0; i < this.length; i++) {
            for (let ii = 0; ii < factor; ii++) {
                r.push(this.valueAt(i));
            }
        }
        return new Row(r);
    }

    public clone(): Row {
        return new Row(this.values);
    }

    public sum(row: Row, offset: number = 0): Row {
        const sums = this.values.map((value, i) => value + row.shiftRight(offset).valueAt(i));
        return new Row(sums);
    }

    public toString(): string {
        return this.values.map((value) => `[${value.toString().padEnd(3, " ")}]`).join("");
    }

    public toArray(): number[] {
        return this.values.slice(0);
    }

    public toGrid(): Grid {
        return new Grid([this]);
    }
}

export default Row;
