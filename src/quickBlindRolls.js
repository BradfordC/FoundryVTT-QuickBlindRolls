import { LOG, modName } from "./scripts/utils.js";
import { RollBlinder } from "./scripts/RollBlinder.js";
import { Settings } from "./scripts/Settings.js";

Hooks.on("init", () => {
    Settings.registerSettings();
});

Hooks.on("ready", () => {
    if(game.user.isGM) {
        Settings.resetMode();
    }
});

Hooks.on("preCreateChatMessage", function(chat, data) {
    // Roll-type chat messages
    LOG.debug("Here");
    if(data.type === 5 && RollBlinder.shouldBlind(chat, data)) {
        LOG.debug("There");
        RollBlinder.blindRoll(chat, data);
    }
    LOG.debug("Anywhere");
});

Hooks.on("renderChatLog", (app, html, data) => {
    LOG.debug("Render");
    if(game.user.isGM) {
        LOG.log("Adding Button");
        RollBlinder.addButton(html);
    }
    LOG.debug("Finish");
});

Hooks.once('devModeReady', ({registerPackageDebugFlag}) => {
    registerPackageDebugFlag(modName);
})