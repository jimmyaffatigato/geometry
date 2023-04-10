import Geometry from "./Geometry";
import Vector from "./Vector";
export interface AngleProps {
    radians: number;
}
/**
 * The Angle class contains a radians property and various helper functions for working with angles.
 */
declare class Angle extends Geometry<Angle, AngleProps> {
    readonly radians: number;
    get degrees(): number;
    get complement(): Angle;
    get supplement(): Angle;
    /**
     * Rotate by radians.
     * @param {number} radians
     * @returns {Angle}
     */
    rotate(radians: number): Angle;
    /**
     * Rotate by degrees.
     * @param degrees
     * @returns
     */
    rotateByDegrees(degrees: number): Angle;
    add(angle: Angle): Angle;
    difference(angle: Angle): Angle;
    multiply(factor: number): Angle;
    absolute(): Angle;
    negate(): Angle;
    match(angle: Angle, tolerance?: number): boolean;
    /**
     * Returns a new Angle instance with the same properties
     */
    clone(): Angle;
    /**
     *
     */
    toVector(magnitude?: number): Vector;
    toObject(): AngleProps;
    /**
     *
     */
    toString(): string;
    /**
     * Creates an Angle from radians
     */
    constructor(radians: number);
    constructor(props: AngleProps);
    static get zero(): Angle;
    /**
     * Creates an Angle from degrees
     */
    static fromDegrees(degrees: number): Angle;
    /**
     * Creates a random Angle
     */
    static random(): Angle;
    static isProps(obj: any): obj is AngleProps;
}
export default Angle;
