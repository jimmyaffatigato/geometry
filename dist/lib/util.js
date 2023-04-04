"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.radiansToDegrees = exports.degreesToRadians = exports.clampToRadians = exports.randomRadians = exports.randomInt = exports.random = void 0;
function random(max = 1, min = 0) {
    return Math.random() * (max - min) + min;
}
exports.random = random;
function randomInt(max = 1, min = 0) {
    max = Math.floor(max);
    min = Math.floor(min);
    return Math.ceil(Math.random() * (max - min)) + min;
}
exports.randomInt = randomInt;
//
const MAXRAD = Math.PI * 2;
const MINRAD = -MAXRAD;
function randomRadians() {
    return random(MAXRAD, MINRAD);
}
exports.randomRadians = randomRadians;
function clampToRadians(radians) {
    if (radians > MAXRAD)
        return radians % MAXRAD;
    if (radians < MINRAD)
        return radians % MINRAD;
    return radians;
}
exports.clampToRadians = clampToRadians;
// Angle
function degreesToRadians(degrees) {
    return (Math.PI / 180) * degrees;
}
exports.degreesToRadians = degreesToRadians;
function radiansToDegrees(radians) {
    return radians / (Math.PI / 180);
}
exports.radiansToDegrees = radiansToDegrees;
