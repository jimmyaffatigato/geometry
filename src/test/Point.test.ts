import { expect, test } from "@jest/globals";
import { Point, Vector } from "..";
import { randomInt, random } from "../lib/util";

test("Point.translate(Point)", () => {
    const x = Math.random();
    const y = Math.random();
    const dX = Math.random();
    const dY = Math.random();
    const point = new Point(x, y).translate(new Point(dX, dY));
    expect(point.x).toBeCloseTo(x + dX);
    expect(point.y).toBeCloseTo(y + dY);
});

test("Point.scale(number)", () => {
    const x = Math.random();
    const y = Math.random();
    const factor = Math.random();
    const point = new Point(x, y).multiply(factor);
    expect(point.x).toBeCloseTo(x * factor);
    expect(point.y).toBeCloseTo(y * factor);
});

test("Point.scale(Point)", () => {
    const point = Point.random();
    const factor = Point.random();
    const multipliedPoint = point.multiply(factor);

    expect(multipliedPoint.x).toBeCloseTo(point.x * factor.x);
    expect(multipliedPoint.y).toBeCloseTo(point.y * factor.y);
});

test("Point.floor()", () => {
    const x = Math.random() * randomInt();
    const y = Math.random() * randomInt();
    const point = new Point(x, y).floor();

    expect(point.x).toBeCloseTo(Math.floor(x));
    expect(point.y).toBeCloseTo(Math.floor(y));
});

test("Point.absolute()", () => {
    const x = randomInt(-1, Infinity);
    const y = randomInt(-1, Infinity);
    const point = new Point(x, y).absolute();

    expect(point.x).toBe(-x);
    expect(point.y).toBe(-y);
});

test("Point.reverse()", () => {
    const point = Point.random();
    const reversed = point.reverse();

    expect(reversed.x).toBeCloseTo(point.y);
    expect(reversed.y).toBeCloseTo(point.x);
});

test("Point.reflectX() and Point.reflectY()", () => {
    const point = Point.random();
    const pointReflectX = point.reflectX();
    const pointReflectY = point.reflectY();

    expect(pointReflectX.x).toBeCloseTo(-point.x);
    expect(pointReflectY.y).toBeCloseTo(-point.y);
});

test("Point.difference()", () => {
    const x1 = Math.random();
    const y1 = Math.random();
    const point1 = new Point(x1, y1);

    const x2 = Math.random();
    const y2 = Math.random();
    const point2 = new Point(x2, y2);

    const difference = point1.difference(point2);

    expect(difference.x).toBeCloseTo(x2 - x1);
    expect(difference.y).toBeCloseTo(y2 - y1);
});

test("Point.isWithin()", () => {});

test("Point.rotate(number)", () => {
    const radians = Math.random();
    const point = Point.random().rotate(radians);

    expect(point).toBeInstanceOf(Point);
});

// Format

test("Point.toArray()", () => {
    const point = Point.random();
    const array = point.toArray();

    expect(Array.isArray(array)).toBe(true);
    expect(array[0]).toBeCloseTo(point.x);
    expect(array[1]).toBeCloseTo(point.y);
});

test("Point.toVector()", () => {
    const point = Point.random();
    const vector = point.toVector();

    expect(vector).toBeInstanceOf(Vector);
});

test("Point.toObject()", () => {
    const point = Point.random();
    const obj = point.toObject();

    expect(obj.x).toBe(point.x);
    expect(obj.y).toBe(point.y);
});

// Geometry

test("Point.clone()", () => {
    const point = new Point(Math.random(), Math.random());
    const clone = point.clone();
    expect(clone.x).toBeCloseTo(point.x);
    expect(clone.y).toBeCloseTo(point.y);
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
    expect(point.x).toBeCloseTo(x);
    expect(point.y).toBeCloseTo(y);
});

test("new Point([number, number])", () => {
    const xy: [number, number] = [Math.random(), Math.random()];
    const point = new Point(xy);
    expect(point.x).toBeCloseTo(xy[0]);
    expect(point.y).toBeCloseTo(xy[1]);
});

test("new Point(Point)", () => {
    const xy = new Point(random(), random());
    const point = new Point(xy);
    expect(point.x).toBeCloseTo(xy.x);
    expect(point.y).toBeCloseTo(xy.y);
});

test("new Point(PointProps)", () => {
    // Good
    const props = { x: random(), y: random() };
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

test("moveTowards", () => {
    const point1 = Point.zero.moveTowards(new Point(4, 0), 2);
    expect(point1.x).toBeCloseTo(2);
    expect(point1.y).toBeCloseTo(0);

    const point2 = new Point(5, 5).moveTowards(new Point(5, 20), 10);
    expect(point2.x).toBeCloseTo(5);
    expect(point2.y).toBeCloseTo(15);
});
