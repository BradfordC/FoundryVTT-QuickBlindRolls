import { LOG, modName } from "./scripts/utils.js";

Hooks.on("ready", function() {
    LOG.debug(ChatMessage.getWhisperRecipients("GM"));
});

Hooks.on("preCreateChatMessage", function(roll, data, options) {
    LOG.debug(roll.data, data);
    // Roll-type chat messages
    if(data.type === 5) {
        data.blind = true;
        data.whisper = ChatMessage.getWhisperRecipients("GM").map(u => u.id);
        roll.data.update(data);
    }
});

Hooks.once('devModeReady', ({registerPackageDebugFlag}) => {
    registerPackageDebugFlag(modName);
})