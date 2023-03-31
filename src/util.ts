import Point, { PointProps } from "./Point";

export function randomNumber(max: number = 1, min: number = 0): number {
    return Math.random() * (max - min) + min;
}

export function randomInt(max: number = 1, min: number = 0): number {
    max = Math.floor(max);
    min = Math.floor(min);
    return Math.ceil(Math.random() * (max - min)) + min;
}

// Angle

export function degreesToRadians(degrees: number): number {
    return (Math.PI / 180) * degrees;
}

export function radiansToDegrees(radians: number): number {
    return radians / (Math.PI / 180);
}
