import Angle, { AngleProps } from "./Angle";
import Geometry from "./Geometry";
import Line from "./Line";
import Point from "./Point";
export interface ArcProps {
    angle: AngleProps;
    radius: number;
}
declare class Arc extends Geometry<Arc, ArcProps> {
    origin: Point;
    startAngle: Angle;
    endAngle: Angle;
    radius: number;
    get angle(): Angle;
    get arcLength(): number;
    get chord(): Line;
    get sectorArea(): number;
    get startPoint(): Point;
    get endPoint(): Point;
    clone(): Arc;
    match(arc: Arc, tolerance?: number): boolean;
    toObject(): ArcProps;
    toString(): string;
    constructor(origin: Point, startAngle: Angle, endAngle: Angle, radius: number);
    static fromPoint(point: Point, startAngle: Angle, endAngle: Angle, radius: number): Arc;
}
export default Arc;
