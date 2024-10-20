import settings from "../config"
import { sendPartyMessage } from "../util/chatUtil"

// ping command
let WaitingOnPing = false
let beginTime = 0
let endTime = 0
let pingCMD = false

let LastUsed = 0

// regex
const floor_regex = /([mf][1-7])/

// floor table
const floor_table = {
    "m1": "MASTER_CATACOMBS_FLOOR_ONE",
    "m2": "MASTER_CATACOMBS_FLOOR_TWO",
    "m3": "MASTER_CATACOMBS_FLOOR_THREE",
    "m4": "MASTER_CATACOMBS_FLOOR_FOUR",
    "m5": "MASTER_CATACOMBS_FLOOR_FIVE",
    "m6": "MASTER_CATACOMBS_FLOOR_SIX",
    "m7": "MASTER_CATACOMBS_FLOOR_SEVEN",

    "f1": "CATACOMBS_FLOOR_ONE",
    "f2": "CATACOMBS_FLOOR_TWO",
    "f3": "CATACOMBS_FLOOR_THREE",
    "f4": "CATACOMBS_FLOOR_FOUR",
    "f5": "CATACOMBS_FLOOR_FIVE",
    "f6": "CATACOMBS_FLOOR_SIX",
    "f7": "CATACOMBS_FLOOR_SEVEN"
}
   
function pingServer() {
    if (WaitingOnPing) {
        ChatLib.chat("&cAlready Pinging!")
        return
    }
    ChatLib.command("abcabcabcabcabcabcabcabcabcabcabcabc")
    WaitingOnPing = true
    beginTime = Date.now()
}

register("chat", (event) => {
    endTime = Date.now()
    let ping = endTime - beginTime
    WaitingOnPing = false
    if (!pingCMD) {
        ChatLib.chat(`&3Ping&r: &9${cping} &bms`)
    } else {
        pingCMD = false
        setTimeout(() => {
            ChatLib.command(`pc Ping > ${ping} ms`)
        }, parseInt(settings().party_command_delay))

    }
    cancel(event)
    beginTime = 0
    endTime = 0

}).setCriteria(`Unknown command. Type "/help" for help. ('abcabcabcabcabcabcabcabcabcabcabcabc')`)


register("command", () => {
    pingServer()
}).setName("ca_ping")

register("chat", (rank, name, msg, event) => {
    let diff = Date.now() - LastUsed
    if (diff < parseInt(settings().party_command_delay)) return
    LastUsed = Date.now()

    if (msg.startsWith(`${settings().party_command_prefix}rng`) && settings().enable_rng_command) { // RNG COMMAND
        // sleep for 200ms
        setTimeout(() => {
            let rng = Math.floor(Math.random() * 100)
            ChatLib.command(`pc ${name} has a ${rng}% chance for rng!`)
        }, parseInt(settings().party_command_delay))
    }
    else if (msg.startsWith(`${settings().party_command_prefix}dice`) && settings().enable_dice_command) { // DICE COMMAND
        setTimeout(() => {
            let dice = Math.floor(Math.random() * 6) + 1
            ChatLib.command(`pc ${name} rolled a ${dice}!`)
        }, parseInt(settings().party_command_delay))
    }
    else if (msg.startsWith(`${settings().party_command_prefix}8ball`) && settings().enable_8ball_command) { // 8BALL COMMAND
        let responses = [
            "It is certain.",
            "It is decidedly so.",
            "Without a doubt.",
            "Yes - definitely.",
            "You may rely on it.",
            "As I see it, yes.",
            "Most likely.",
            "Outlook good.",
            "Yes.",
            "Signs point to yes.",

            "Reply hazy, try again.",
            "Ask again later.",
            "Better not tell you now.",
            "Cannot predict now.",
            "Concentrate and ask again.",

            "Don't count on it.",
            "My reply is no.",
            "My sources say no.",
            "Outlook not so good.",
            "Very doubtful."
        ]
        setTimeout(() => {
            let response = responses[Math.floor(Math.random() * responses.length)]
            ChatLib.command(`pc ${response}`)
        }, parseInt(settings().party_command_delay))
    }
    else if (msg.startsWith(`${settings().party_command_prefix}ping`) && settings().enable_ping_command) { // PING COMMAND
        pingCMD = true
        pingServer()
    }
    else if ((msg.startsWith(`${settings().party_command_prefix}m`) || msg.startsWith(`${settings().party_command_prefix}f`)) && settings().enable_floor_command) { // FLOOR ENTRY COMMAND
        match = msg.match(floor_regex)
        if (!match) return

        let floor = match[0]
        let fcmd = floor_table[floor]
        if (!fcmd) return
        setTimeout(() => {
            ChatLib.command(`joininstance ${fcmd}`)
        }, parseInt(settings().party_command_delay))
    }
    else if (msg.startsWith(`${settings().party_command_prefix}ptme`) && settings().enable_ptme_command) { // PTME COMMAND
        setTimeout(() => {
            ChatLib.command(`p transfer ${name}`)
        }, parseInt(settings().party_command_delay))
    }
    else if (msg.startsWith(`${settings().party_command_prefix}warp`) && settings().enable_warp_command) { // WARP COMMAND
        setTimeout(() => {
            ChatLib.command(`p warp`)
        }, parseInt(settings().party_command_delay))
    }
    else if (msg.startsWith(`${settings().party_command_prefix}allinv`) && settings().enable_allinv_command) { // ALLINV COMMAND
        setTimeout(() => {
            ChatLib.command(`p settings allinvite`)
        }, parseInt(settings().party_command_delay))
    }
    else if (msg.startsWith(`${settings().party_command_prefix}tps`) && settings().enable_tps_command) { // TPS COMMAND
        requestedTPS = true
    }
}).setCriteria(/^Party > (?:\[([^\]]*?)\] )?(\w{1,16})(?: [♲ቾ⚒])?: (.+)$/)

