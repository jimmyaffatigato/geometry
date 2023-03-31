import Angle, { AngleProps } from "./Angle";
import Geometry, { RESOLUTION } from "./Geometry";
import Line from "./Line";
import Point from "./Point";

export interface VectorProps {
    type: "vector";
    direction: AngleProps;
    magnitude: number;
}

class Vector extends Geometry<Vector> {
    readonly direction: Angle;
    readonly magnitude: number;

    scale(factor: number): Vector {
        return new Vector(this.direction, this.magnitude * factor);
    }

    setDirection(direction: Angle): Vector {
        return new Vector(direction, this.magnitude);
    }

    setMagnitude(magnitude: number): Vector {
        return new Vector(this.direction, magnitude);
    }

    /**
     * Rotates the Vector by radians
     */
    rotate(radians: number): Vector {
        return new Vector(this.direction.rotate(radians), this.magnitude);
    }

    /**
     * Rotates the Vector by degrees
     */
    rotateByDegrees(degrees: number): Vector {
        return this.rotate((Math.PI / 180) * degrees);
    }

    clone(): Vector {
        return new Vector(this.direction, this.magnitude);
    }

    match(vector: Vector): boolean {
        return vector.direction == this.direction && vector.magnitude == this.magnitude;
    }

    toPoint(): Point {
        return new Point(
            Math.cos(this.direction.radians) * this.magnitude,
            Math.sin(this.direction.radians) * this.magnitude
        );
    }

    toLine(origin: Point = Point.zero): Line {
        return new Line(Point.zero, this.toPoint()).translate(origin);
    }

    toObject(): VectorProps {
        return { type: "vector", direction: this.direction.toObject(), magnitude: this.magnitude };
    }

    toString(digits: number = 2): string {
        return `${this.direction.degrees.toFixed(digits)}° x ${this.magnitude.toFixed(digits)}`;
    }

    constructor(angle: Angle, magnitude: number = 0) {
        super("vector");
        this.direction = angle;
        this.magnitude = magnitude;
    }

    static fromObject(obj: VectorProps): Vector {
        return new Vector(Angle.fromObject(obj.direction), obj.magnitude);
    }

    static get zero(): Vector {
        return new Vector(new Angle(0));
    }
}

export default Vector;
