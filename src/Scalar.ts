import { Geometry } from "./Geometry";

class Scalar implements Geometry<Scalar> {
    public readonly value: number;
    public readonly max: number;
    public readonly min: number;

    public setValue(value: number): Scalar {
        if (value <= this.max && value >= this.min) {
            return new Scalar(value, this.max, this.min);
        } else if (value > this.max) {
            return this.maximize();
        } else if (value < this.min) {
            return this.minimize();
        }
    }

    public maximize(): Scalar {
        return this.setValue(this.max);
    }

    public minimize(): Scalar {
        return this.setValue(this.min);
    }

    public negate(): Scalar {
        return this.setValue(-this.value);
    }

    public add(value: number): Scalar {
        return this.setValue(this.value + value);
    }

    // Geometry

    public readonly type = "scalar";

    public clone(): Scalar {
        return new Scalar(this.value, this.max, this.min);
    }

    public match(scalar: Scalar): boolean {
        return this.value == scalar.value;
    }

    public toString(): string {
        return `${this.value} [${this.min} < x > ${this.max}]`;
    }

    constructor(value: number | Scalar, max: number | Scalar = Infinity, min: number | Scalar = Infinity) {
        if (typeof value == "number") {
            this.value = value;
        } else {
            this.value = value.value;
        }
        if (typeof max == "number") {
            this.max = max;
        } else {
            this.max = max.value;
        }
        if (typeof min == "number") {
            this.min = min;
        } else {
            this.min = min.value;
        }
    }
}

export default Scalar;
