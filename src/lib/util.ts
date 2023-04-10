export function random(max: number = 1, min: number = 0): number {
    return Math.random() * (max - min) + min;
}

export function randomInt(max: number = 1, min: number = 0): number {
    max = Math.floor(max);
    min = Math.floor(min);
    return Math.ceil(Math.random() * (max - min)) + min;
}

export function roundOffZeroes(number: number, precision: number = 0.000001): number {
    const floored = Math.floor(number);
    if (number % floored < precision) return floored;
    if (number % floored > floored - precision) return Math.ceil(number);
    return number;
}

export function matchNumber(number1: number, number2: number, tolerance: number = 0): boolean {
    return Math.abs(number1 - number2) <= tolerance;
}

//

const MAXRAD = Math.PI * 2;
const MINRAD = -MAXRAD;

export function randomRadians(): number {
    return random(MAXRAD, MINRAD);
}

export function clampToRadians(radians: number): number {
    if (radians > MAXRAD) return radians % MAXRAD;
    if (radians < MINRAD) return radians % MINRAD;
    return radians;
}

// Angle

export function degreesToRadians(degrees: number): number {
    return roundOffZeroes((Math.PI / 180) * degrees);
}

export function radiansToDegrees(radians: number): number {
    return roundOffZeroes(radians / (Math.PI / 180));
}
