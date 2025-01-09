import Settings from "../Amaterasu/core/Settings"
import DefaultConfig from "../Amaterasu/core/DefaultConfig"

const defaultConf = new DefaultConfig("CrafterAddons", "settings.json")
    .addButton({
        configName: "github_button",
        title: "Github",
        description: "Opens the Github page for this module.",
        category: "General",
        subcategory: "Links",

        onClick: () => {
            java.awt.Desktop.getDesktop().browse(new java.net.URI("https://github.com/TheCodingCrafter/CrafterAddons"))
        }
    })

    .addButton({
        configName: "discord_button",
        title: "Discord",
        description: "Opens an invite to the discord server for this module.",
        category: "General",
        subcategory: "Links",

        onClick: () => {
            java.awt.Desktop.getDesktop().browse(new java.net.URI("https://discord.gg/Wj8vcWxGBG"))
        }
    })

    .addSwitch({
        configName: "rgb_block_highlight",
        title: "&6RGB Block Highlight",
        description: "Highlights blocks with an RGB color.",
        category: "General",
        subcategory: "QOL"
    })
    // DUNGEONS
    // MASK TIMERS
    .addSwitch({
        configName: "enable_mask_timers",
        title: "&6Mask Timers",
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
        value: "464",

        shouldShow: (config) => config.enable_mask_timers
    })

    .addTextInput({
        configName: "mask_timers_y_loc",
        title: "Mask Timers Y value",
        description: "Location along the Y axis",
        category: "Dungeons",
        subcategory: "Masks",
        placeholder: "265",
        value: "265",

        shouldShow: (config) => config.enable_mask_timers
    })

    .addTextInput({
        configName: "mask_timers_scale",
        title: "Mask Timers Scale",
        description: "",
        category: "Dungeons",
        subcategory: "Masks",
        placeholder: "2",
        value: "2",

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
        title: "&6Mask Notifications",
        description: "Whether or not to enable mask notifications.",
        category: "Dungeons",
        subcategory: "Masks"
    })
    .addSwitch({
        configName: "enable_notify_party_mask",
        title: "&6Notify Party",
        description: "Sends a message to party chat when a mask is activated.",
        category: "Dungeons",
        subcategory: "Masks"
    })

    // GENERAL (DUNGEONS)
    // HIGHLIGHT STARRED MOBS
    .addSwitch({
        configName: "enable_highlight_starred_mobs",
        title: "&6Highlight Starred Mobs",
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

        shouldShow: (config) => config.enable_highlight_starred_mobs
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

    .addDropDown({
        configName: "starred_mobs_highlight_type",
        title: "Highlight Type",
        description: "The type of highlight to use for mobs.",
        category: "Dungeons",
        subcategory: "General",
        options: ["outline", "filled", "both"],
        value: 0,

        shouldShow: (config) => config.enable_highlight_starred_mobs
    })

    // Auto Refill
    .addSwitch({
        configName: "auto_refill_pearls",
        title: "&6Auto Refill Pearls",
        description: "Automatically refill ender pearls in your inventory. (will break if pearls are spammed)",
        category: "Dungeons",
        subcategory: "General"
    })

    .addSwitch({
        configName: "auto_refill_jerries",
        title: "&6Auto Refill Jerrys",
        description: "Automatically refill Inflatable Jerrys in your inventory.",
        category: "Dungeons",
        subcategory: "General"
    })

    // ANNOUNCE LEAP
    .addSwitch({
        configName: "enable_announce_leap",
        title: "&6Announce Leap",
        description: "Announce in party chat when you leap to a party member.",
        category: "Dungeons",
        subcategory: "General"
    })

    .addSwitch({
        configName: "enable_announce_leap_boss",
        title: "Only in Boss",
        description: "Only announce when in the boss room.",
        category: "Dungeons",
        subcategory: "General",

        shouldShow: (config) => config.enable_announce_leap
    })

    .addSwitch({
        configName: "enable_leap_title",
        title: "&6Leap Title",
        description: "Show a title when someone leaps to you. (only works if they have this or azured's leap announce)",
        category: "Dungeons",
        subcategory: "General"
    })

    .addSwitch({
        configName: "enable_leap_title_boss",
        title: "Only in Boss",
        description: "Only show the title when in the boss room.",
        category: "Dungeons",
        subcategory: "General",

        shouldShow: (config) => config.enable_leap_title
    })

    // BLOOD HELPER
    .addSwitch({
        configName: "enable_blood_done_title",
        title: "&6Watcher Done Title",
        description: "Show a title when blood room is done.",
        category: "Dungeons",
        subcategory: "General"
    })

    .addSwitch({
        configName: "enable_blood_done_notify",
        title: "&6Notify Party",
        description: "Notify party chat when blood room is done.",
        category: "Dungeons",
        subcategory: "General"
    })


    // M7
    // ARRROW STACK LOCATIONS
    .addSwitch({
        configName: "enable_arrow_stack_locations",
        title: "&6Arrow Stack Locations",
        description: "Show arrow stack locations in m7.",
        category: "Dungeons",
        subcategory: "M7"
    })

    // TERMINAL WAYPOINTS
    .addSwitch({
        configName: "enable_terminal_waypoints",
        title: "&6Terminal Waypoints",
        description: "Show terminal waypoints in dungeons.",
        category: "Dungeons",
        subcategory: "M7"
    })


    // GENERAL
    // OVERLAYs
    .addSwitch({
        configName: "enable_fero_overlay",
        title: "&6Ferocity Overlay",
        description: "Show an overlay with your ferocity. (Needs Ferocity to be displayed in tab)",
        category: "General",
        subcategory: "QOL"
    })

    .addTextInput({
        configName: "fero_overlay_x",
        title: "Ferocity Overlay X",
        description: "The X position of the ferocity overlay.",
        category: "General",
        subcategory: "QOL",
        placeholder: "50",
        value: "50",

        shouldShow: (config) => config.enable_fero_overlay
    })

    .addTextInput({
        configName: "fero_overlay_y",
        title: "Ferocity Overlay Y",
        description: "The Y position of the ferocity overlay.",
        category: "General",
        subcategory: "QOL",
        placeholder: "50",
        value: "50",

        shouldShow: (config) => config.enable_fero_overlay
    })

    .addTextInput({
        configName: "fero_overlay_scale",
        title: "Ferocity Overlay Scale",
        description: "The scale of the ferocity overlay.",
        category: "General",
        subcategory: "QOL",
        placeholder: "2",
        value: "2",

        shouldShow: (config) => config.enable_fero_overlay
    })

    // magic find overlay
    .addSwitch({
        configName: "enable_mf_overlay",
        title: "&6Magic Find Overlay",
        description: "Show an overlay with your magic find. (Needs Magic find to be displayed in tab)",
        category: "General",
        subcategory: "QOL"
    })

    .addTextInput({
        configName: "mf_overlay_x",
        title: "Magic Find Overlay X",
        description: "The X position of the magic find overlay.",
        category: "General",
        subcategory: "QOL",
        placeholder: "50",
        value: "50",

        shouldShow: (config) => config.enable_mf_overlay
    })

    .addTextInput({
        configName: "mf_overlay_y",
        title: "Magic Find Overlay Y",
        description: "The Y position of the magic find overlay.",
        category: "General",
        subcategory: "QOL",
        placeholder: "100",
        value: "100",

        shouldShow: (config) => config.enable_mf_overlay
    })

    .addTextInput({
        configName: "mf_overlay_scale",
        title: "Magic Find Overlay Scale",
        description: "The scale of the magic find overlay.",
        category: "General",
        subcategory: "QOL",
        placeholder: "2",
        value: "2",

        shouldShow: (config) => config.enable_mf_overlay
    })

    // voidgloom display
    .addSwitch({
        configName: "enable_voidgloom_display",
        title: "&6Voidgloom Display",
        description: "Show an overlay with some stats about the current enderman slayer.",
        category: "General",
        subcategory: "QOL"
    })

    // CHAT
    // CHAT PREFIX
    .addSwitch({
        configName: "enable_party_chat_prefix",
        title: "&6Party chat formatting",
        description: "Formats chat messages from party to look cleaner.",
        category: "General",
        subcategory: "Chat"
    })

    .addSwitch({
        configName: "enable_guild_chat_prefix",
        title: "&6Guild chat formatting",
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
        value: "&9P &8> &${color}${name}&r: ${message}",

        shouldShow: (config) => config.enable_party_chat_prefix
    })

    .addTextInput({
        configName: "guild_chat_format",
        title: "Guild chat Format",
        description: "The format to use for guild chat",
        category: "General",
        subcategory: "Chat",
        placeholder: "&2G &8> &${color}${name}&r &3[${guild_rank}]&r: ${message}",
        value: "&2G &8> &${color}${name}&r &3[${guild_rank}]&r: ${message}",

        shouldShow: (config) => config.enable_guild_chat_prefix
    })

    // sound
    .addSwitch({
        configName: "enable_chat_sound",
        title: "&6Play sound on chat message",
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
        value: "random.orb",

        shouldShow: (config) => config.enable_chat_sound
    })

    // QOL
    // ETHERWARP OVERLAY
    .addSwitch({
        configName: "enable_etherwarp_overlay",
        title: "&6Etherwarp Overlay",
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

    .addSwitch({
        configName: "highlight_dropped_keys",
        title: "&6Highlight Dropped Keys",
        description: "Highlight dropped keys in dungeons.",
        category: "Dungeons",
        subcategory: "General"
    })

    .addColorPicker({
        configName: "wither_keys_color",
        title: "Wither Keys Highlight Color",
        description: "The color to use for highlighting dropped keys.",
        category: "Dungeons",
        subcategory: "General",
        value: [0, 0, 0, 255],

        shouldShow: (config) => config.highlight_dropped_keys
    })

    .addColorPicker({
        configName: "blood_keys_color",
        title: "Blood Keys Highlight Color",
        description: "The color to use for highlighting dropped keys.",
        category: "Dungeons",
        subcategory: "General",
        value: [204, 12.75, 12.75, 255],

        shouldShow: (config) => config.highlight_dropped_keys
    })

    // BOX NECRON
    .addSwitch({
        configName: "enable_box_necron",
        title: "&6Box Necron",
        description: "Highlight Necron, Storm, Goldor, and Maxor in dungeons.",
        category: "Dungeons",
        subcategory: "General"
    })
    
    .addColorPicker({
        configName: "box_necron_color",
        title: "Box Necron Color",
        description: "The color to use for highlighting.",
        category: "Dungeons",
        subcategory: "General",

        shouldShow: (config) => config.enable_box_necron
    })

    .addDropDown({
        configName: "box_necron_type",
        title: "Highlight Type",
        description: "The type of highlight to use for mobs.",
        category: "Dungeons",
        subcategory: "General",
        options: ["outline", "filled", "both"],
        value: 0,

        shouldShow: (config) => config.enable_box_necron
    })
    
    // RAG AXE
    .addSwitch({
        configName: "enable_rag_axe_title",
        title: "&6Rag Axe Notification",
        description: "Show a title when Rag Axe finishes casting.",
        category: "Dungeons",
        subcategory: "General"
    })



    // PARTY

    .addTextInput({
        configName: "party_command_delay",
        title: "&6Party Command Delay",
        description: "how long to wait before sending a response (in ms)",
        category: "Party Cmds",
        subcategory: "Config",
        placeholder: "200",
        value: "200"
    })

    .addTextInput({
        configName: "party_command_prefix",
        title: "&6Party Command Prefix",
        description: "The prefix to use for party commands.",
        category: "Party Cmds",
        subcategory: "Config",
        placeholder: "!",
        value: "!"
    })



    .addSwitch({
        configName: "enable_rng_command",
        title: "&6rng",
        description: "Enable the rng party command.",
        category: "Party Cmds",
        subcategory: "Commands"
    })

    .addSwitch({
        configName: "enable_dice_command",
        title: "&6dice",
        description: "Enable the dice party command.",
        category: "Party Cmds",
        subcategory: "Commands"
    })

    .addSwitch({
        configName: "enable_8ball_command",
        title: "&68ball",
        description: "Enable the 8ball party command.",
        category: "Party Cmds",
        subcategory: "Commands"
    })

    .addSwitch({
        configName: "enable_ping_command",
        title: "&6ping",
        description: "Enable the ping party command.",
        category: "Party Cmds",
        subcategory: "Commands"
    })

    .addSwitch({
        configName: "enable_floor_command",
        title: "&6Dungeon Floor command",
        description: "Enable the floor party command. (eg. !f7, !m5)",
        category: "Party Cmds",
        subcategory: "Commands"
    })

    .addSwitch({
        configName: "enable_ptme_command",
        title: "&6ptme",
        description: "Enable the ptme party command.",
        category: "Party Cmds",
        subcategory: "Commands"
    })

    .addSwitch({
        configName: "enable_warp_command",
        title: "&6warp",
        description: "Enable the warp party command.",
        category: "Party Cmds",
        subcategory: "Commands"
    })

    .addSwitch({
        configName: "enable_allinv_command",
        title: "&6allinv",
        description: "Enable the allinv party command.",
        category: "Party Cmds",
        subcategory: "Commands"
    })

    // CRIMSON ISLE
    .addSwitch({
        configName: "enable_flare_highlight",
        title: "&6Highlight Flares",
        description: "Highlight flares in Crimson Isle.",
        category: "Crimson Isle",
        subcategory: "Flare Grinding"
    })

    .addColorPicker({
        configName: "flare_highlight_color",
        title: "Flare Highlight Color",
        description: "The color to use for highlighting flares.",
        category: "Crimson Isle",
        subcategory: "Flare Grinding",
        value: [255, 255, 255, 255],

        shouldShow: (config) => config.enable_flare_highlight
    })
    
    // vanq sharing
    .addSwitch({
        configName: "enable_vanq_share",
        title: "&6Vanquisher Sharing",
        description: "Automatically share spawned vanquishers in party chat.",
        category: "Vanquisher"
    })

    .addSwitch({
        configName: "enable_vanq_receive",
        title: "&6Receive Vanquishers",
        description: "Receive vanquisher spawns from party chat.",
        category: "Vanquisher"
    })

    // MINING
    .addSwitch({
        configName: "enable_pristine_title",
        title: "&6Pristine Title",
        description: "Show a title with Pristine Proc",
        category: "Mining"
    })

    .addSwitch({
        configName: "enable_pristine_chat",
        title: "&6Pristine Chat",
        description: "Format chat message for Pristine Proc",
        category: "Mining"
    })

    .addTextInput({
        configName: "pristine_high_proc",
        title: "High Proc Value",
        description: "Shows a title if the proc is higher than this value (-1 to disable)",
        category: "Mining",
        placeholder: "60",
    })



const config = new Settings("CrafterAddons", defaultConf, "color_scheme.json", titleText="&3Crafter&bAddons&r")
    .setCommand("ca", ["crafter", "crafteraddons"])


// Now we export the [config.settings] as a default function
export default () => config.settings


