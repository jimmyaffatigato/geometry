import { expect, test } from "@jest/globals";
import Point from "../src/Point";
import Scalar from "../src/Scalar";
import Vector from "../src/Vector";

test("Point.position", () => {
    const x = Math.random();
    const y = Math.random();
    const point = new Point(x, y);
    const position = point.position;
    expect(position).toBeInstanceOf(Point);
    expect(position.x).toBe(x);
    expect(position.y).toBe(y);
});

test("Point.setPosition(number, number)", () => {
    const x = Math.random();
    const y = Math.random();
    const point = new Point(0, 0).setPosition(x, y);
    expect(point.x).toBe(x);
    expect(point.y).toBe(y);
});

test("Point.setPosition(Point)", () => {
    const x = Math.random();
    const y = Math.random();
    const point = new Point(0, 0).setPosition(new Point(x, y));
    expect(point.x).toBe(x);
    expect(point.y).toBe(y);
});

test("Point.translate(Point)", () => {
    const x = Math.random();
    const y = Math.random();
    const dX = Math.random();
    const dY = Math.random();
    const point = new Point(x, y).translate(new Point(dX, dY));
    expect(point.x).toBe(x + dX);
    expect(point.y).toBe(y + dY);
});

test("Point.translateX(number)", () => {
    const x = Math.random();
    const y = Math.random();
    const distance = Math.random();
    const point = new Point(x, y).translateX(distance);
    expect(point.x).toBe(x + distance);
});

test("Point.translateY(number)", () => {
    const x = Math.random();
    const y = Math.random();
    const distance = Math.random();
    const point = new Point(x, y).translateY(distance);
    expect(point.y).toBe(y + distance);
});

test("Point.scale(number)", () => {
    const x = Math.random();
    const y = Math.random();
    const factor = Math.random();
    const point = new Point(x, y).scale(factor);
    expect(point.x).toBe(x * factor);
    expect(point.y).toBe(y * factor);
});

test("Point.scale(Point)", () => {});

test("Point.rotate(number)", () => {
    const x = Math.random();
    const y = Math.random();
    const radians = Math.random();
    const point = new Point(x, y).rotate(radians);
    expect(point).toBeInstanceOf(Point);
});

// Format

test("Point.toArray()", () => {
    const x = Math.random();
    const y = Math.random();
    const point = new Point(x, y);
    const array = point.toArray();
    expect(Array.isArray(array)).toBe(true);
    expect(array[0]).toBe(x);
    expect(array[1]).toBe(y);
});

test("Point.toVector()", () => {
    const x = Math.random();
    const y = Math.random();
    const point = new Point(x, y);
    const vector = point.toVector();
    expect(vector).toBeInstanceOf(Vector);
});

// Geometry

test("Point.clone()", () => {
    const point = new Point(Math.random(), Math.random());
    const clone = point.clone();
    expect(clone.x).toBe(point.x);
    expect(clone.y).toBe(point.y);
});

test("Point.match()", () => {
    const x = Math.random();
    const y = Math.random();
    const point1 = new Point(x, y);
    const point2 = new Point(x, y);
    expect(point1.match(point2)).toBe(true);
});

test("Point.toString()", () => {
    const point = new Point(Math.random(), Math.random());
    const string = point.toString();
    expect(typeof string).toBe("string");
});

// new Point

test("new Point(number, number)", () => {
    const x = Math.random();
    const y = Math.random();
    const point = new Point(x, y);
    expect(point).toBeInstanceOf(Point);
    expect(point.x).toBe(x);
    expect(point.y).toBe(y);
});

test("new Point(Scalar, Scalar)", () => {
    const x = Math.random();
    const y = Math.random();
    const xScalar = new Scalar(x);
    const yScalar = new Scalar(y);
    const point = new Point(xScalar, yScalar);
    expect(point.x).toBe(x);
    expect(point.y).toBe(y);
});

test("new Point([number, number])", () => {
    const xy: [number, number] = [Math.random(), Math.random()];
    const point = new Point(xy);
    expect(point.x).toBe(xy[0]);
    expect(point.y).toBe(xy[1]);
});

test("new Point(Point)", () => {
    const xy = new Point(Math.random(), Math.random());
    const point = new Point(xy);
    expect(point.x).toBe(xy.x);
    expect(point.y).toBe(xy.y);
});

// Static

test("static Point.zero", () => {
    const point = Point.zero;
    expect(point.x).toBe(0);
    expect(point.y).toBe(0);
});

test("static Point.one", () => {
    const point = Point.one;
    expect(point.x).toBe(1);
    expect(point.y).toBe(1);
});
