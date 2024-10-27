import showTitle from '../util/title';
import settings from '../config';


// credit: UwUAddons for detection code
register("soundPlay", (pos, name, vol, pitch, category, event) => {
    if (!settings().enable_rag_axe_title) return
    if (pitch == 1.4920635223388672) {
        showTitle("&6Rag Axe", "", 1200);
    }
}).setCriteria("mob.wolf.howl");