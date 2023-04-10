import { test, expect } from "@jest/globals";
import { Angle, Point, Vector } from "..";

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
    const vector = Vector.random();
    const point = vector.toPoint();

    expect(point).toBeInstanceOf(Point);
});
