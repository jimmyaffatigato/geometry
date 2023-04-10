import Angle, { AngleProps } from "./Angle";
import Geometry from "./Geometry";
import Line from "./Line";
import Point from "./Point";
export interface VectorProps {
    direction: AngleProps;
    magnitude?: number;
}
/**
 * An instance of `Vector` contains `direction` and `magnitude` properties as well as various methods for working with vectors.
 */
declare class Vector extends Geometry<Vector, VectorProps> {
    readonly direction: Angle;
    readonly magnitude: number;
    scale(factor: number): Vector;
    setDirection(direction: Angle): Vector;
    setMagnitude(magnitude: number): Vector;
    /**
     * Rotates the Vector by radians
     */
    rotate(radians: number | Angle): Vector;
    /**
     * Rotates the Vector by the given Angle
     */
    rotate(angle: Angle): Vector;
    rotate(a: number | Angle): Vector;
    /**
     * Rotates the Vector by degrees
     */
    rotateByDegrees(degrees: number): Vector;
    clone(): Vector;
    match(vector: Vector, tolerance?: number): boolean;
    toPoint(): Point;
    toLine(origin?: Point): Line;
    toObject(): VectorProps;
    toString(digits?: number): string;
    constructor(direction: Angle, magnitude?: number);
    constructor(direction: AngleProps, magnitude?: number);
    constructor(direction: number, magnitude?: number);
    constructor(direction: VectorProps);
    constructor(a: Angle | number | VectorProps | AngleProps, b?: number);
    static get zero(): Vector;
    static random(): Vector;
    static isProps(obj: any): obj is VectorProps;
}
export default Vector;
