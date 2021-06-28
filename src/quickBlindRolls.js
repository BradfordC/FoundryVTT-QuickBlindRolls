import { LOG, modName, gmID } from "./scripts/utils.js";

Hooks.on("preCreateChatMessage", function(roll, data, options) {
    LOG.debug(roll.data, data);
    // Roll-type chat messages
    if(data.type === 5) {
        data.blind = true;
        data.whisper = [gmID()];
        roll.data.update(data);
    }
});

Hooks.once('devModeReady', ({registerPackageDebugFlag}) => {
    registerPackageDebugFlag(modName);
})