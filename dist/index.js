"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.util = exports.Vector = exports.Triangle = exports.Row = exports.Rectangle = exports.Point = exports.Path = exports.Line = exports.Grid = exports.Circle = exports.Angle = exports.Geometry = void 0;
var Geometry_1 = require("./lib/Geometry");
Object.defineProperty(exports, "Geometry", { enumerable: true, get: function () { return __importDefault(Geometry_1).default; } });
var Angle_1 = require("./lib/Angle");
Object.defineProperty(exports, "Angle", { enumerable: true, get: function () { return __importDefault(Angle_1).default; } });
var Circle_1 = require("./lib/Circle");
Object.defineProperty(exports, "Circle", { enumerable: true, get: function () { return __importDefault(Circle_1).default; } });
var Grid_1 = require("./lib/Grid");
Object.defineProperty(exports, "Grid", { enumerable: true, get: function () { return __importDefault(Grid_1).default; } });
var Line_1 = require("./lib/Line");
Object.defineProperty(exports, "Line", { enumerable: true, get: function () { return __importDefault(Line_1).default; } });
var Path_1 = require("./lib/Path");
Object.defineProperty(exports, "Path", { enumerable: true, get: function () { return __importDefault(Path_1).default; } });
var Point_1 = require("./lib/Point");
Object.defineProperty(exports, "Point", { enumerable: true, get: function () { return __importDefault(Point_1).default; } });
var Rectangle_1 = require("./lib/Rectangle");
Object.defineProperty(exports, "Rectangle", { enumerable: true, get: function () { return __importDefault(Rectangle_1).default; } });
var Row_1 = require("./lib/Row");
Object.defineProperty(exports, "Row", { enumerable: true, get: function () { return __importDefault(Row_1).default; } });
var Triangle_1 = require("./lib/Triangle");
Object.defineProperty(exports, "Triangle", { enumerable: true, get: function () { return __importDefault(Triangle_1).default; } });
var Vector_1 = require("./lib/Vector");
Object.defineProperty(exports, "Vector", { enumerable: true, get: function () { return __importDefault(Vector_1).default; } });
exports.util = __importStar(require("./lib/util"));
