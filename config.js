import Settings from "../Amaterasu/core/Settings"
import DefaultConfig from "../Amaterasu/core/DefaultConfig"

const defaultConf = new DefaultConfig("CrafterAddons", "settings.json")
    // DUNGEONS
    // MASK TIMERS
    .addSwitch({
        configName: "enable_mask_timers",
        title: "Mask Timers",
        description: "Whether or not to enable mask timers.",
        category: "Dungeons",
        subcategory: "Masks"
    })

    .addTextInput({
        configName: "mask_timers_x_loc",
        title: "Mask Timers X value",
        description: "Location along the X axis",
        category: "Dungeons",
        subcategory: "Masks",
        placeholder: "464",

        shouldShow: (config) => config.enable_mask_timers
    })

    .addTextInput({
        configName: "mask_timers_y_loc",
        title: "Mask Timers Y value",
        description: "Location along the Y axis",
        category: "Dungeons",
        subcategory: "Masks",
        placeholder: "265",

        shouldShow: (config) => config.enable_mask_timers
    })

    .addTextInput({
        configName: "mask_timers_scale",
        title: "Mask Timers Scale",
        description: "",
        category: "Dungeons",
        subcategory: "Masks",
        placeholder: "2",

        shouldShow: (config) => config.enable_mask_timers
    })

    .addTextInput({
        configName: "phoenix_pet_lvl",
        title: "Phoenix Pet level",
        description: "",
        category: "Dungeons",
        subcategory: "Masks",
        placeholder: "eg. 100",
        value: "1",

        shouldShow: (config) => config.enable_mask_timers
    })

    // MASK NOTIFICATIONS
    .addSwitch({
        configName: "enable_mask_notifications",
        title: "Mask Notifications",
        description: "Whether or not to enable mask notifications.",
        category: "Dungeons",
        subcategory: "Masks"
    })
    .addSwitch({
        configName: "enable_notify_party_mask",
        title: "Notify Party",
        description: "Sends a message to party chat when a mask is activated.",
        category: "Dungeons",
        subcategory: "Masks"
    })

    // GENERAL (DUNGEONS)
    // HIGHLIGHT STARRED MOBS
    .addSwitch({
        configName: "enable_highlight_starred_mobs",
        title: "Highlight Starred Mobs",
        description: "Highlight starred mobs and Shadow Assassins in dungeons.",
        category: "Dungeons",
        subcategory: "General"
    })

    .addSwitch({
        configName: "enable_highlight_starred_mobs_fels",
        title: "Highlight All Fels",
        description: "Highlight all Fels, not just starred.",
        category: "Dungeons",
        subcategory: "General",
    })

    .addColorPicker({
        configName: "starred_mobs_highlight_color",
        title: "Starred Mobs Highlight Color",
        description: "The color to use for highlighting starred mobs.",
        category: "Dungeons",
        subcategory: "General",
        value: [0, 255, 0, 255],

        shouldShow: (config) => config.enable_highlight_starred_mobs
    })

    .addColorPicker({
        configName: "starred_mobs_highlight_color_fels",
        title: "Starred Mobs Highlight Color (Fels)",
        description: "The color to use for highlighting starred Fels mobs.",
        category: "Dungeons",
        subcategory: "General",
        value: [255, 0, 0, 255],

        shouldShow: (config) => config.enable_highlight_starred_mobs
    })

    .addTextInput({
        configName: "starred_mobs_highlight_width",
        title: "Highlight Line Width",
        description: "The width of the line used to highlight mobs.",
        category: "Dungeons",
        subcategory: "General",
        placeholder: "2",
        value: "2",
        
        shouldShow: (config) => config.enable_highlight_starred_mobs
    })

    // BLOOD HELPER
    .addSwitch({
        configName: "enable_blood_done_title",
        title: "Watcher Done Title",
        description: "Show a title when blood room is done.",
        category: "Dungeons",
        subcategory: "General"
    })

    .addSwitch({
        configName: "enable_blood_done_notify",
        title: "Notify Party",
        description: "Notify party chat when blood room is done.",
        category: "Dungeons",
        subcategory: "General"
    })


    // M7
    // ARRROW STACK LOCATIONS
    .addSwitch({
        configName: "enable_arrow_stack_locations",
        title: "Arrow Stack Locations",
        description: "Show arrow stack locations in m7.",
        category: "Dungeons",
        subcategory: "M7"
    })

    // TERMINAL WAYPOINTS
    .addSwitch({
        configName: "enable_terminal_waypoints",
        title: "Terminal Waypoints",
        description: "Show terminal waypoints in dungeons.",
        category: "Dungeons",
        subcategory: "M7"
    })


    // GENERAL
    // CHAT
    // CHAT PREFIX
    .addSwitch({
        configName: "enable_party_chat_prefix",
        title: "Party chat formatting",
        description: "Formats chat messages from party to look cleaner.",
        category: "General",
        subcategory: "Chat"
    })

    .addSwitch({
        configName: "enable_guild_chat_prefix",
        title: "Guild chat formatting",
        description: "Formats chat messages from guild to look cleaner.",
        category: "General",
        subcategory: "Chat"
    })

    .addTextInput({
        configName: "party_chat_format",
        title: "Party chat Format",
        description: "The format to use for party chat",
        category: "General",
        subcategory: "Chat",
        placeholder: "&9P &8> &${color}${name}&r: ${message}",
        value: "&9P &8> &${color}${name}&r: ${message}"
    })

    .addTextInput({
        configName: "guild_chat_format",
        title: "Guild chat Format",
        description: "The format to use for guild chat",
        category: "General",
        subcategory: "Chat",
        placeholder: "&2G &8> &${color}${name}&r &3[${guild_rank}]&r: ${message}",
        value: "&2G &8> &${color}${name}&r &3[${guild_rank}]&r: ${message}"
    })

    // sound
    .addSwitch({
        configName: "enable_chat_sound",
        title: "Play sound on chat message",
        description: "Play a sound when a chat message is recieved.",
        category: "General",
        subcategory: "Chat"
    })

    .addTextInput({
        configName: "chat_sound",
        title: "Chat sound",
        description: "The sound to play when a chat message is recieved.",
        category: "General",
        subcategory: "Chat",
        placeholder: "random.orb",
        value: "random.orb"
    })

    // QOL
    // ETHERWARP OVERLAY
    .addSwitch({
        configName: "enable_etherwarp_overlay",
        title: "Etherwarp Overlay",
        description: "Show an overlay at the position of the etherwarp.",
        category: "General",
        subcategory: "QOL"
    })

    .addColorPicker({
        configName: "etherwarp_overlay_color",
        title: "Etherwarp Overlay Color",
        description: "The color to use for the etherwarp overlay.",
        category: "General",
        subcategory: "QOL",
        value: [0, 255, 0, 255],

        shouldShow: (config) => config.enable_etherwarp_overlay
    })

    .addColorPicker({
        configName: "etherwarp_overlay_fail_color",
        title: "Etherwarp Overlay Color (Fail)",
        description: "The color to use for the etherwarp overlay if the teleport is invalid.",
        category: "General",
        subcategory: "QOL",
        value: [255, 0, 0, 255],

        shouldShow: (config) => config.enable_etherwarp_overlay
    })

    .addSwitch({
        configName: "etherwarp_overlay_show_fail",
        title: "Show on Fail",
        description: "Show the overlay even if the teleport is invalid.",
        category: "General",
        subcategory: "QOL",

        shouldShow: (config) => config.enable_etherwarp_overlay
    })

    .addSelection({
        configName: "etherwarp_overlay_render_type",
        title: "Highlight Type",
        description: "The type of highlight to use for the overlay.",
        category: "General",
        subcategory: "QOL",
        value: 1,
        options: ["outline", "filled", "both"],

        shouldShow: (config) => config.enable_etherwarp_overlay
    })

    .addSwitch({
        configName: "etherwarp_overlay_sneak",
        title: "Only show while Sneaking",
        description: "Only show the overlay while sneaking.",
        category: "General",
        subcategory: "QOL",
        value: true,

        shouldShow: (config) => config.enable_etherwarp_overlay
    })

    // PARTY

    .addTextInput({
        configName: "party_command_delay",
        title: "Party Command Delay",
        description: "how long to wait before sending a response (in ms)",
        category: "Party Commands",
        subcategory: "Config",
        placeholder: "200",
        value: "200"
    })

    .addTextInput({
        configName: "party_command_prefix",
        title: "Party Command Prefix",
        description: "The prefix to use for party commands.",
        category: "Party Commands",
        subcategory: "Config",
        placeholder: "!",
        value: "!"
    })



    .addSwitch({
        configName: "enable_rng_command",
        title: "rng",
        description: "Enable the rng party command.",
        category: "Party Commands",
        subcategory: "Commands"
    })

    .addSwitch({
        configName: "enable_dice_command",
        title: "dice",
        description: "Enable the dice party command.",
        category: "Party Commands",
        subcategory: "Commands"
    })

    .addSwitch({
        configName: "enable_8ball_command",
        title: "8ball",
        description: "Enable the 8ball party command.",
        category: "Party Commands",
        subcategory: "Commands"
    })

    .addSwitch({
        configName: "enable_ping_command",
        title: "ping",
        description: "Enable the ping party command.",
        category: "Party Commands",
        subcategory: "Commands"
    })

    .addSwitch({
        configName: "enable_tps_command",
        title: "tps",
        description: "Enable the tps party command.",
        category: "Party Commands",
        subcategory: "Commands"
    })

    .addSwitch({
        configName: "enable_floor_command",
        title: "Dungeon Floor command",
        description: "Enable the floor party command. (eg. !f7, !m5)",
        category: "Party Commands",
        subcategory: "Commands"
    })

    .addSwitch({
        configName: "enable_ptme_command",
        title: "ptme",
        description: "Enable the ptme party command.",
        category: "Party Commands",
        subcategory: "Commands"
    })

    .addSwitch({
        configName: "enable_warp_command",
        title: "warp",
        description: "Enable the warp party command.",
        category: "Party Commands",
        subcategory: "Commands"
    })

    .addSwitch({
        configName: "enable_allinv_command",
        title: "allinv",
        description: "Enable the allinv party command.",
        category: "Party Commands",
        subcategory: "Commands"
    })


const config = new Settings("CrafterAddons", defaultConf, "color_scheme.json", titleText="&3Crafter&bAddons&r")
    .setCommand("ca", ["crafter", "crafteraddons"])


// Now we export the [config.settings] as a default function
export default () => config.settings


