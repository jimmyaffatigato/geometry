export const RESOLUTION = 1_000_000;

abstract class Geometry<S> {
    readonly type: string;

    constructor(type: string) {
        this.type = type;
    }

    abstract clone(): S;
    abstract match(shape: S): boolean;
    abstract toString(): string;
}

export default Geometry;
