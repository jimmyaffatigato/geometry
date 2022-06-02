import { Geometry, Angle } from "./Geometry.js";
import Line from "./Line.js";
import Point from "./Point.js";
declare class Vector implements Geometry<Vector>, Angle<Vector> {
    readonly type = "vector";
    readonly angle: number;
    readonly magnitude: number;
    get degrees(): number;
    /**
     * Creates a Vector from an angle in radians and a magnitude.
     */
    constructor(angle: number, magnitude?: number);
    /**
     * Creates a Vector from an angle in degrees and a magnitude.
     */
    static degrees(degrees: number, magnitude: number): Vector;
    static get zero(): Vector;
    clone(): Vector;
    setAngle(angle: number): Vector;
    setMagnitude(magnitude: number): Vector;
    /**
     * Rotates the Vector by radians
     */
    rotate(rad: number): Vector;
    /**
     * Rotates the Vector by degrees
     */
    rotateByDegree(degree: number): Vector;
    scale(factor: number): Vector;
    toString(digits?: number): string;
    toPoint(): Point;
    toLine(origin?: Point): Line;
}
export default Vector;
