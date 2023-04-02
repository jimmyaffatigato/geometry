import Geometry from "./Geometry";
import Line from "./Line";
import Point, { PointProps } from "./Point";
export interface PathProps {
    points: readonly PointProps[];
}
declare class Path extends Geometry<Path, PathProps> {
    points: readonly Point[];
    get segments(): readonly Line[];
    get length(): number;
    toArray(): [number, number][];
    clone(): Path;
    match(path: Path): boolean;
    toObject(): PathProps;
    toString(): string;
    constructor(points: Point[]);
}
export default Path;
