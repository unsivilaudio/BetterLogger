import colors from '../statics/colors';

/**
 * Available Colors
 * ================
 */
export enum LogColors {
    BRIGHT = 'bright',
    RED = 'red',
    GREEN = 'green',
    YELLOW = 'yellow',
    BLUE = 'blue',
    MAGENTA = 'magenta',
    CYAN = 'cyan',
    WHITE = 'white',
}

/**
 * Inject text with the colored string codes
 * =========================================
 * @param color - must match one of the predefined colors
 * @param text
 * @returns colored string
 */
function colorize(color: LogColors, text: string): string {
    let coloredString = '';
    switch (color) {
        case LogColors.BRIGHT:
            coloredString += colors.Bright;
            break;
        case LogColors.RED:
            coloredString += colors.FgRed;
            break;
        case LogColors.GREEN:
            coloredString += colors.FgGreen;
            break;
        case LogColors.YELLOW:
            coloredString += colors.FgYellow;
            break;
        case LogColors.BLUE:
            coloredString += colors.FgBlue;
            break;
        case LogColors.MAGENTA:
            coloredString += colors.FgMagenta;
            break;
        case LogColors.CYAN:
            coloredString += colors.FgCyan;
            break;
        case LogColors.WHITE:
            coloredString += colors.FgWhite;
            break;
        default:
            break;
    }

    if (coloredString.length) {
        return coloredString + text + colors.Reset;
    }

    return text;
}

export default colorize;
