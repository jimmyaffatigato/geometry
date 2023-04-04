import { test, expect } from "@jest/globals";
import { Point, Triangle } from "..";

test("", () => {
    const triangle = Triangle.random();

    console.log(triangle.angleA);
    expect(triangle.angleA.radians < Math.PI).toBe(true);
    expect(triangle.angleB.radians < Math.PI).toBe(true);
    expect(triangle.angleC.radians < Math.PI).toBe(true);
    expect(triangle.angleA.radians + triangle.angleB.radians + triangle.angleC.radians).toBeCloseTo(Math.PI);
});
