import Point from "./Point";

export interface Geometry<S> {
    type: string;
    clone(): S;
    match(shape: S): boolean;
    toString(): string;
}

export interface Position<T = Point> {
    position: Point;
    translate(point: Point): T;
    setPosition(position: Point): T;
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
