import settings from '../config';
import { registerWhen } from '../../BloomCore/utils/Utils';
import { renderBoxOutline, renderFilledBox } from '../../BloomCore/RenderUtils';
armor_stand = Java.type("net.minecraft.entity.item.EntityArmorStand")


registerWhen(register("renderWorld", () => {
    World.getAllEntitiesOfType(armor_stand.class).forEach(entity => {
        if (entity.getName().includes("Flare")) {
            let r = settings().flare_highlight_color[0] / 255
            let g = settings().flare_highlight_color[1] / 255
            let b = settings().flare_highlight_color[2] / 255
            let a = settings().flare_highlight_color[3] / 255
            renderBoxOutline(entity.getX(), entity.getY()-4, entity.getZ(), 1, 4, r, g, b, a, 2, false)
        }
    })
        
}), () => settings().enable_flare_highlight)