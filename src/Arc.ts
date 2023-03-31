import Angle from "./Angle";
import Geometry from "./Geometry";

class Arc extends Geometry<Arc> {
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

    toString(): string {
        return "";
    }
}

export default Arc;
