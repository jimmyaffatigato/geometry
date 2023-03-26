import Point from "./Point.js";

export interface Geometry<S> {
    type: string;
    clone(): S;
    match(shape: S): boolean;
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
    origin: Point;
    translate(point: Point): T;
    setPosition(position: Point): T;
}
