import { modName } from "./utils.js";
import { NORMAL } from "./RollBlinder.js";

const currentMode = "Mode";

export class Settings {
    static getMode() {
        return game.settings.get(modName, currentMode);
    }

    static setMode(mode) {
        game.settings.set(modName, currentMode, mode);
    }

    static resetMode() {
        Settings.setMode(NORMAL);
    }

    static registerSettings() {
        game.settings.register(modName, currentMode, {
            scope: "world",
            config: false,
            default: NORMAL
        });
    }
}