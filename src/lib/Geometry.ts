export const PRECISION = 4;

abstract class Geometry<Shape, Props> {
    readonly type: string;

    constructor(type: string) {
        this.type = type;
    }

    abstract clone(): Shape;
    abstract match(shape: Shape): boolean;
    abstract toObject(): Props;
    abstract toString(): string;
}

export default Geometry;
