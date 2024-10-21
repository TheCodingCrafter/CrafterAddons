import settings from "../config";
import { registerWhen } from "../../BloomCore/utils/Utils";

function padFloat(str) {
    const num = parseFloat(str);
    return String(num.toFixed(2).padEnd(4, '0'));
}

registerWhen(register("renderOverlay", renderMaskTimer), () => settings().enable_mask_timers);
let maskTimer = 0;
const maskTimerDisplay = new Text("", 473, 265).setColor(Renderer.GREEN);
maskTimerDisplay.setScale(2)

function renderMaskTimer() {
    if (maskTimer > 0) {
        maskTimerDisplay.draw();
    }
}

function updatemaskTimersSettings() {
    maskTimerDisplay.setX(parseInt(settings().mask_timers_x_loc))
    maskTimerDisplay.setY(parseInt(settings().mask_timers_y_loc))
    maskTimerDisplay.setScale(parseFloat(settings().mask_timers_scale))
}


registerWhen(register("tick", onTickFunc), () => settings().enable_mask_timers);
function onTickFunc() {

    if (maskTimer > 0) {
        maskTimer--;
    }
    // manage color
    if (maskTimer > 40) {
        maskTimerDisplay.setColor(Renderer.GREEN)
    } else if (maskTimer > 20) {
        maskTimerDisplay.setColor(Renderer.YELLOW)
    } else {
        maskTimerDisplay.setColor(Renderer.RED)
    }

    maskTimerDisplay.setString(padFloat(String(maskTimer / 20)))
}

register("command", (ticks) => {
    updatemaskTimersSettings();
    if (!settings().enable_mask_timers) { return; }
    maskTimer = parseInt(ticks);
    
    if (maskTimer > 40) {
        maskTimerDisplay.setColor(Renderer.GREEN)
    } else if (maskTimer > 20) {
        maskTimerDisplay.setColor(Renderer.YELLOW)
    } else {
        maskTimerDisplay.setColor(Renderer.RED)
    }
}).setName("cadebug_setmasktimer");


// triggers to detect mask pops
register("chat", (event) => {
    updatemaskTimersSettings();
    if (!settings().enable_mask_timers) { return; }
    maskTimer = 60;
    maskTimerDisplay.setColor(Renderer.GREEN)
}).setCriteria("&r&6Second Wind Activated&r&a! &r&aYour Spirit Mask saved your life!&r");

register("chat", (event) => {
    updatemaskTimersSettings();
    if (!settings().enable_mask_timers) { return; }
    maskTimer = 60;
    maskTimerDisplay.setColor(Renderer.GREEN)
}).setCriteria("&r&aYour &r&9⚚ Bonzo's Mask &r&asaved your life!&r");

register("chat", (event) => {
    updatemaskTimersSettings();
    if (!settings().enable_mask_timers) { return; }

    maskTimer = parseInt(((parseInt(settings().phoenix_pet_lvl) * 0.02) + 2) * 20);
    maskTimerDisplay.setColor(Renderer.GREEN)
}).setCriteria("&r&eYour &r&cPhoenix Pet &r&esaved you from certain death!&r");