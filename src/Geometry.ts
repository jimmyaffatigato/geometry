import Point from "./Point.js";

export interface Geometry<T> {
    type: string;
    clone(): T;
    toString(): string;
}

export interface Size {
    size: Point;
    area: number;
}

export interface Bounds {
    top: number;
    left: number;
    bottom: number;
    right: number;
    contains(point: Point): boolean;
}

export interface Position<T = Point> {
    position: Point;
    translate(point: Point): T;
    setPosition(position: Point): T;
}

export interface Angle<T> {
    angle: number;
    setAngle(angle: number): T;
    rotate(rad: number): T;
    rotateByDegree(degree: number): T;
}
