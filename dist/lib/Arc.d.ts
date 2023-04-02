import Angle, { AngleProps } from "./Angle";
import Geometry from "./Geometry";
export interface ArcProps {
    angle: AngleProps;
    radius: number;
}
declare class Arc extends Geometry<Arc, ArcProps> {
    angle: Angle;
    radius: number;
    get arcLength(): number;
    get chordLength(): number;
    get sectorArea(): number;
    constructor(angle: Angle, radius: number);
    clone(): Arc;
    match(): boolean;
    toObject(): ArcProps;
    toString(): string;
}
export default Arc;
