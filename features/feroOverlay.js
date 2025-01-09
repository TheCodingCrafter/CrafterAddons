import { chunkLoaded } from "../../BloomCore/utils/Utils"
import settings from "../config"

let feroRegex = /Ferocity: ⫽([0-9]+)/
let fero = 0

let mfRegex = /Magic Find: ✯([0-9]+)/
let mf = 0

register("step", () => {
    if (!settings().enable_fero_overlay) { return }
    const Tab = TabList?.getNames()?.map((name) => name.removeFormatting()).join(" ")
    const matchFero = Tab.match(feroRegex)
    const matchMF = Tab.match(mfRegex)
    if (matchFero) {
        fero = parseInt(matchFero[1])
    }
    if (matchMF) {
        mf = parseInt(matchMF[1])
    }
}).setFps(10)

register("renderOverlay", () => {
    if (!settings().enable_fero_overlay) { return }
    let t = new Text(`&cFerocity&r: ${fero}`, settings().fero_overlay_x, settings().fero_overlay_y).setScale(parseFloat(settings().fero_overlay_scale))

    t.draw()
})

register("renderOverlay", () => {
    if (!settings().enable_mf_overlay) { return }
    let t = new Text(`&bMagic Find&r: ${mf}`, settings().mf_overlay_x, settings().mf_overlay_y).setScale(parseFloat(settings().mf_overlay_scale))

    t.draw()
})

register("command", () => {
    const Tab = TabList?.getNames()?.map((name) => name.removeFormatting()).join(" ")
    ChatLib.chat(Tab)
}).setName("ca_dump_tab_names")
