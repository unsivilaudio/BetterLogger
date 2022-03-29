"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogColors = void 0;
const colors_1 = __importDefault(require("../statics/colors"));
var LogColors;
(function (LogColors) {
    LogColors["BRIGHT"] = "bright";
    LogColors["RED"] = "red";
    LogColors["GREEN"] = "green";
    LogColors["YELLOW"] = "yellow";
    LogColors["BLUE"] = "blue";
    LogColors["MAGENTA"] = "magenta";
    LogColors["CYAN"] = "cyan";
    LogColors["WHITE"] = "white";
})(LogColors = exports.LogColors || (exports.LogColors = {}));
function colorize(color, text) {
    let coloredString = '';
    switch (color) {
        case LogColors.BRIGHT:
            coloredString += colors_1.default.Bright;
            break;
        case LogColors.RED:
            coloredString += colors_1.default.FgRed;
            break;
        case LogColors.GREEN:
            coloredString += colors_1.default.FgGreen;
            break;
        case LogColors.YELLOW:
            coloredString += colors_1.default.FgYellow;
            break;
        case LogColors.BLUE:
            coloredString += colors_1.default.FgBlue;
            break;
        case LogColors.MAGENTA:
            coloredString += colors_1.default.FgMagenta;
            break;
        case LogColors.CYAN:
            coloredString += colors_1.default.FgCyan;
            break;
        case LogColors.WHITE:
            coloredString += colors_1.default.FgWhite;
            break;
        default:
            break;
    }
    if (coloredString.length) {
        return coloredString + text + colors_1.default.Reset;
    }
    return text;
}
exports.default = colorize;
