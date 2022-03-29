import { LogColors } from './util/colorize';
export interface LogOptions {
    logFile: boolean;
    logPath: string;
    logUTC: boolean;
    logColors?: {
        info: LogColors;
        error: LogColors;
        warn: LogColors;
        date: LogColors;
    };
}
declare class Logger {
    private serviceName;
    private logFile;
    private logPath;
    private logUTC;
    private logColors;
    constructor(serviceName: string, options?: LogOptions);
    warn(message: string): void;
    info(message: string): void;
    error(message: string): void;
    private build;
    private dispatch;
}
export default Logger;
