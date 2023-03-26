import { Geometry } from "./Geometry";

// TODO: Prevent Max and Min from crossing
class Scalar implements Geometry<Scalar> {
    public readonly value: number;
    public readonly max: number;
    public readonly min: number;

    public setValue(value: number): Scalar {
        if (value > this.max) {
            return this.maximize();
        }
        if (value < this.min) {
            return this.minimize();
        }
        return new Scalar(value, this.max, this.min);
    }

    public setMax(max: number): Scalar {
        if (max < this.value) {
            return new Scalar(max, max, this.min);
        }
        return new Scalar(this.value, max, this.min);
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

    public add(value: number | Scalar): Scalar {
        if (typeof value == "number") {
            return this.setValue(this.value + value);
        } else {
            return this.setValue(this.value + value.value);
        }
    }

    public multiply(value: number | Scalar): Scalar {
        if (typeof value == "number") {
            return this.setValue(this.value * value);
        } else {
            return this.setValue(this.value * value.value);
        }
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
        return `${this.value} [${this.min}, ${this.max}]`;
    }

    constructor(value: number | Scalar, max: number | Scalar = Infinity, min: number | Scalar = -Infinity) {
        let thisValue = 0;
        let thisMax = 0;
        let thisMin = 0;
        if (typeof value == "number") {
            thisValue = value;
        } else {
            thisValue = value.value;
        }
        if (typeof max == "number") {
            thisMax = max;
        } else {
            thisMax = max.value;
        }
        if (typeof min == "number") {
            thisMin = min;
        } else {
            thisMin = min.value;
        }
        this.max = thisMax;
        this.min = thisMin;
        this.value = constrain(thisValue, this.max, this.min);
    }

    public static get zero(): Scalar {
        return new Scalar(0);
    }

    public static get one(): Scalar {
        return new Scalar(1);
    }

    public static random(max?: number | Scalar, min?: number | Scalar): Scalar {
        return new Scalar(Math.random(), max, min);
    }
}

export default Scalar;

function constrain(value: number, max: number, min: number): number {
    if (value > max) {
        return max;
    }
    if (value < min) {
        return min;
    }
    return value;
}
