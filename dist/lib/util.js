"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.radiansToDegrees = exports.degreesToRadians = exports.clampToRadians = exports.roundToPrecision = exports.randomRadians = exports.randomInt = exports.random = void 0;
const Geometry_1 = require("./Geometry");
function random(max = 1, min = 0, precision = Geometry_1.PRECISION) {
    return roundToPrecision(Math.random() * (max - min) + min, precision);
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
function roundToPrecision(number, precision = Geometry_1.PRECISION) {
    const resolution = 10 ** precision;
    return Math.round(number * resolution) / resolution;
}
exports.roundToPrecision = roundToPrecision;
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
