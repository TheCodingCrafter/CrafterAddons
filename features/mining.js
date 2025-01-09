import showTitle from "../util/title";
import settings from "../config";

register("chat", (type, amt, event) => {
    let a = parseInt(amt)
    if (settings().enable_pristine_title) {
        showTitle(`&d&l☘ ${a}`, "", 1000)
    }

    if (settings().enable_pristine_chat) {
        cancel(event)
        ChatLib.chat(`&d&lPRISTINE ☘ ${a} &8(&a${type}&8)`)
    }
    
}).setCriteria(/PRISTINE! You found .?(.+) x([0-9]+)!/)

register("chat", (type, amt, event) => {
    let a = parseInt(amt)
    if (parseInt(settings().pristine_high_proc) == -1) return

    if (a >= parseInt(settings().pristine_high_proc)) {
        showTitle(`&d&l☘ ${a}`, "", 1000)
    }
}).setCriteria(/PRISTINE! You found .?(.+) x([0-9]+)!/)

