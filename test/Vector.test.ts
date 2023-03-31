import { test, expect } from "@jest/globals";
import Vector from "../src/Vector";
import Angle from "../src/Angle";
import Point from "../src/Point";

/*
test("toLine", () => {
    const vector1 = new Vector(new Angle(Math.PI), 5);
    const line = vector1.toLine(new Point(8, 0));
    expect(line.origin.x).toBe(8);
    expect(line.origin.y).toBe(0);

    expect(line.end.x).toBe(3);
    expect(line.end.y).toBe(0);
});
*/

test("toPoint", () => {
    const vector1 = new Vector(new Angle(0), 2);
    const point1 = vector1.toPoint();
    expect(point1.x).toBe(2);
    expect(point1.y).toBe(0);

    const vector2 = new Vector(new Angle(Math.PI / 2), 10);
    const point2 = vector2.toPoint();
    expect(point2.x).toBe(0);
    expect(point2.y).toBe(10);
});
