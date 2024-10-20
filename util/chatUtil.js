function printModMessage(message) {
    ChatLib.chat("&1[&3Crafter&bAddons&1] &9» " + String(message))
}

function printErrorMessage(message) {
    ChatLib.chat("&cCrafterAddons » " + String(message))
}

function sendPartyMessage(message) {
    ChatLib.command(`pc CA » ${message}`)
}

export default printModMessage
export { printModMessage, printErrorMessage, sendPartyMessage }