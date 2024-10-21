import { renderBoxOutline, renderFilledBox } from "../../BloomCore/RenderUtils";
import { getEtherwarpBlockSuccess, holdingAOTV, registerWhen } from "../../BloomCore/utils/Utils";

import settings from "../config";


// most of this is ripped from bloom :3
registerWhen(register("renderWorld", () => {
    if (settings().etherwarp_overlay_sneak && !Player.isSneaking()) return
    if (!holdingAOTV()) return

    const [success, endBlock] = getEtherwarpBlockSuccess(Config.etherwarpSyncWithServer, 61)
    if ((!success && !settings().etherwarp_overlay_show_fail) || endBlock == null) return

    const [x, y, z] = endBlock
    let [r, g, b, a] = [settings().etherwarp_overlay_color[0], settings().etherwarp_overlay_color[1], settings().etherwarp_overlay_color[2], settings().etherwarp_overlay_color[3]]
    if (!success) {
        r = settings().etherwarp_overlay_fail_color[0] / 255
        g = settings().etherwarp_overlay_fail_color[1] / 255
        b = settings().etherwarp_overlay_fail_color[2] / 255
        a = settings().etherwarp_overlay_fail_color[3] / 255
    } else {
        r = r / 255
        g = g / 255
        b = b / 255
        a = a / 255
    }
 
    if (settings().etherwarp_overlay_render_type == 0) renderBoxOutline(x+0.5, y-0.005, z+0.5, 1.005, 1.01, r, g, b, a, 3, false)
    else if (settings().etherwarp_overlay_render_type == 1) renderFilledBox(x+0.5, y-0.005, z+0.5, 1.005, 1.01, r, g, b, a, false)
    else if (settings().etherwarp_overlay_render_type == 2) {
        renderBoxOutline(x+0.5, y-0.005, z+0.5, 1.005, 1.01, r, g, b, a, 3, false)
        renderFilledBox(x+0.5, y-0.005, z+0.5, 1.005, 1.01, r, g, b, a*0.4, false)
    }
    
}), () => settings().enable_etherwarp_overlay)