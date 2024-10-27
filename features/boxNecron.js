import settings from '../config';
import { registerWhen } from '../../BloomCore/utils/Utils';
import { renderBoxOutline } from '../../BloomCore/RenderUtils';
armor_stand = Java.type("net.minecraft.entity.item.EntityArmorStand")

let WitherNames = [
    "Maxor",
    "Storm",
    "Goldor",
    "Necron"
]

registerWhen(register("renderWorld", () => {
    World.getAllEntitiesOfType(armor_stand.class).forEach(entity => {
        let draw = false
        for (let name of WitherNames) {
            if (entity.getName().includes(name) && !entity.getName().includes("Stormy")) {
                draw = true
                break
            }
        }

        if (draw) {
            let r = settings().box_necron_color[0] / 255
            let g = settings().box_necron_color[1] / 255
            let b = settings().box_necron_color[2] / 255
            let a = settings().box_necron_color[3] / 255

            renderBoxOutline(entity.getX(), entity.getY()-3.5, entity.getZ(), 2, 2.6, r, g, b, a, 2, false)
        }
    })
        
}), () => settings().enable_box_necron)