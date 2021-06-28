export const modName = "quick-blind-rolls";
export const modTitle = "QuickBlindRolls";

export class LOG {
    static log(...args) {
        args = [modTitle, "|"].concat(args);
        console.log(...args);
    }

    static warn(...args) {
        args = [modTitle, "|"].concat(args);
        console.warn(...args);
    }

    static error(...args) {
        args = [modTitle, "|"].concat(args);
        console.error(...args);
    }

    static debug(...args) {
        const devMode = window.DEV?.getPackageDebugValue(modName);
        if(devMode) {
            args = [modTitle, "|"].concat(args);
            console.debug(...args);
        }
    }
}