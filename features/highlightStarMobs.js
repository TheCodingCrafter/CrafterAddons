armor_stand = Java.type("net.minecraft.entity.item.EntityArmorStand")
other_player_mp = Java.type("net.minecraft.client.entity.EntityOtherPlayerMP")

import { renderBoxOutline, renderFilledBox } from "../../BloomCore/RenderUtils"
import { registerWhen } from "../../BloomCore/utils/Utils"
import settings from "../config"

const starMobRegex = /^§6✯ (?:§.)*(.+)§r.+§c❤$|^(Shadow Assassin)$/


class Mob { 
    constructor(x, y, z, height, ceil_height, color, isFels) {
        this.x = x
        this.y = y
        this.z = z 
        this.height = height
        this.ceil_height = ceil_height
        this.r = color[0] / 255
        this.g = color[1] / 255
        this.b = color[2] / 255
        this.a = color[3] / 255
        this.isFels = isFels
    }
}

let mobs = []

registerWhen(register("tick", () => {
    star = []

    World.getAllEntities().forEach(entity => {
        const match = entity.getName().match(starMobRegex)
        if (!match && settings().enable_highlight_starred_mobs_fels && entity.getName().includes("Fels")) {
            mob = new Mob(entity.getX(), entity.getY(), entity.getZ(), 0.8, 0, settings().starred_mobs_highlight_color_fels, true)
            star.push(mob)
            return
        }
        if (!match) return false

        const [_, mobName, sa] = match

        let height = 1.9
        let ceil_height = 0
        let fels = false

        if (!sa) {
            if (/^(?:\w+ )*Fels$/.test(mobName)) {
                height = 0.8
                fels = true
            }
            else if (/^(?:\w+ )*Withermancer$/.test(mobName)) height = 2.8
            ceil_height = Math.ceil(height)
        } else { return false }

        col = fels ? settings().starred_mobs_highlight_color_fels : settings().starred_mobs_highlight_color
        mob = new Mob(entity.getX(), entity.getY(), entity.getZ(), height, ceil_height, col, fels)
        star.push(mob)
    })

    World.getAllEntitiesOfType(other_player_mp.class).forEach(entity => { // for sa
        let mobname = entity.getName()
        if (mobname.includes("Shadow Assassin") && !entity.isInvisible()) {
            mob = new Mob(entity.getX(), entity.getY(), entity.getZ(), 1.9, 0, settings().starred_mobs_highlight_color, false)
            star.push(mob)
        }
    })

    mobs = star
}), () => settings().enable_highlight_starred_mobs)


registerWhen(register("renderWorld", () => {
    if (!mobs.length) {return}
    mobs.forEach(mob => {
        y = mob.isFels ? mob.y - 3 : mob.y - mob.ceil_height
        if (settings().starred_mobs_highlight_type == 0) renderBoxOutline(mob.x, y, mob.z, 0.8, mob.height, mob.r, mob.g, mob.b, mob.a, parseInt(settings().starred_mobs_highlight_width), false)
        else if (settings().starred_mobs_highlight_type == 1) renderFilledBox(mob.x, y, mob.z, 0.8, mob.height, mob.r, mob.g, mob.b, mob.a * 0.4, false)
        else if (settings().starred_mobs_highlight_type == 2) {
            renderBoxOutline(mob.x, y, mob.z, 0.8, mob.height, mob.r, mob.g, mob.b, mob.a, parseInt(settings().starred_mobs_highlight_width), false)
            renderFilledBox(mob.x, y, mob.z, 0.8, mob.height, mob.r, mob.g, mob.b, mob.a * 0.4, false)
        }
    })
}), () => settings().enable_highlight_starred_mobs)