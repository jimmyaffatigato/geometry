import Angle, { AngleProps } from "./Angle";
import Geometry from "./Geometry";
import Line from "./Line";
import Point from "./Point";
import { random } from "./util";

export interface VectorProps {
    direction: AngleProps;
    magnitude?: number;
}

/**
 * An instance of `Vector` contains `direction` and `magnitude` properties as well as various methods for working with vectors.
 */
class Vector extends Geometry<Vector, VectorProps> {
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
    rotate(radians: number | Angle): Vector;
    /**
     * Rotates the Vector by the given Angle
     */
    rotate(angle: Angle): Vector;
    rotate(a: number | Angle): Vector;
    rotate(a: number | Angle): Vector {
        return new Vector(this.direction.rotate(typeof a == "number" ? a : a.radians), this.magnitude);
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
            -Math.sin(this.direction.radians) * this.magnitude
        );
    }

    toLine(origin: Point = Point.zero): Line {
        return new Line(Point.zero, this.toPoint()).translate(origin);
    }

    toObject(): VectorProps {
        return { direction: this.direction.toObject(), magnitude: this.magnitude };
    }

    toString(digits: number = 2): string {
        return `${this.direction.degrees.toFixed(digits)}° x ${this.magnitude.toFixed(digits)}`;
    }

    constructor(direction: Angle, magnitude?: number);
    constructor(direction: AngleProps, magnitude?: number);
    constructor(direction: number, magnitude?: number);
    constructor(direction: VectorProps);
    constructor(a: Angle | number | VectorProps | AngleProps, b: number = 0) {
        super("vector");
        let direction: Angle;
        let magnitude: number;
        if (a instanceof Angle && typeof b == "number") {
            direction = a;
            magnitude = b;
        } else if (Angle.isProps(a) && typeof b == "number") {
            direction = new Angle(a);
            magnitude = b;
        } else if (typeof a == "number" && typeof b == "number") {
            direction = new Angle(a);
            magnitude = b;
        } else if (Vector.isProps(a)) {
            direction = new Angle(a.direction);
            magnitude = a.magnitude;
        }
        this.direction = direction;
        this.magnitude = magnitude || 0;
    }

    static get zero(): Vector {
        return new Vector(new Angle(0));
    }

    static random(): Vector {
        return new Vector(Angle.random(), random(Infinity, -Infinity));
    }

    static isProps(obj: any): obj is VectorProps {
        return (
            typeof obj == "object" &&
            obj.hasOwnProperty("direction") &&
            Angle.isProps(obj.direction) &&
            obj.hasOwnProperty("magnitude") &&
            typeof obj.magnitude == "number"
        );
    }
}

export default Vector;
