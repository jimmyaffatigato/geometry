import { test, expect } from "@jest/globals";
import Point from "../src/Point";
import Triangle from "../src/Triangle";

test("", () => {
    const triangle = new Triangle(new Point(1, 1), new Point(2, 2), new Point(3, 1));
    expect(triangle.angleA.degrees).toBe(45);
});
