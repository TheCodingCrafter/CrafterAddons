import PogObject from "../PogData";

const firstInstall = new PogObject("CrafterAddons", {
    firstInstall: false
});

register("tick", () => {
    if (!firstInstall.firstInstall) {
        let message = `&b&l-----------------------------------------------------\n` +
                        `   &r&3Thank you for installing &b&lCrafterAddons&r&3!\n` +
                        `   &r&3Commands\n` +
                        `   &r&d/ca &3&l- &r&bOpens the Config\n` +
                        `   &r&d/ping &3&l- &r&bDisplays your ping to the server\n` +
                        `\n` +
                        `   &r&dGithub: https://github.com/TheCodingCrafter/CrafterAddons\n` +
                        `&b&l-----------------------------------------------------`

        ChatLib.chat(message)

        firstInstall.firstInstall = true
        firstInstall.save()
    }
})

register("command", () => {
    firstInstall.firstInstall = false
    firstInstall.save()
}).setName("ca_force_first_install")