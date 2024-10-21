armor_stand = Java.type("net.minecraft.entity.item.EntityArmorStand")

import { registerWhen } from "../../BloomCore/utils/Utils"
import { renderFilledBox, renderBoxOutline } from "../../BloomCore/RenderUtils"
import settings from "../config"

registerWhen(register("renderWorld", () => {
    World.getAllEntitiesOfType(armor_stand.class).forEach((entity) => {
        let ename = entity.getName()
        if (ename.includes("Wither Key")) {
            let [r, g, b, a] = settings().wither_keys_color
            r = r / 255
            g = g / 255
            b = b / 255
            a = a / 255
            renderFilledBox(entity.getX(), entity.getY()+1, entity.getZ(), 1, 1, r, g, b, a*0.4, false)
            renderBoxOutline(entity.getX(), entity.getY()+1, entity.getZ(), 1, 1, r, g, b, a, 2, false)
        } else if (ename.includes("Blood Key")) {
            let [r, g, b, a] = settings().blood_keys_color
            r = r / 255
            g = g / 255
            b = b / 255
            a = a / 255
            renderFilledBox(entity.getX(), entity.getY()+1, entity.getZ(), 1, 1, r, g, b, a*0.4, false)
            renderBoxOutline(entity.getX(), entity.getY()+1, entity.getZ(), 1, 1, r, g, b, a, 2, false)
        }
    })
}), () => settings().highlight_dropped_keys)