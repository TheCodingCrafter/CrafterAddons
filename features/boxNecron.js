import settings from '../config';
import { registerWhen } from '../../BloomCore/utils/Utils';
import { renderBoxOutline, renderFilledBox } from '../../BloomCore/RenderUtils';
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
            if (settings().box_necron_type == 0) {
                renderBoxOutline(entity.getX(), entity.getY()-3.5, entity.getZ(), 2, 2.8, r, g, b, a, 2, false)
            } else if (settings().box_necron_type == 1) {
                renderFilledBox(entity.getX(), entity.getY()-3.5, entity.getZ(), 1.35, 2.8, r, g, b, a, false)
            } else if (settings().box_necron_type == 2) {
                renderBoxOutline(entity.getX(), entity.getY()-3.5, entity.getZ(), 1.35, 2.8, r, g, b, a, 2, false)
                renderFilledBox(entity.getX(), entity.getY()-3.5, entity.getZ(), 1.35, 2.8, r, g, b, a*0.5, false)
            }
        }
    })
        
}), () => settings().enable_box_necron)