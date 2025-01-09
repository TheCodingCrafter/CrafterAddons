import renderBeaconBeam from "../../BeaconBeam";
import { getScoreboard } from "../../BloomCore/utils/Utils";
import showTitle from "../util/title";

import { renderFilledBox } from "../../BloomCore/RenderUtils";

import settings from "../config"

let waypoints = []

let p_regex = /^Party > (?:\[([^\]]*?)\] )?(\w{1,16})(?: [♲ቾ⚒])?: (.+)$/

let message_regex = /\[CA\] Vanquisher Spawned! x: (-?[0-9]+) y: (-?[0-9]+) z: (-?[0-9]+) \[⏣ (.+)\]/

let area_regex = /⏣ (.+)/

let weird_ass_char = '⚽' // WHY IS THIS IN EVERY SINGLE AREA NAME??

function getLoc() {
    let area = null
    let sb = getScoreboard()
    sb.forEach((line) => {
        let match = line.match(area_regex)
        if (match) {
            area = match[1].replace(weird_ass_char, '')
        }
    })
    return area
}


register("chat", (rank, name, msg, event) => {
    if (!settings().enable_vanq_receive) return
    msg_match = msg.match(message_regex)
    if (msg_match) {
        let x = parseInt(msg_match[1])
        let y = parseInt(msg_match[2])
        let z = parseInt(msg_match[3])
        let area = msg_match[4]

        let w = {
            x: x,
            y: y,
            z: z,
            player: name,
            area: area
        }

        waypoints.push(w)

        let Title = `&cVanquisher`
        let subtitle = `&cFrom: &6${name}`
        showTitle(Title, subtitle, 1200)
    }
}).setCriteria(p_regex)

register("renderWorld", () => {
    // loop through waypoints
    waypoints.forEach((w) => {
        let x = w.x
        let y = w.y
        let z = w.z

        let player = w.player
        let area = w.area


        let px = Player.getX()
        let py = Player.getY()
        let pz = Player.getZ()

        let dx = Math.abs(px - x)
        let dy = Math.abs(py - y)
        let dz = Math.abs(pz - z)

        let distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (distance < 5) {
            waypoints.splice(waypoints.indexOf(w), 1)
            return
        }

        renderBeaconBeam(x, y, z, 1, 1, 1, 1, false)
        renderFilledBox(x+0.5, y, z+0.5, 1, 1, 1, 1, 1, 0.5, true)
    })
})

function sendVanq() {
    if (!settings().enable_vanq_share) return
    let loc = getLoc()

    let x = parseInt(Player.getX())
    let y = parseInt(Player.getY())
    let z = parseInt(Player.getZ())
    
    let msg = `[CA] Vanquisher Spawned! x: ${x} y: ${y} z: ${z} [⏣ ${loc}]`
    ChatLib.command(`pc ${msg}`)
}

register("chat", sendVanq).setCriteria("A Vanquisher is spawning nearby!")
register("command", sendVanq).setName("sendv")