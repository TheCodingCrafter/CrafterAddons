import { printErrorMessage } from "../util/chatUtil"
import settings from "../config"
import { renderCenteredString } from "../../BloomCore/utils/Utils"

const rank_mapping = {
    "": ["", "7"],
    "VIP": ["VIP", "a"],
    "VIP+": ["VIP&6+", "a"],
    "MVP": ["MVP", "b"],
    "MVP+": ["MVP&c+", "b"],
    "MVP++": ["MVP&c++", "6"], // TODO: account for + color
    "YOUTUBE": ["&fYOUTUBE", "c"],
    "GM": ["GM", "2"],
    "ADMIN": ["ADMIN", "c"],
    "OWNER": ["OWNER", "c"],

}

function playDingSound() {
    if (settings().enable_chat_sound) {
        World.playSound(settings().chat_sound, 1, 1)
    }
}

register("chat", (rank, name, msg, event) => {
    playDingSound()
    if (!settings().enable_party_chat_prefix) { return }

    //name = name + iman
    //name = name.replace("♲", "&7♲")
    

    if (!(rank in rank_mapping)) {
        //printErrorMessage("Error occured whilst parsing chat message, failed to parse rank correctly.")
        // TODO: redo this with regex so it works right
        return
    }
    let rm = rank_mapping[rank] || []
   
    let rname = rm[0] // rank name
    let rc = rm[1] // rank color
    let res = settings().party_chat_format
    // very very bad
    res = res.replace(/\${name}/gm, name)
    res = res.replace(/\${color}/gm, rc)
    res = res.replace(/\${rank_name}/gm, rname)
    res = res.replace(/\${message}/gm, msg)

    ChatLib.chat(res)
    cancel(event)
}).setCriteria(/^Party > (?:\[([^\]]*?)\] )?(\w{1,16})(?: [♲ቾ⚒])?: (.+)$/)



register("chat", (rank, name, grank, msg, event) => {
    playDingSound()
    if (!settings().enable_guild_chat_prefix) { return }


    if (!(rank in rank_mapping)) {
        if (name in rank_mapping) {
            _rank = ""
            _name = rank
            _grank = name
            _msg = grank

            rank = _rank
            name = _name
            grank = _grank
            msg = _msg // TODO: fix this

        }
    }
    let rm = rank_mapping[rank] || []

    // remove [ and ] from guild rank
    grank = grank.replace("[", "").replace("]", "").replace(" ", "")
    
    let rname = rm[0] // rank name
    let rc = rm[1] // rank color
    let res = settings().guild_chat_format
    // very very bad
    res = res.replace(/\${name}/gm, name)
    res = res.replace(/\${color}/gm, rc)
    res = res.replace(/\${rank_name}/gm, rname)
    res = res.replace(/\${message}/gm, msg)
    res = res.replace(/\${guild_rank}/gm, grank)
    ChatLib.chat(res)
    cancel(event)
}).setCriteria(/^Guild > (?:\[([^\]]*?)\] )?(\w{1,16})?([^:]{1,32})(?: [♲ቾ⚒])?: (.+)$/)