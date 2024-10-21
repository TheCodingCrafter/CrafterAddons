import drawBox from "../util/worldDrawing"
import settings from "../config"

import { registerWhen } from "../../BloomCore/utils/Utils"

let orangeColor = new Vec3i(255, 128, 0)
let redColor = new Vec3i(204, 0, 0)
let blueColor = new Vec3i(0, 128, 255)
let purpleColor = new Vec3i(149, 0, 179)
let greenColor = new Vec3i(26, 153, 0)


registerWhen(register("renderWorld", drawArrowstackLocations), () => settings().enable_arrow_stack_locations)

function drawArrowstackLocations() {
    drawBox(72.5, 5, 91.5, orangeColor, 2.5, 0.6)
    drawBox(16.5, 6, 85.5, redColor, 2.5, 0.6)
    drawBox(54.5, 6, 109.5, blueColor, 2.5, 0.6)
    drawBox(52.5, 6, 111.5, greenColor, 2.5, 0.6)
    drawBox(34.5, 6, 100.5, purpleColor, 2.5, 0.6)
}