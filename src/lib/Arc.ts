import Angle, { AngleProps } from "./Angle";
import Geometry from "./Geometry";

export interface ArcProps {
    angle: AngleProps;
    radius: number;
}

class Arc extends Geometry<Arc, ArcProps> {
    angle: Angle;
    radius: number;

    get arcLength(): number {
        return this.angle.radians * this.radius;
    }

    get chordLength(): number {
        return NaN;
    }

    get sectorArea(): number {
        return 0;
    }

    constructor(angle: Angle, radius: number) {
        super("arc");
        this.angle = angle;
        this.radius = radius;
    }

    clone(): Arc {
        return new Arc(new Angle(0), 0);
    }

    match(): boolean {
        return false;
    }

    toObject(): ArcProps {
        return { angle: this.angle.toObject(), radius: this.radius };
    }

    toString(): string {
        return "";
    }
}

export default Arc;
