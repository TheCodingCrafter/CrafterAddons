armor_stand = Java.type("net.minecraft.entity.item.EntityArmorStand")
import settings from "../config"

let spawnedRegex = /^Spawned by: (.+)$/
let voidGloomRegex = /^☠ Voidgloom Seraph ([IV]+) (.+?)$/
let hitsRegex = /^(\d+) Hits$/
let health_regex = /^(.+)❤$/


// VARS
let spawned_armor_stands = []
let void_gloom_tag = null
let found_slayer = false

let PHASE = false // false = hits, true = damage
let HEALTH = null


register("step", () => {
    if (!settings().enable_voidgloom_display) { return }
    found_slayer = false
    World.getAllEntitiesOfType(armor_stand.class).forEach((entity) => {
        let name = entity.getName().removeFormatting()
        let match = name.match(spawnedRegex)
        if (!match) { return }
        let [_, player] = match
        
        if (player != Player.getName().removeFormatting()) { return }
        spawned_armor_stands.push(entity)
        found_slayer = true
    })

    if (!found_slayer) {
        spawned_armor_stands = []
        void_gloom_tag = null
        PHASE = false
        HEALTH = null
        return
    }

    World.getAllEntitiesOfType(armor_stand.class).forEach((entity) => {
        let x = entity.getX()
        let z = entity.getZ()

        spawned_armor_stands.forEach((spawned_armor_stand) => {
            if (!spawned_armor_stand) { return }
            let dx = spawned_armor_stand.getX()
            let dz = spawned_armor_stand.getZ()

            // probably a better way to do this
            if (x == dx && z == dz) {
                let name = entity.getName().removeFormatting()
                let match = name.match(voidGloomRegex)
                if (!match) { return }
                let [_, tier, HP] = match
                void_gloom_tag = entity
            }
        })
        
    })
}).setFps(5)


register("step", () => {
    if (!settings().enable_voidgloom_display) { return }
    if (!void_gloom_tag) { return }
    let name = void_gloom_tag.getName().removeFormatting()
    let match = name.match(voidGloomRegex)
    if (!match) { return }
    let [_, tier, HP] = match

    let health_match = HP.match(health_regex)
    if (health_match) {
        let [_, health] = health_match
        HEALTH = health
        PHASE = true
    } else {
        let hits_match = HP.match(hitsRegex)

        if (hits_match) {
            let [_, hits] = hits_match
            HEALTH = hits
            PHASE = false
        }
    }
}).setFps(8)

let screen_width = Renderer.screen.getWidth()

let update_counter = 0
register("step", () => {
    if (!settings().enable_voidgloom_display) { return }
    update_counter += 1
    if (update_counter < 20) { return }
    update_counter = 0
    screen_width = Renderer.screen.getWidth()
}).setFps(1)

register("renderOverlay", () => {
    if (!settings().enable_voidgloom_display) { return }
    if (!void_gloom_tag || !found_slayer) { return }
    let width = screen_width / 2
    width -= 50
    let height = 280
    let renderText = new Text(`&dPHASE: ${PHASE ? "&aDAMAGE" : "&fHITS"}\n&${PHASE ? "a" : "d"}${HEALTH}`, width, height).setScale(1.5)
    renderText.setColor(Renderer.WHITE)
    renderText.draw()
})

register("chat", (event) => {
    spawned_armor_stands = []
    void_gloom_tag = null
    PHASE = false
    HEALTH = null
}).setCriteria("  SLAYER QUEST STARTED!")

register("command", () => {
    spawned_armor_stands = []
    void_gloom_tag = null
    PHASE = false
    HEALTH = null
}).setName("voidgloomreset")