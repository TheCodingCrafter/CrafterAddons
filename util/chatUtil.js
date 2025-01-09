function printModMessage(message) {
    ChatLib.chat("&8&l[&r&cca&8&l]&r &c» " + String(message))
}

function printErrorMessage(message) {
    ChatLib.chat("&cCrafterAddons » " + String(message))
}

function sendPartyMessage(message) {
    ChatLib.command(`pc CA » ${message}`)
}

export default printModMessage
export { printModMessage, printErrorMessage, sendPartyMessage }