import { test, expect } from "@jest/globals";
import { Point, Triangle } from "..";

test("", () => {
    const triangle = new Triangle(new Point(1, 1), new Point(2, 2), new Point(3, 1));

    expect(triangle.angleA.degrees).toBeCloseTo(45);
});
