/**
 * import and init third party dependencies
 * (components/validators and other dependencies)
 */
import Vue from "vue";

// VueI18n
import i18n from "vue-i18n";

// ElementUI
import "@/assets/styles/theme/index.css";
import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/en";
Vue.use(i18n);
Vue.use(ElementUI, { locale });
Vue.config.lang = "en";

// VueScrollTo
import VueScrollTo from "vue-scrollto";
import scrollToConfig from "@/config/scrollToConfig";
Vue.use(VueScrollTo, scrollToConfig);

// FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faSignOutAlt,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
Vue.component("font-awesome-icon", FontAwesomeIcon);
library.add([faBars, faSignOutAlt, faHeart]);

// vue-moment
Vue.use(require("vue-moment"));

// VueHammer
// import { VueHammer } from "vue2-hammer";
// Vue.use(VueHammer);
