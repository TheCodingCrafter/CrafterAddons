import Settings from "../config";


register("renderOverlay", renderDragTimer);
let dragTimer = 0;
const dragTimerDisplay = new Text("", 464, 225).setColor(Renderer.WHITE);
updateDragTimersSettings();

function renderDragTimer() {
    if (dragTimer > 0 && Settings.enableDragTimers) {
        dragTimerDisplay.draw();
    }
}

function updatePos() {
    let xOffset = Renderer.getStringWidth(dragTimerDisplay.getString()) / 2

    dragTimerDisplay.setX(parseInt(Settings.dragTimersXLoc) + xOffset)
}

function updateDragTimersSettings() {
    if (!Settings.updateDragTimers) { return; }
    dragTimerDisplay.setX(parseInt(Settings.dragTimersXLoc))
    dragTimerDisplay.setY(parseInt(Settings.dragTimersYLoc))
    dragTimerDisplay.setScale(parseFloat(Settings.dragTimersScale))
    Settings.updatedragTimers = false; // settings are synced, disable updating
}


register("tick", onTickFunc);
function onTickFunc() {
    if (!Settings.enableDragTimers) { return; }
    if (dragTimer > 0) {
        dragTimer--;
    }

    if (dragTimer > 20) {
        dragTimerDisplay.setColor(Renderer.GREEN)
    } else {
        dragTimerDisplay.setColor(Renderer.RED)
    }

    let s = String(parseInt(String((dragTimer / 20) * 1000)) + " ms")
    dragTimerDisplay.setString(s)

    updatePos();
}

register("command", (ticks) => {
    updateDragTimersSettings();
    dragTimer = parseInt(ticks)

    if (dragTimer > 20) {
        dragTimerDisplay.setColor(Renderer.GREEN)
    } else {
        dragTimerDisplay.setColor(Renderer.RED)
    }
}).setName("cadebug_setdragtimer");