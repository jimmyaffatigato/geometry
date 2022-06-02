import { Geometry, Size } from "./Geometry.js";
import Point from "./Point.js";
import Row from "./Row.js";
export declare const arrayOf: <T>(length: number, f: (i: number) => T) => T[];
declare class Grid implements Geometry<Grid>, Size {
    readonly type = "grid";
    readonly rows: Row[];
    readonly width: number;
    readonly height: number;
    get area(): number;
    get size(): Point;
    constructor(rows: Row[]);
    clone(): Grid;
    valueAt(point: Point): number;
    rowAt(index: number): Row;
    mapRows(f: (row: Row, i: number) => Row): Grid;
    shiftLeft(distance: number): Grid;
    shiftRight(distance: number): Grid;
    shiftUp(distance: number): Grid;
    shiftDown(distance: number): Grid;
    stretch(factor: Point): Grid;
    sum(grid: Grid, offset?: Point): Grid;
    toString(): string;
}
export default Grid;
