import { request } from "axios";
import { calcSkillLevel } from "../../BloomCore/utils/Utils"

// pfinder regex
let pfinder_re = /^Party Finder > (.+) joined the dungeon group! \((.+) Level ([0-9]+)\)$/

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function prettyCataLvl(lvl) {
    if (lvl < 50) {
        return `&c${lvl}`
    } else if (lvl < 60) {
        return `&6&l${lvl}`
    }
    return `&b&l${lvl}`
}

function prettyMP(mp) {
    if (mp < 500) {
        return `&4&l${mp}`
    } else if (mp < 700) {
        return `&4${mp}`
    } else if (mp < 900) {
        return `&e${mp}`
    } else if (mp < 1100) {
        return `&a${mp}`
    } else if (mp < 1300) {
        return `&6&l${mp}`
    } else if (mp < 1400) {
        return `&b&l${mp}`
    } else if (mp < 1500) {
        return `&c&l${mp}`
    } else if (mp < 1700) {
        return `&9&l${mp}`
    } 

    return `&d&l${mp}`
}

function PrettyCataRank(rank) {
    if (rank > 3000) { // 3000+
        return '' // skip
    } else if (rank > 2500) { // 2500-3000
        return `&e#${rank}`
    } else if (rank > 2000) { // 2000-2500
        return `&6#${rank}`
    } else if (rank > 1500) { // 1500-2000
        return `&a#${rank}`
    } else if (rank > 1000) { // 1000-1500
        return `&c#${rank}`
    } else if (rank > 500) { // 500-1000
        return `&c&l#${rank}`
    } else if (rank > 250) { // 250-500
        return `&4&l#${rank}`
    } else if (rank > 100) { // 100-250
        return `&5&l#${rank}`
    }
    return `&b&l#${rank}`
}

function getComps(compOBJ, mm, secreted = false) {
    if (!compOBJ) return 0;
    let comps = 0;
    if (!secreted || mm) {
        comps += compOBJ["4"] || 0;
    }
    if (!secreted) {
        comps += compOBJ["0"] || 0;
        comps += compOBJ["1"] || 0;
        comps += compOBJ["2"] || 0;
        comps += compOBJ["3"] || 0;
    }

    comps += compOBJ["5"] || 0;
    comps += compOBJ["6"] || 0;
    comps += compOBJ["7"] || 0;

    return comps;
}

function doShit(Username, Data, fromPF=false) {
    let profile = null;
    Object.entries(Data.profiles).forEach(([key, value]) => {
        let current = value?.current;
        if (current) {
            profile = value;
        }
    });

    if (!profile) {
        return ChatLib.chat(`&cError, failed to get stats for ${Username}.`);
    }


    // get data
    let dung = profile?.raw?.dungeons
    let cata = dung?.dungeon_types?.catacombs
    let mm = dung?.dungeon_types?.master_catacombs

    let MP = parseInt(profile?.raw?.accessory_bag_storage?.highest_magical_power)
    let Secrets = parseInt(dung?.secrets)
    let Cata_XP = parseInt(cata?.experience)
    let Cata_Level = calcSkillLevel("catacombs", Cata_XP)


    let normal_comps = getComps(cata?.tier_completions, false)
    let master_comps = getComps(mm?.tier_completions, true)
    let total_comps = normal_comps + master_comps

    let secrets_per_run_avg = Secrets / (total_comps)

    let normal_comps_secreted = getComps(cata?.tier_completions, false, true)
    let master_comps_secreted = getComps(mm?.tier_completions, true, true)
    let total_comps_secreted = normal_comps_secreted + master_comps_secreted

    let secrets_per_run_avg_secreted = Secrets / (total_comps_secreted)

    let CataRank = parseInt(profile?.data?.dungeons?.catacombs?.level?.rank)

    let NAME = profile?.data?.display_name
    let prof_name = profile?.cute_name

    let KICK_MSG = ''

    if (fromPF) {
        KICK_MSG = new TextComponent('&c&l[KICK]\n').setClick("run_command", `/p kick ${NAME}`).setHoverValue("&cClick to kick this player from the party")
    }

    let msg = new Message(
    `&b&l-------------------------------------------------&r\n`,
    new TextComponent(`&9&l${NAME}'s &r&dCatacombs Stats on &a&l${prof_name}&r\n`).setClick("run_command", `/pv ${NAME}`).setHoverValue("&aClick to open in NEU profile Viewer"),
    `&aMP: ${prettyMP(MP)}&r\n`,
    `&aSecrets: &e${formatNumber(Secrets)}&r\n`,
    `&aSecrets Avg: &e${secrets_per_run_avg.toFixed(2)}&r &9(&e${secrets_per_run_avg_secreted.toFixed(2)}&9)\n`,
    `&aCatacombs Level: ${prettyCataLvl(Cata_Level)}&r &9(&e${formatNumber(Math.floor(Cata_XP))}&9) ${PrettyCataRank(CataRank)}\n`,
    `&aCompletions: &e${formatNumber(total_comps)}&r\n`,
    KICK_MSG,
    `&b&l-------------------------------------------------&r\n`
    );

    ChatLib.chat(msg)
}   

function STATS(name, fromPF=false) {
    request({
        url: "https://sky.shiiyu.moe/api/v2/profile/" + name,
        method: "GET",
    }).then((res) => {
        doShit(name, res.data, fromPF);
    }).catch((err) => {
        console.log(err);
    });
}

register("command", (name) => {
    if (!name) {
        name = Player.getName();
    }
    STATS(name, false)
    
}).setName("cata", true).setAliases(["catastats", "cs"])

register("chat", (name, classs, lvl) => {
    if (name == Player.getName()) {
        return;
    }
    STATS(name, true)
}).setCriteria(pfinder_re)