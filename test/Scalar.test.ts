import Scalar from "../src/Scalar";
import { test, expect } from "@jest/globals";

test("Scalar.setValue(number)", () => {
    const value = 1;
    const scalar = new Scalar(10, 100, -100).setValue(value);
    expect(scalar.value).toBe(value);
});

test("Scalar.setValue(number) with Max Constrain", () => {
    const value = 20;
    const max = 10;
    const scalar = new Scalar(1, max, -10).setValue(value);
    expect(scalar.value).toBe(max);
});

test("Scalar.setValue(number) with Min Constrain", () => {
    const value = -20;
    const min = -10;
    const scalar = new Scalar(-1, 10, min).setValue(value);
    expect(scalar.value).toBe(min);
});

test("Scalar.setMax(number)", () => {
    const max = 10;
    const scalar = new Scalar(0, 1, -1).setMax(max);
    expect(scalar.max).toBe(max);
});

test("Scalar.setMax(number) with Constrain", () => {
    const max = 10;
    const scalar = new Scalar(15, 20, -20).setMax(max);
    expect(scalar.max).toBe(max);
    expect(scalar.value).toBe(max);
});

test("Scalar.maximize()", () => {
    const value = 0;
    const max = 1;
    const min = -1;
    const scalar = new Scalar(value, max, min).maximize();
    expect(scalar.value).toBe(max);
});

test("Scalar.minimize()", () => {
    const value = 0;
    const max = 1;
    const min = -1;
    const scalar = new Scalar(value, max, min).minimize();
    expect(scalar.value).toBe(min);
});

test("Scalar.negate()", () => {
    const value = 5;
    const scalar = new Scalar(value).negate();
    expect(scalar.value).toBe(-value);
});

test("Scalar.add(number)", () => {
    const value = 5;
    const addend = 4;
    const scalar = new Scalar(value).add(addend);
    expect(scalar.value).toBe(value + addend);
});

test("Scalar.add(Scalar)", () => {
    const value = 5;
    const addend = 4;
    const scalar = new Scalar(value).add(new Scalar(addend));
    expect(scalar.value).toBe(value + addend);
});

test("Scalar.multiply(number)", () => {
    const value = 5;
    const factor = 2;
    const scalar = new Scalar(value).multiply(factor);
    expect(scalar.value).toBe(value * factor);
});

test("Scalar.multiply(Scalar)", () => {
    const value = 5;
    const factor = 2;
    const scalar = new Scalar(value).multiply(new Scalar(factor));
    expect(scalar.value).toBe(value * factor);
});

// Geometry

test("Scalar.clone", () => {
    const value = Math.random();
    const scalar = new Scalar(value);
    const scalarClone = scalar.clone();
    expect(scalarClone).toBeInstanceOf(Scalar);
    expect(scalarClone.value).toBe(value);
    expect(scalar.match(scalarClone)).toBe(true);
});

test("Scalar.match", () => {
    const value = Math.random();
    const scalar1 = new Scalar(value);
    const scalar2 = new Scalar(value);
    expect(scalar1.match(scalar2)).toBe(true);
});

test("Scalar.toString()", () => {
    const scalar = new Scalar(0, Math.random() * 1, Math.random() * -1);
    const string = scalar.toString();
    expect(typeof string).toBe("string");
});

// new Scalar()

test("new Scalar(number, number, number)", () => {
    const value = 0;
    const max = 1;
    const min = -1;
    const scalar = new Scalar(value, max, min);
    expect(scalar).toBeInstanceOf(Scalar);
    expect(scalar.value).toBe(value);
    expect(scalar.max).toBe(max);
    expect(scalar.min).toBe(min);
});

test("new Scalar(number)", () => {
    const value = Math.random();
    const scalar = new Scalar(value);
    expect(scalar.value).toBe(value);
    expect(scalar.max).toBe(Infinity);
    expect(scalar.min).toBe(-Infinity);
});

test("new Scalar(number, number)", () => {
    const value = 0;
    const max = 1;
    const scalar = new Scalar(value, max);
    expect(scalar.value).toBe(value);
    expect(scalar.max).toBe(max);
    expect(scalar.min).toBe(-Infinity);
});

test("new Scalar(number, undefined, number)", () => {
    const value = 0;
    const min = -1;
    const scalar = new Scalar(value, undefined, min);
    expect(scalar.value).toBe(value);
    expect(scalar.max).toBe(Infinity);
    expect(scalar.min).toBe(min);
});

test("new Scalar(Scalar)", () => {
    const value = new Scalar(1);
    const scalar = new Scalar(value);
    expect(scalar.value).toBe(value.value);
});

test("new Scalar(Scalar, Scalar)", () => {
    const value = new Scalar(0);
    const max = new Scalar(1);
    const scalar = new Scalar(value, max);
    expect(scalar.value).toBe(value.value);
    expect(scalar.max).toBe(max.value);
});

test("new Scalar(Scalar, Scalar, Scalar)", () => {
    const value = new Scalar(0);
    const max = new Scalar(1);
    const min = new Scalar(-1);
    const scalar = new Scalar(value, max, min);
    expect(scalar.value).toBe(value.value);
    expect(scalar.max).toBe(max.value);
    expect(scalar.min).toBe(min.value);
});

test("new Scalar(number, number, number) with Max Constrain", () => {
    const value = 15;
    const max = 10;
    const min = -10;
    const scalar = new Scalar(value, max, min);
    expect(scalar.value).toBe(max);
});

test("new Scalar(number, number, number) with Min Constrain", () => {
    const value = -15;
    const max = 10;
    const min = -10;
    const scalar = new Scalar(value, max, min);
    expect(scalar.value).toBe(min);
});

// Static

test("static Scalar.zero", () => {
    const scalar = Scalar.zero;
    expect(scalar.value).toBe(0);
});

test("static Scalar.one", () => {
    const scalar = Scalar.one;
    expect(scalar.value).toBe(1);
});

test("static Scalar.random(number, number)", () => {
    const max = Math.random() * 100;
    const min = Math.random() * -100;
    const scalar = Scalar.random(max, min);
    expect(scalar.value).toBeLessThanOrEqual(max);
    expect(scalar.value).toBeGreaterThanOrEqual(min);
});
