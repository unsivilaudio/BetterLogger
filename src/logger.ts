import path from 'path';
import { writeFile } from './services/file-manager';
import LogTypes from './statics/types';
import colorize, { LogColors } from './util/colorize';

/**
 *  LogOptions
 *
 *  @param logfile - _optional_ - Log to file Default: FALSE,
 *  @param logPath - required with logfile enabled
 *  @param logUTC - use UTC timezone format for date string
 *  @param logColors - object - configure colors for logging
 *          info/error/warn/date strings
 */
export interface LogOptions {
    logFile?: boolean;
    logPath?: string;
    logUTC?: boolean;
    logColors?: {
        info: LogColors;
        error: LogColors;
        warn: LogColors;
        date: LogColors;
    };
}
/**
 *  Logger Class
 */
class Logger {
    private serviceName: string;
    private logFile: boolean;
    private logPath: string;
    private logUTC: true;
    private logColors: {
        info: LogColors;
        error: LogColors;
        warn: LogColors;
        date: LogColors;
    };

    /**
     * Logger Constuctor
     * @param serviceName
     * @param options
     * @return Logger
     */
    constructor(serviceName: string, options?: LogOptions) {
        this.serviceName = serviceName.toUpperCase();
        this.logFile = options?.logFile || false;
        this.logPath = options?.logPath || '';
        this.logUTC = options?.logUTC || true;
        this.logColors = {
            info: options?.logColors?.info || LogColors.YELLOW,
            error: options?.logColors?.error || LogColors.RED,
            warn: options?.logColors?.warn || LogColors.WHITE,
            date: options?.logColors?.date || LogColors.MAGENTA,
        };
    }
    /**
     * Warning Message to dispatch
     * @param message
     */
    warn(message: string) {
        const msg = this.build(LogTypes.WARN, message);
        this.dispatch(msg);
    }

    /**
     * Info Message to dispatch
     * @param message
     */
    info(message: string) {
        const msg = this.build(LogTypes.INFO, message);
        this.dispatch(msg);
    }

    /**
     * Error message to dispatch
     * @param message
     */
    error(message: string) {
        const msg = this.build(LogTypes.ERROR, message);
        this.dispatch(msg);
    }

    private build(type: LogTypes, message: string) {
        const { info, error, warn, date } = this.logColors;
        const now = this.logUTC
            ? new Date().toUTCString()
            : new Date().toLocaleString();
        const dateStr = colorize(date, `[${now.toUpperCase()}]`);
        let typeStr: string = type.toUpperCase();
        const serviceName = colorize(LogColors.GREEN, `[${this.serviceName}]`);
        switch (type) {
            case LogTypes.INFO:
                typeStr = colorize(info, `[${typeStr}]`);
                break;
            case LogTypes.ERROR:
                typeStr = colorize(error, `[${typeStr}]`);
                break;
            case LogTypes.WARN:
                typeStr = colorize(warn, `[${typeStr}]`);
                break;
        }

        return `${typeStr}${dateStr}${serviceName} ${message}`;
    }

    private dispatch(message: string) {
        console.log(message);
        if (this.logFile) {
            writeFile(
                path.join(this.logPath, this.serviceName + '.log'),
                message
            );
        }
    }
}

export default Logger;
