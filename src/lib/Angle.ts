import Geometry from "./Geometry";
import Vector from "./Vector";
import { clampToRadians, degreesToRadians, matchNumber, radiansToDegrees, randomRadians } from "./util";

export interface AngleProps {
    radians: number;
}

/**
 * The Angle class contains a radians property and various helper functions for working with angles.
 */
class Angle extends Geometry<Angle, AngleProps> {
    readonly radians: number;

    get degrees(): number {
        return radiansToDegrees(this.radians);
    }

    get complement(): Angle {
        return new Angle(Math.PI / 2).difference(this);
    }

    get supplement(): Angle {
        return new Angle(Math.PI).difference(this);
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

    add(angle: Angle): Angle {
        return new Angle(this.radians + angle.radians);
    }

    difference(angle: Angle): Angle {
        return new Angle(this.radians - angle.radians);
    }

    multiply(factor: number): Angle {
        return new Angle(this.radians * factor);
    }

    absolute(): Angle {
        return new Angle(Math.abs(this.radians));
    }

    negate(): Angle {
        return new Angle(-this.radians);
    }

    match(angle: Angle, tolerance: number = 0): boolean {
        return matchNumber(this.radians, angle.radians, tolerance);
    }

    /**
     * Returns a new Angle instance with the same properties
     */
    clone(): Angle {
        return new Angle(this);
    }

    /**
     *
     */
    toVector(magnitude?: number): Vector {
        return new Vector(this, magnitude);
    }

    toObject(): AngleProps {
        return { radians: this.radians };
    }

    /**
     *
     */
    toString(): string {
        return `${this.degrees.toFixed(1)}° (${this.radians.toFixed(1)})`;
    }

    /**
     * Creates an Angle from radians
     */
    constructor(radians: number);
    constructor(props: AngleProps);
    constructor(a: number | AngleProps) {
        super("angle");
        let radians: number;
        if (typeof a == "number") {
            radians = a;
        } else if (Angle.isProps(a)) {
            radians = a.radians;
        }
        this.radians = clampToRadians(radians);
    }

    static get zero(): Angle {
        return new Angle(0);
    }

    /**
     * Creates an Angle from degrees
     */
    static fromDegrees(degrees: number): Angle {
        return new Angle(degreesToRadians(degrees));
    }

    /**
     * Creates a random Angle
     */
    static random(): Angle {
        return new Angle(randomRadians());
    }

    static isProps(obj: any): obj is AngleProps {
        return typeof obj == "object" && obj.hasOwnProperty("radians") && typeof obj.radians == "number";
    }
}

export default Angle;
