import { printModMessage, sendPartyMessage } from "../util/chatUtil";
import showTitle from "../util/title";

import settings from "../config"

function NotifyParty(msg) {
    if (!settings().enable_notify_party_mask) { return }
    sendPartyMessage(msg)
}

// triggers to detect mask pops
// SPIRIT MASK
register("chat", (event) => {
    if (!settings().enable_mask_notifications) { return; }
    printModMessage("&6Spirit Mask Activated") // send chat msg
    cancel(event);
    showTitle("&6&lSpirit Mask Popped!", "", 1000) // send title and play sound
    World.playSound("note.pling", 100, 2)
    NotifyParty("Spirit Mask Activated (3s)")
}).setCriteria("&r&6Second Wind Activated&r&a! &r&aYour Spirit Mask saved your life!&r");


// BONZO MASK
register("chat", (event) => {
    if (!settings().enable_mask_notifications) { return; }
    printModMessage("&9Bonzo Mask Activated") // send chat msg
    cancel(event);
    showTitle("&9&lBonzo Mask Popped!", "", 1000) // send title and play sound
    World.playSound("note.pling", 100, 2)
    NotifyParty("Bonzo Mask Activated (3s)")
}).setCriteria("&r&aYour &r&9⚚ Bonzo's Mask &r&asaved your life!&r");

// second one because hypixel is dumb (account for both fragged and un-fragged)
register("chat", (event) => {
    if (!settings().enable_mask_notifications) { return; }
    printModMessage("&9Bonzo Mask Activated") // send chat msg
    cancel(event);
    showTitle("&9&lBonzo Mask Popped!", "", 1000) // send title and play sound
    World.playSound("note.pling", 100, 2)
    NotifyParty("Bonzo Mask Activated (3s)")
}).setCriteria("&r&aYour &r&9Bonzo's Mask &r&asaved your life!&r");


// PHOENIX PET
register("chat", (event) => {
    if (!settings().enable_mask_notifications) { return; }
    printModMessage("&5Phoenix Pet Activated") // send chat msg
    cancel(event);
    showTitle("&5&lPhoenix Popped!", "", 1000) // send title and play sound
    World.playSound("note.pling", 100, 2)
    let time = ((parseInt(settings().phoenix_pet_lvl) * 0.02) + 2)
    NotifyParty(`Phoenix Pet Activated (${time}s)`)
}).setCriteria("&r&eYour &r&cPhoenix Pet &r&esaved you from certain death!&r");

