import showTitle from "../util/title";
import { printModMessage, sendPartyMessage } from "../util/chatUtil";
import settings from "../config";

register("chat", () => {
    if (settings().enable_blood_done_notify) {
        sendPartyMessage("Blood Done!")
    }
    if (!settings().enable_blood_done_title) return
    showTitle("&c&lBlood Done!", "", 1200)
    printModMessage("&cBlood Done!")
    World.playSound("note.pling", 100, 2)
}).setCriteria("&r&c[BOSS] The Watcher&r&f: You have proven yourself. You may pass.&r")