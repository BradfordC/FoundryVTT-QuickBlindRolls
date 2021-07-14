import { LOG } from "./utils.js";
import { Settings } from "./Settings.js";

export const NORMAL = "Normal";
export const BLIND_ONCE = "BlindOnce";
export const BLIND_ALL = "BlindAll";

export class RollBlinder {
    static addButton(html) {
        html.find('div.control-buttons').prepend(`<a class="button qbr-mode" title="Toggle Blind Rolls"><i class="fa fa-eye"></i></a>`);
        const fontWidth = parseInt(html.find('div.control-buttons').css('flex-basis')) + 24;
        html.find('div.control-buttons').css("flex-basis", fontWidth);

        html.on('click', 'a.qbr-mode', RollBlinder.buttonClicked.bind());
        html.on('contextmenu', 'a.qbr-mode', RollBlinder.buttonClicked.bind());
    }

    static refreshButton(mode) {
        let icon = `fa fa-eye`;
        switch(mode) {
            case NORMAL:
                icon = 'fa fa-eye';
                break;
            case BLIND_ONCE:
                icon = 'fa fa-eye-slash';
                break;
            case BLIND_ALL:
                icon = 'fa fa-eye-slash';
        }

        //html.find('select.roll-type-select').prop('disabled', RollBlinder.mode === BLIND);
        ui.chat.element.find('a.button.qbr-mode').replaceWith(`<a class="button qbr-mode" title="Toggle Blind Rolls"><i class="${icon}"></i></a>`);
    }

    static buttonClicked(event) {
        let mode = Settings.getMode();
        mode = (mode === BLIND_ALL) ? NORMAL : BLIND_ALL;
        // if(event.type === "click") {
        //     // Left Click
        //     if(mode !== BLIND_ALL) {
        //         mode = (mode === BLIND_ONCE) ? NORMAL : BLIND_ONCE;
        //     }
        // }
        // else {
        //     // Right Click
        //     mode = (mode === BLIND_ALL) ? NORMAL : BLIND_ALL;
        // }
        Settings.setMode(mode);
        RollBlinder.refreshButton(mode);
    }

    static shouldBlind(roll, data) {
        // Don't blind rolls that are already private
        if(roll.data.whisper.length > 0) {
            return false;
        }
        return Settings.getMode() === BLIND_ONCE || Settings.getMode() === BLIND_ALL;
    }

    static blindRoll(roll, data) {
        LOG.debug("Everywhere.");
        data.blind = true;
        data.whisper = ChatMessage.getWhisperRecipients("GM").map(u => u.id);
        data.flavor = '<i class="fas fa-eye-slash" title="Quick Blinded"/>' + (data.flavor ? "<br>" + data.flavor : "");
        roll.data.update(data);
        LOG.debug("Before");
        if(Settings.getMode() === BLIND_ONCE) {
            LOG.debug("During");
            Settings.setMode(NORMAL);
            RollBlinder.refreshButton(NORMAL);
        }
        LOG.debug("After");
    }
}