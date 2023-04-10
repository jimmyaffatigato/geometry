import Angle, { AngleProps } from "./Angle";
import Geometry from "./Geometry";
import Line from "./Line";
import Point from "./Point";
import Vector from "./Vector";
import { matchNumber } from "./util";

export interface ArcProps {
    angle: AngleProps;
    radius: number;
}

class Arc extends Geometry<Arc, ArcProps> {
    origin: Point;
    startAngle: Angle;
    endAngle: Angle;
    radius: number;

    get angle(): Angle {
        return this.endAngle.difference(this.angle);
    }

    get arcLength(): number {
        return this.angle.radians * this.radius;
    }

    get chord(): Line {
        return new Line(this.startPoint, this.endPoint);
    }

    get sectorArea(): number {
        return Math.PI * this.radius ** 2 * (this.angle.radians / (Math.PI * 2));
    }

    get startPoint(): Point {
        return new Vector(this.startAngle, this.radius).toLine(this.origin).end;
    }

    get endPoint(): Point {
        return new Vector(this.endAngle, this.radius).toLine(this.origin).end;
    }

    clone(): Arc {
        return new Arc(this.origin, this.startAngle, this.endAngle, this.radius);
    }

    match(arc: Arc, tolerance: number = 0): boolean {
        return (
            this.origin.match(arc.origin, tolerance) &&
            this.startAngle.match(arc.startAngle, tolerance) &&
            this.endAngle.match(arc.endAngle, tolerance) &&
            matchNumber(this.radius, arc.radius, tolerance)
        );
    }


    toObject(): ArcProps {
        return { angle: this.angle.toObject(), radius: this.radius };
    }

    toString(): string {
        return "";
    }

    constructor(origin: Point, startAngle: Angle, endAngle: Angle, radius: number) {
        super("arc");
        this.origin = origin;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.radius = radius;
    }

    static fromPoint(point: Point, startAngle: Angle, endAngle: Angle, radius: number): Arc {
        return null;
    }
}

export default Arc;
