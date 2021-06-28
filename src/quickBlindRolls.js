import { LOG, modName } from "./scripts/utils.js";

Hooks.on("ready", function() {
    LOG.log("Log");
    LOG.warn("Warn");
    LOG.error("Error");
    LOG.debug("Debug");
});

Hooks.once('devModeReady', ({registerPackageDebugFlag}) => {
    registerPackageDebugFlag(modName);
})