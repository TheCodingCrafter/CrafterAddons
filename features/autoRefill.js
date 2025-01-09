import settings from "../config"
import { getSkyblockItemID } from "../../BloomCore/utils/Utils"


let WaitingForPearls_SND = false
let WaitingForPearls_CHAT = false // two for both chat and sound, should probably be fixed

let WaitingForJerries_SND = false
let WaitingForJerries_CHAT = false

register("soundPlay", (pos, name, vol, pitch, cat, event) => {
    if (pitch == 4.047618865966797) {
        if (WaitingForPearls_SND) {
            WaitingForPearls_SND = false
            cancel(event)
        }

        if (WaitingForJerries_SND) {
            WaitingForJerries_SND = false
            cancel(event)
        }
    }
})

register("chat", (count, event) => {
    if (WaitingForPearls_CHAT) {
        WaitingForPearls_CHAT = false
        cancel(event)
    }
}).setCriteria(/^Moved ([0-9]+) Ender Pearl from your Sacks to your inventory.$/)

register("chat", (count, event) => {
    if (WaitingForJerries_CHAT) {
        WaitingForJerries_CHAT = false
        cancel(event)
    }
}).setCriteria(/^Moved ([0-9]+) Inflatable Jerry from your Sacks to your inventory.$/)

function refillPearls() {
    if (!settings().auto_refill_pearls) {
        return
    } // registerWhen causes the entire mod to break....

    const inventory = Player.getInventory()
    if (!inventory) {
        return
    }
    const pearlStack = inventory.getItems().find(a => getSkyblockItemID(a) == "ENDER_PEARL")
    if (!pearlStack) {
        return
    }

    const pearlstogive = 16 - pearlStack.getStackSize()
    
    if(pearlstogive == 0){
        return
    }
    WaitingForPearls_SND= true
    WaitingForPearls_CHAT = true

    ChatLib.command(`gfs ender pearl ${pearlstogive}`)

    if (pearlstogive == 1){
        return
    }
}

function refillJerries() {
    if (!settings().auto_refill_jerries) {
        return
    }

    const inventory = Player.getInventory()
    if (!inventory) {
        return
    }
    const jerryStack = inventory.getItems().find(a => getSkyblockItemID(a) == "INFLATABLE_JERRY")
    if (!jerryStack) {
        return
    }

    const jerrystogive = 64 - jerryStack.getStackSize()
    
    if(jerrystogive == 0){
        return
    }

    WaitingForJerries_SND = true
    WaitingForJerries_CHAT = true

    ChatLib.command(`gfs inflatable_jerry ${jerrystogive}`)

    if (jerrystogive == 1){
        return
    }
}

register("step", refillPearls).setFps(0.2)
register("step", refillJerries).setFps(0.2)

register("command", (count) => {
    if (!count) {
        const inventory = Player.getInventory()
        if (!inventory) {
            return
        }
        const jerryStack = inventory.getItems().find(a => getSkyblockItemID(a) == "INFLATABLE_JERRY")
        if (!jerryStack) {
            WaitingForJerries_SND = true
            WaitingForJerries_CHAT = true
            ChatLib.command("gfs inflatable_jerry 64")
            return
        }
    
        const jerrystogive = 64 - jerryStack.getStackSize()
        
        if(jerrystogive == 0){
            return
        }
    
        WaitingForJerries_SND = true
        WaitingForJerries_CHAT = true
    
        ChatLib.command(`gfs inflatable_jerry ${jerrystogive}`)
    
        if (jerrystogive == 1){
            return
        }
    } else {
        ChatLib.command(`gfs inflatable_jerry ${count}`)
    }
}).setName("ij")

register("command", (count) => {
    if (!count) {
        const inventory = Player.getInventory()
        if (!inventory) {
            return
        }
        const pearlStack = inventory.getItems().find(a => getSkyblockItemID(a) == "ENDER_PEARL")
        if (!pearlStack) {
            WaitingForPearls_SND= true
            WaitingForPearls_CHAT = true
            ChatLib.command("gfs ender pearl 16")
            return
        }

        const pearlstogive = 16 - pearlStack.getStackSize()
        
        if(pearlstogive == 0){
            return
        }
        WaitingForPearls_SND= true
        WaitingForPearls_CHAT = true

        ChatLib.command(`gfs ender pearl ${pearlstogive}`)

        if (pearlstogive == 1){
            return
        }
    } else {
        ChatLib.command(`gfs ender pearl ${count}`)
    }
}).setName("ep")