import settings from "../config"
import showTitle from "../util/title"
import Dungeon from "../../BloomCore/dungeons/Dungeon"

register("chat", (name) => {
    if (!settings().enable_announce_leap) return
    if (settings().enable_announce_leap_boss && !Dungeon.bossEntry) return
    ChatLib.command(`pc Leaped to ${name}!`)
}).setCriteria("You have teleported to ${name}!")

// thx azured
register('chat', (from, to, event) => {
    if (!settings().enable_leap_title) return
    if (settings().enable_leap_title_boss && !Dungeon.bossEntry) return
    if (to == Player.getName()) {
        showTitle(`&aLeaped!`, "", 800)
        World.playSound("note.pling", 1, 2)
    }
}).setCriteria(/Party > (?:\[.+\])? ?(.+) ?[ቾ⚒]?: Leaped to ([^! \n]+)!?/)