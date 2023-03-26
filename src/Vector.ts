import Angle from "./Angle.js";
import { Geometry } from "./Geometry.js";
import Line from "./Line.js";
import Point from "./Point.js";

class Vector implements Geometry<Vector> {
    public readonly angle: Angle;
    public readonly magnitude: number;

    public setMagnitude(magnitude: number): Vector {
        return new Vector(this.angle, magnitude);
    }

    public scale(factor: number): Vector {
        return new Vector(this.angle, this.magnitude * factor);
    }

    public setAngle(angle: Angle): Vector {
        return new Vector(angle, this.magnitude);
    }

    /**
     * Rotates the Vector by radians
     */
    public rotate(radians: number): Vector {
        return new Vector(this.angle.rotate(radians), this.magnitude);
    }

    /**
     * Rotates the Vector by degrees
     */
    public rotateByDegrees(degrees: number): Vector {
        return this.rotate((Math.PI / 180) * degrees);
    }

    // Format

    public toPoint(): Point {
        return new Point(Math.cos(this.angle.radians) * this.magnitude, Math.sin(this.angle.radians) * this.magnitude);
    }

    public toLine(origin: Point = Point.zero): Line {
        return new Line(Point.zero, this.toPoint()).translate(origin);
    }

    // Geometry
    public readonly type = "vector";

    public clone(): Vector {
        return new Vector(this.angle, this.magnitude);
    }

    public match(vector: Vector): boolean {
        return vector.angle == this.angle && vector.magnitude == this.magnitude;
    }

    public floor(): Vector {
        return new Vector(this.angle, Math.floor(this.magnitude));
    }

    public absolute(): Vector {
        return new Vector(this.angle.absolute(), Math.abs(this.magnitude));
    }

    public toString(digits: number = 2): string {
        return `${this.angle.degrees.toFixed(digits)}° x ${this.magnitude.toFixed(digits)}`;
    }

    constructor(angle: Angle, magnitude: number = 0) {
        this.angle = angle;
        this.magnitude = magnitude;
    }

    public static get zero(): Vector {
        return new Vector(new Angle(0));
    }
}

export default Vector;
