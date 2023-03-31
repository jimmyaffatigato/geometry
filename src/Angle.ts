import Geometry from "./Geometry";
import Vector from "./Vector";
import { degreesToRadians, radiansToDegrees } from "./util";

export interface AngleProps {
    type: "angle";
    radians: number;
}

/**
 * The Angle class contains a radians property and various helper functions for working with angles.
 */
class Angle extends Geometry<Angle> {
    radians: number;

    get degrees(): number {
        return radiansToDegrees(this.radians);
    }

    /**
     * Rotate by radians.
     * @param {number} radians
     * @returns {Angle}
     */
    rotate(radians: number): Angle {
        return new Angle(this.radians + radians);
    }

    /**
     * Rotate by degrees.
     * @param degrees
     * @returns
     */
    rotateByDegrees(degrees: number): Angle {
        return this.rotate(degreesToRadians(degrees));
    }

    multiply(factor: number): Angle {
        return new Angle(this.radians * factor);
    }

    match(angle: Angle): boolean {
        return this.radians == angle.radians;
    }

    /**
     * Returns a new Angle instance with the same properties
     */
    clone(): Angle {
        return new Angle(this.radians);
    }

    /**
     *
     */
    toVector(magnitude?: number): Vector {
        return new Vector(this, magnitude);
    }

    toObject(): AngleProps {
        return { type: "angle", radians: this.radians };
    }

    /**
     *
     */
    toString(): string {
        return `${this.degrees}° (${this.radians})`;
    }

    /**
     * Creates an Angle from radians
     */
    constructor(radians: number) {
        super("angle");
        this.radians = radians;
    }

    /**
     * Creates an Angle from degrees
     */
    static fromDegrees(degrees: number): Angle {
        return new Angle(degreesToRadians(degrees));
    }

    static fromObject(obj: AngleProps): Angle {
        return new Angle(obj.radians);
    }

    /**
     * Creates a random Angle
     */
    static random(): Angle {
        return new Angle(Math.random() * Math.PI * 2);
    }
}

export default Angle;
