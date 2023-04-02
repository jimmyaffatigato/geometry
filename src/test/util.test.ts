import { test, expect } from "@jest/globals";
import { util } from "..";
import { PRECISION } from "../lib/Geometry";

const { randomInt, degreesToRadians, radiansToDegrees } = util;

// randomInt

test("random", () => {
    const high = randomInt(100.36, -100.3);
    const low = randomInt(high, high - 100.74);
    const r = randomInt(high, low);
    expect(r).toBe(Math.floor(r));
    expect(r).toBeLessThanOrEqual(high);
    expect(r).toBeGreaterThanOrEqual(low);
});

// radiansToDegrees

test("radian/degree conversion", () => {
    const input = Math.random() * 360;
    const radians = degreesToRadians(input);
    const degrees = radiansToDegrees(radians);
    expect(degrees).toBeCloseTo(input, 4);
});

test("Positive radians", () => {
    for (let i = 0; i < 100; i++) {
        const input = Math.random() * 360;
        const radians = degreesToRadians(input);
        expect(radians).toBeGreaterThan(0);
    }
});

test("Negative radians", () => {
    for (let i = 0; i < 100; i++) {
        const input = Math.random() * -360;
        const radians = degreesToRadians(input);
        expect(radians).toBeLessThan(0);
    }
});

test("Round to Precision", () => {
    const a = util.random();
    util.roundToPrecision(a, PRECISION);
});
