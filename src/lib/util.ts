export function random(max: number = 1, min: number = 0): number {
    return Math.random() * (max - min) + min;
}

export function randomInt(max: number = 1, min: number = 0): number {
    max = Math.floor(max);
    min = Math.floor(min);
    return Math.ceil(Math.random() * (max - min)) + min;
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
    return (Math.PI / 180) * degrees;
}

export function radiansToDegrees(radians: number): number {
    return radians / (Math.PI / 180);
}
