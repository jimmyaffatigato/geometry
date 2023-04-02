import Geometry from "./Geometry";
import Grid from "./Grid";
export interface RowProps {
    values: readonly number[];
}
declare class Row extends Geometry<Row, RowProps> {
    readonly values: readonly number[];
    get length(): number;
    valueAt(index: number): number;
    clone(): Row;
    match(row: Row): boolean;
    toArray(): number[];
    toGrid(): Grid;
    toObject(): RowProps;
    toString(): string;
    constructor(values: number[]);
    static zero(length: number): Row;
}
export default Row;
