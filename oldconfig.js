import { @Vigilant, @TextProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, Color } from 'Vigilance';


@Vigilant("CrafterAddons")
class Settings {
    // update vars
    updateMaskTimers = false;

    // MASK TIMERS
    // enable / disable
    @SwitchProperty({
        name: "Mask Timers",
        description: "Whether or not to enable mask timers.",
        category: "Dungeons",
        subcategory: "Masks"
    })
    enableMaskTimers = false;

    // location
    // x
    @TextProperty({
        name: "Mask Timers X value",
        description: "Location along the X axis",
        category: "Dungeons",
        subcategory: "Masks",
        placeholder: "464"
    })
    maskTimersXLoc = "464";
    // y
    @TextProperty({
        name: "Mask Timers Y value",
        description: "Location along the Y axis",
        category: "Dungeons",
        subcategory: "Masks",
        placeholder: "265"
    })
    maskTimersYLoc = "265";


    // scale
    @TextProperty({
        name: "Mask Timers Scale",
        description: "",
        category: "Dungeons",
        subcategory: "Masks",
        placeholder: "2"
    })
    maskTimersScale = "2";

    // phoenix lvl
    @TextProperty({
        name: "Phoenix Pet level",
        description: "",
        category: "Dungeons",
        subcategory: "Masks",
        placeholder: "eg. 100"
    })
    phoenixPetLvl = "100";

    
    // MASK NOTIFICATIONS
    @SwitchProperty({
        name: "Mask Notifications",
        description: "Enable/Disable notifications from  bonzo / spirit mask & phoenix",
        category: "Dungeons",
        subcategory: "Masks"
    })
    maskNotificationsEnable = false;



    // ARROW STACK LOCATIONS
    @SwitchProperty({
        name: "Arrowstack Locations",
        description: "Shows the location from where you should start an arrow stack",
        category: "Dungeons",
        subcategory: "M7"
    })
    arrowstackLocationEnable = false;


    // CHAT FEATURES
    // PARTY & GUILD FORMATTER
    @SwitchProperty({
        name: "Party Chat Formatter",
        description: "Formats chat in partys to be nicer",
        category: "General",
        subcategory: "Chat"
    })
    partyChatFormatEnabled = false;

    @SwitchProperty({
        name: "Guild Chat Formatter",
        description: "Formats chat in guilds to be nicer",
        category: "General",
        subcategory: "Chat"
    })
    guildChatFormatEnabled = false;

    @TextProperty({
        name: "Party chat Format",
        description: "The format to use for party chat",
        category: "General",
        subcategory: "Chat",
        placeholder: "&9P &8> &${color}${name}&r: ${message}"
    })
    partyChatFormat = "&9P &8> &${color}${name}&r: ${message}";

    @TextProperty({
        name: "Guild chat Format",
        description: "The format to use for guild chat",
        category: "General",
        subcategory: "Chat",
        placeholder: "&2G &8> &${color}${name}&r &3[${guild_rank}]&r: ${message}"
    })
    guildChatFormat = "&2G &8> &${color}${name}&r &3[${guild_rank}]&r: ${message}";


    // sound
    @SwitchProperty({
        name: "Play Sound on chat message",
        description: "plays a sound when recieving a message in party or guild chat",
        category: "General",
        subcategory: "Chat"
    })
    playSoundChatMessage = false;

    @TextProperty({
        name: "Chat Sound",
        description: "The sound to play",
        category: "General",
        subcategory: "Chat",
        placeholder: "random.orb"
    })
    chatSound = "random.orb";


    // Highlight Starred Mobs
    @SwitchProperty({
        name: "Highlight Starred Mobs",
        description: "Draws a box around starred mobs",
        category: "Dungeons",
        subcategory: "General"
    })
    highlightStarredMobs = false;


    // highlight color
    @ColorProperty({
        name: "Starred Mobs Highlight Color",
        description: "The color to use for the highlight",
        category: "Dungeons",
        subcategory: "General"
    })
    starredMobsHighlightColor = new Color(0, 0.7, 1, 1);

    // line width
    @TextProperty({
        name: "Starred Mobs Highlight Width",
        description: "The width of the line to use for the highlight",
        category: "Dungeons",
        subcategory: "General",
        placeholder: "2"
    })
    starredMobsHighlightWidth = "2";

    constructor() {
        this.initialize(this);
    
        // mask timers
        this.registerListener("Mask Timers Scale", newval => { // signal that the settings for mask timers must be synced
            this.updateMaskTimers = true;
        });

        this.registerListener("Mask Timers X value", newval => { // signal that the settings for mask timers must be synced
            this.updateMaskTimers = true;
        });

        this.registerListener("Mask Timers Y value", newval => { // signal that the settings for mask timers must be synced
            this.updateMaskTimers = true;
        });


        this.setCategoryDescription("Dungeons", "&6&lCrafter Addons\n&cDu&6ng&eeo&bns &9ar&de k&6ew&el :&cD")
        this.setSubcategoryDescription("Dungeons", "Masks", "Features to help with bonzo and spirit mask (also phoenix)")
        this.setSubcategoryDescription("Dungeons", "M7", "Various features for M7")
        this.setSubcategoryDescription("Dungeons", "General", "General dungeon features")
        
        this.setCategoryDescription("General", "&6&lCrafter Addons\n&cDu&6ng&eeo&bns &9ar&de k&6ew&el :&cD")
        this.setSubcategoryDescription("General", "Chat", "Various QOL features for chat")
    }
}

export default new Settings();