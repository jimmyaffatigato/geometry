import Geometry from "./Geometry";
import Line from "./Line";
import Point, { PointProps } from "./Point";

export interface PathProps {
    points: readonly PointProps[];
}

class Path extends Geometry<Path, PathProps> {
    public points: readonly Point[];

    public get segments(): readonly Line[] {
        let arr: Line[] = [];
        for (let i = 0; i < this.points.length - 1; i++) {
            const origin = this.points[i];
            const end = this.points[i + 1];
            arr.push(new Line(origin, end));
        }
        return arr;
    }

    public get length(): number {
        let total = 0;
        this.segments.forEach((line) => {
            total += line.length;
        });
        return total;
    }

    addPoint(point: Point): Path {
        return new Path(this.points.concat(point));
    }

    public toArray(): [number, number][] {
        return this.points.map((point) => {
            return [point.x, point.y];
        });
    }

    public clone(): Path {
        return new Path(this.points.slice());
    }

    public match(path: Path): boolean {
        if (this === path) return true;
        if (this.points.length == path.length) {
            for (let i = 0; i < this.points.length; i++) {
                if (this.points[i] != path.points[i]) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    toObject(): PathProps {
        return { points: this.points.map((point) => point.toObject()) };
    }

    toString(): string {
        return `[${this.points
            .map((point) => {
                return `[${point.x}, ${point.y}]`;
            })
            .join(", ")}]`;
    }

    constructor(points: Point[]);
    constructor(points: [number, number][]);
    constructor(a: (Point | [number, number])[]) {
        super("path");
        if (Array.isArray(a)) {
            this.points = a.map((i) => {
                if (i instanceof Point) {
                    return i;
                } else if (Array.isArray(i)) {
                    return new Point(i);
                }
            });
        }
    }
}

export default Path;
