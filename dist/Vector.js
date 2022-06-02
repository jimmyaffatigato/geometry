import Line from "./Line.js";
import Point from "./Point.js";
class Vector {
    /**
     * Creates a Vector from an angle in radians and a magnitude.
     */
    constructor(angle, magnitude = 0) {
        this.type = "vector";
        this.type = "vector";
        this.angle = angle;
        this.magnitude = magnitude;
    }
    get degrees() {
        return this.angle / (Math.PI / 180);
    }
    /**
     * Creates a Vector from an angle in degrees and a magnitude.
     */
    static degrees(degrees, magnitude) {
        return new Vector(degrees * (Math.PI / 180), magnitude);
    }
    static get zero() {
        return new Vector(0);
    }
    clone() {
        return new Vector(this.angle, this.magnitude);
    }
    setAngle(angle) {
        return new Vector(angle, this.magnitude);
    }
    setMagnitude(magnitude) {
        return new Vector(this.angle, magnitude);
    }
    /**
     * Rotates the Vector by radians
     */
    rotate(rad) {
        return new Vector(this.angle + rad, this.magnitude);
    }
    /**
     * Rotates the Vector by degrees
     */
    rotateByDegree(degree) {
        return this.rotate((Math.PI / 180) * degree);
    }
    scale(factor) {
        return new Vector(this.angle, this.magnitude * factor);
    }
    toString(digits = 2) {
        return `${this.degrees.toFixed(digits)}° x ${this.magnitude.toFixed(digits)}`;
    }
    toPoint() {
        return new Point(Math.cos(this.angle) * this.magnitude, Math.sin(this.angle) * this.magnitude);
    }
    toLine(origin = Point.zero) {
        return new Line(Point.zero, this.toPoint()).translate(origin);
    }
}
export default Vector;
//# sourceMappingURL=Vector.js.map