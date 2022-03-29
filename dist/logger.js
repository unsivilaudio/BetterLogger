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
const path_1 = __importDefault(require("path"));
const file_manager_1 = require("./services/file-manager");
const types_1 = __importDefault(require("./statics/types"));
const colorize_1 = __importStar(require("./util/colorize"));
class Logger {
    constructor(serviceName, options) {
        this.serviceName = serviceName;
        this.logFile = options?.logFile || false;
        this.logPath = options?.logPath || '';
        this.logUTC = options?.logUTC || true;
        this.logColors = {
            info: options?.logColors?.info || colorize_1.LogColors.YELLOW,
            error: options?.logColors?.error || colorize_1.LogColors.RED,
            warn: options?.logColors?.warn || colorize_1.LogColors.WHITE,
            date: options?.logColors?.date || colorize_1.LogColors.MAGENTA,
        };
    }
    warn(message) {
        const msg = this.build(types_1.default.WARN, message);
        this.dispatch(msg);
    }
    info(message) {
        const msg = this.build(types_1.default.INFO, message);
        this.dispatch(msg);
    }
    error(message) {
        const msg = this.build(types_1.default.ERROR, message);
        this.dispatch(msg);
    }
    build(type, message) {
        const { info, error, warn, date } = this.logColors;
        const now = this.logUTC
            ? new Date().toUTCString()
            : new Date().toString();
        const dateStr = (0, colorize_1.default)(date, `[${now}]`);
        let typeStr = type.toUpperCase();
        const serviceName = (0, colorize_1.default)(colorize_1.LogColors.GREEN, `[${this.serviceName}]`);
        switch (type) {
            case types_1.default.INFO:
                typeStr = (0, colorize_1.default)(info, `[${typeStr}]`);
                break;
            case types_1.default.ERROR:
                typeStr = (0, colorize_1.default)(error, `[${typeStr}]`);
                break;
            case types_1.default.WARN:
                typeStr = (0, colorize_1.default)(warn, `[${typeStr}]`);
                break;
        }
        return `${typeStr}${dateStr}${serviceName} ${message}`;
    }
    dispatch(message) {
        console.log(message);
        if (this.logFile) {
            (0, file_manager_1.writeFile)(path_1.default.join(this.logPath, this.serviceName + '.log'), message);
        }
    }
}
exports.default = Logger;
