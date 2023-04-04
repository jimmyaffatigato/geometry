declare abstract class Geometry<Shape, Props> {
    readonly type: string;
    constructor(type: string);
    abstract clone(): Shape;
    abstract match(shape: Shape): boolean;
    abstract toObject(): Props;
    abstract toString(): string;
}
export default Geometry;
