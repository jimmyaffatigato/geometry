import { Geometry } from "./Geometry";
import Vector from "./Vector";

class Angle implements Geometry<Angle> {
    radians: number;

    public get degrees(): number {
        return this.radians / (Math.PI / 180);
    }

    public rotate(radians: number): Angle {
        return new Angle(this.radians + radians);
    }

    public rotateByDegrees(degrees: number): Angle {
        return this.rotate((Math.PI / 180) * degrees);
    }

    public toVector(magnitude?: number): Vector {
        return new Vector(this, magnitude);
    }

    // Geometry
    public readonly type = "angle";

    public clone(): Angle {
        return new Angle(this.radians);
    }

    public match(angle: Angle): boolean {
        return this.radians == angle.radians;
    }

    public floor(): Angle {
        return new Angle(Math.floor(this.radians));
    }

    public absolute(): Angle {
        return new Angle(Math.abs(this.radians));
    }

    public toString(): string {
        return `${this.degrees}° (${this.radians})`;
    }

    constructor(radians: number) {
        this.radians = radians;
    }

    /**
     * Creates an Angle from an angle in degrees and a magnitude.
     */
    public static degrees(degrees: number): Angle {
        return new Angle(degrees * (Math.PI / 180));
    }

    public static random(): Angle {
        return new Angle(Math.random() * Math.PI * 2);
    }
}

export default Angle;
