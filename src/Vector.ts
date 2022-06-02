import { Geometry, Angle } from "./Geometry.js";
import Line from "./Line.js";
import Point from "./Point.js";

class Vector implements Geometry<Vector>, Angle<Vector> {
    public readonly type = "vector";
    public readonly angle: number;
    public readonly magnitude: number;

    public get degrees(): number {
        return this.angle / (Math.PI / 180);
    }

    /**
     * Creates a Vector from an angle in radians and a magnitude.
     */
    constructor(angle: number, magnitude: number = 0) {
        this.type = "vector";
        this.angle = angle;
        this.magnitude = magnitude;
    }

    /**
     * Creates a Vector from an angle in degrees and a magnitude.
     */
    public static degrees(degrees: number, magnitude: number): Vector {
        return new Vector(degrees * (Math.PI / 180), magnitude);
    }

    public static get zero(): Vector {
        return new Vector(0);
    }

    public clone(): Vector {
        return new Vector(this.angle, this.magnitude);
    }

    public setAngle(angle: number): Vector {
        return new Vector(angle, this.magnitude);
    }

    public setMagnitude(magnitude: number): Vector {
        return new Vector(this.angle, magnitude);
    }

    /**
     * Rotates the Vector by radians
     */
    public rotate(rad: number): Vector {
        return new Vector(this.angle + rad, this.magnitude);
    }

    /**
     * Rotates the Vector by degrees
     */
    public rotateByDegree(degree: number): Vector {
        return this.rotate((Math.PI / 180) * degree);
    }

    public scale(factor: number): Vector {
        return new Vector(this.angle, this.magnitude * factor);
    }

    public toString(digits: number = 2): string {
        return `${this.degrees.toFixed(digits)}° x ${this.magnitude.toFixed(digits)}`;
    }

    public toPoint(): Point {
        return new Point(Math.cos(this.angle) * this.magnitude, Math.sin(this.angle) * this.magnitude);
    }

    public toLine(origin: Point = Point.zero): Line {
        return new Line(Point.zero, this.toPoint()).translate(origin);
    }
}

export default Vector;
