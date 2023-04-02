import Geometry from "./Geometry";
import Point from "./Point";
import Row, { RowProps } from "./Row";
export interface GridProps {
    rows: RowProps[];
    width: number;
    height: number;
}
declare class Grid extends Geometry<Grid, GridProps> {
    readonly rows: readonly Row[];
    readonly width: number;
    readonly height: number;
    get size(): Point;
    addRow(row: Row): Grid;
    insertRow(row: Row, index: number): Grid;
    deleteRow(row: Row): Grid;
    deleteRow(index: number): Grid;
    clone(): Grid;
    match(grid: Grid): boolean;
    toObject(): GridProps;
    toString(): string;
    constructor(rows: Row[]);
}
export default Grid;
