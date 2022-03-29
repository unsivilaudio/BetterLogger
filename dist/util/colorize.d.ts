export declare enum LogColors {
    BRIGHT = "bright",
    RED = "red",
    GREEN = "green",
    YELLOW = "yellow",
    BLUE = "blue",
    MAGENTA = "magenta",
    CYAN = "cyan",
    WHITE = "white"
}
declare function colorize(color: LogColors, text: string): string;
export default colorize;
