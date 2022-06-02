import { Geometry } from "./Geometry.js";
import Grid from "./Grid.js";
declare class Row implements Geometry<Row> {
    readonly type = "row";
    readonly values: number[];
    get length(): number;
    constructor(values: number[]);
    static of(length: number, f: (i: number) => number): Row;
    static zero(length: number): Row;
    valueAt(index: number): number;
    reverse(): Row;
    map(f: (value: number, i: number) => number): Row;
    shiftRight(distance: number): Row;
    shiftLeft(distance: number): Row;
    stretch(factor: number): Row;
    clone(): Row;
    sum(row: Row, offset?: number): Row;
    toString(): string;
    toArray(): number[];
    toGrid(): Grid;
}
export default Row;
