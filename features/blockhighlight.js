import { renderBoxOutline } from "../../BloomCore/RenderUtils";
import settings from "../config"
let speed = 50

let h = 0
let s = 255
let v = 255
let lastRGB = Date.now()

register("step", () => { 
    if (!settings().rgb_block_highlight) return
    let now = Date.now()
    let delta = now - lastRGB
    let apply = speed * (delta / 1000)

    h += apply

    lastRGB = now
})

function HSVtoRGB(h, s, v) {
    let r, g, b, i, f, p, q, t
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h
    }

    i = Math.floor(h * 6)
    f = h * 6 - i
    p = v * (1 - s)
    q = v * (1 - f * s)
    t = v * (1 - (1 - f) * s)
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break
        case 1: r = q, g = v, b = p; break
        case 2: r = p, g = v, b = t; break
        case 3: r = p, g = q, b = v; break
        case 4: r = t, g = p, b = v; break
        case 5: r = v, g = p, b = q; break
    }
    return [r * 255, g * 255, b * 255]
}

register("drawBlockHighlight", (pos, event) => {
    if (!settings().rgb_block_highlight) return
    // get block at pos
    let block = World.getBlockAt(pos.x, pos.y, pos.z)

    if(block.type.name == "tile.air.name" || block.type.name == "Air") return

    cancel(event)

    let [r, g, b] = HSVtoRGB(h / 360, s / 255, v / 255)

    renderBoxOutline(pos.x + 0.5, pos.y, pos.z + 0.5, 1, 1, r / 255, g / 255, b / 255, 1, 2, false)
})