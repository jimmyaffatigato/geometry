import { test, expect } from "@jest/globals";
import { Angle, Vector, util } from "..";

test("Angle.rotateByDegrees()", () => {
    const angle = Angle.fromDegrees(90).rotateByDegrees(180);

    expect(angle.degrees).toBeCloseTo(270);
});

test("Angle.multiply()", () => {
    const angle = Angle.random();
    const factor = util.random();
    const multiplied = angle.multiply(factor);

    expect(multiplied.radians).toBeCloseTo(angle.radians * factor);
});

test("Angle.match()", () => {
    const radians = util.randomRadians();
    const angle1 = new Angle(radians);
    const angle2 = new Angle(radians);

    expect(angle1.radians).toBe(angle2.radians);
    expect(angle1.match(angle2)).toBe(true);
    expect(angle2.match(angle1)).toBe(true);
});

test("Angle.clone()", () => {
    const angle = Angle.random();
    const clone = angle.clone();

    expect(clone).toBeInstanceOf(Angle);
    expect(clone.radians).toBe(angle.radians);
});

// To

test("Angle.toVector()", () => {
    const angle = Angle.random();
    const magnitude = util.random() * util.randomInt();
    const vector = angle.toVector(magnitude);

    expect(vector).toBeInstanceOf(Vector);
    expect(vector.direction).toBeInstanceOf(Angle);
    expect(vector.direction.radians).toBeCloseTo(angle.radians);
    expect(typeof vector.magnitude).toBe("number");
    expect(vector.magnitude).toBeCloseTo(magnitude);
});

test("Angle.toObject()", () => {
    const angle = Angle.random();
    const obj = angle.toObject();

    expect(typeof obj).toBe("object");
    expect(obj).toHaveProperty("radians");
    expect(typeof obj.radians).toBe("number");
    expect(obj.radians).toBeCloseTo(angle.radians);
});

test("Angle.toString()", () => {
    const angle = Angle.random();
    const string = angle.toString();

    expect(typeof string).toBe("string");
});

// Constructor

test("new Angle(number)", () => {
    const radians = Math.random() * Math.PI * 4 - Math.PI * 2;
    const angle = new Angle(radians);

    expect(angle.radians).toBeCloseTo(radians);
});

test("new Angle(AngleProps)", () => {
    // Good Props
    const radians = util.randomRadians();
    const props = { radians };
    const angle = new Angle(props);

    expect(angle.radians).toBeCloseTo(radians);

    // Bad Props
    const props2 = { foo: "bar" };
    //@ts-ignore
    const angle2 = new Angle(props2);
    expect(angle2.radians).toBe(undefined);
});

// Static

test("Angle.fromDegrees()", () => {
    const angle = Angle.fromDegrees(180);

    expect(angle.degrees).toBeCloseTo(180);
    expect(angle.radians).toBeCloseTo(Math.PI);
});

test("Angle.random()", () => {
    const angle = Angle.random();

    expect(angle).toBeInstanceOf(Angle);
    expect(angle.radians).toBeDefined();
});
