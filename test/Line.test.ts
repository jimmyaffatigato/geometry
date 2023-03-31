import { test, expect } from "@jest/globals";
import Angle from "../src/Angle";
import Line from "../src/Line";
import Point from "../src/Point";

test("Line.reverse()", () => {
    const x1 = Math.random();
    const y1 = Math.random();
    const point1 = new Point(x1, y1);
    const x2 = Math.random();
    const y2 = Math.random();
    const point2 = new Point(x2, y2);
    const line = new Line(point1, point2).reverse();
    expect(line.origin.match(point2));
    expect(line.end.match(point1));
});

test("Line.translate()", () => {
    const line = Line.random();
    const tPoint = Point.random();
    const translated = line.translate(tPoint);
    expect(translated.origin.x).toBeCloseTo(line.origin.x + tPoint.x);
    expect(translated.origin.y).toBeCloseTo(line.origin.y + tPoint.y);
    expect(translated.end.x).toBeCloseTo(line.end.x + tPoint.x);
    expect(translated.end.y).toBeCloseTo(line.end.y + tPoint.y);
});

test("Line.rotate()", () => {});

test("Line.rotateByDegree", () => {});

test("Line.setAngle()", () => {
    //const angle = Angle.random();
    //const line = Line.random().setAngle(angle);
    //expect(line.angle.radians).toBe(angle.radians);
});

test("Line.toRectangle()", () => {
    const line = Line.random();
    const rectangle = line.toRectangle();
    //expect(rectangle.left).toBe(line.origin.x);
    //expect(rectangle.top).toBe(line.origin.y);
    //expect(rectangle.right).toBe(line.end.x);
    //expect(rectangle.bottom).toBe(line.end.y);
});
