import Geometry from "./Geometry";
import Line from "./Line";
import Point from "./Point";

class Path extends Geometry<Path> {
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

    public toArray(): [number, number][] {
        return this.points.map((point) => {
            return [point.x, point.y];
        });
    }

    public clone(): Path {
        return new Path(this.points.slice());
    }

    public match(path: Path): boolean {
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

    public toString(): string {
        return `[${this.points
            .map((point) => {
                return `[${point.x}, ${point.y}]`;
            })
            .join(", ")}]`;
    }

    constructor(points: readonly Point[]) {
        super("path");
        this.points = points;
    }
}

export default Path;
