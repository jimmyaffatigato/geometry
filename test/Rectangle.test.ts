import { test, expect } from "@jest/globals";
import Point from "../src/Point";
import Rectangle from "../src/Rectangle";

test("Rectangle.position", () => {
    const p1 = Point.random();
    const rectangle = new Rectangle(p1, Point.random());
    expect(rectangle.position.x).toBe(p1.x);
    expect(rectangle.position.y).toBe(p1.y);
});

test("Rectangle.translate()", () => {
    const rectangle = Rectangle.random();
    const tPoint = Point.random();
    const translated = rectangle.translate(tPoint);
    expect(translated.x).toBe(rectangle.x + tPoint.x);
    expect(translated.y).toBe(rectangle.y + tPoint.y);
    expect(translated.x + translated.width).toBe(rectangle.x + rectangle.width + tPoint.x);
    expect(translated.y + translated.height).toBe(rectangle.y + rectangle.height + tPoint.y);
});

test("Rectangle.setPosition()", () => {
    const rectangle = Rectangle.random();
    const point = Point.random();
    const translated = rectangle.setPosition(point);
    expect(translated.x).toBe(point.x);
    expect(translated.y).toBe(point.y);
});

// new Rectangle

test("new Rectangle(Point, Point)", () => {
    const p1 = Point.random();
    const p2 = Point.random();
    const rectangle = new Rectangle(p1, p2);
    expect(rectangle.x).toBe(p1.x);
    expect(rectangle.y).toBe(p1.y);
    expect(rectangle.x + rectangle.width).toBe(p1.x + p2.x);
    expect(rectangle.y + rectangle.height).toBe(p1.y + p2.y);
});

test("new Rectangle(number, number, number, number)", () => {
    const x = Math.random();
    const y = Math.random();
    const width = Math.random();
    const height = Math.random();
    const rectangle = new Rectangle(x, y, width, height);
    expect(rectangle.x).toBe(x);
    expect(rectangle.y).toBe(y);
    expect(rectangle.width).toBe(width);
    expect(rectangle.height).toBe(height);
});
