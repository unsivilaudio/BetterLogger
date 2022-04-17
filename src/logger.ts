import path from 'path';
import { writeFile } from './services/file-manager';
import LogTypes from './statics/types';
import colorize, { LogColors } from './util/colorize';

/**
 *  LogOptions
 *
 *  @param file - _optional_ - Log to file Default: FALSE,
 *  @param path - _optional*_ - required with logfile enabled
 *  @param UTC - _optional_ - use UTC timezone format for date string
 *  @param colors - _optional_ - object - configure colors for logging
 *          info/error/warn/date strings
 */
export interface LogOptions {
    file?: boolean;
    path?: string;
    UTC?: boolean;
    colors?: {
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
    private file: boolean;
    private path: string;
    private UTC: boolean;
    private colors: {
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
        this.file = options?.file || false;
        this.path = options?.path || '';
        this.UTC = options?.UTC || true;
        this.colors = {
            info: options?.colors?.info || LogColors.YELLOW,
            error: options?.colors?.error || LogColors.RED,
            warn: options?.colors?.warn || LogColors.WHITE,
            date: options?.colors?.date || LogColors.MAGENTA,
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
        const { info, error, warn, date } = this.colors;
        const now = this.UTC
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
        if (this.file) {
            writeFile(path.join(this.path, this.serviceName + '.log'), message);
        }
    }
}

export default Logger;
