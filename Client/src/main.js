import Vue from "vue";
import App from "@/App.vue";

// Vuesax Component Framework
import Vuesax from "vuesax";
import "material-icons/iconfont/material-icons.css"; //Material Icons
import "vuesax/dist/vuesax.css"; // Vuesax
Vue.use(Vuesax);

// moment
Vue.use(require("vue-moment"));

// axios
import axios from "axios";
Vue.prototype.$http = axios;

// cookies
Vue.use(require("vue-cookies"));

// Theme Configurations
import "@/../../Dual/colorsConfig.js";

import acl from "@/../../Dual/acl/acl";
import i18n from "@/../../Dual/i18n/i18n";
import '@/../../Dual/assets/scss/custom.scss'
import "@/../../Dual/firebase/firebaseConfig";
import "@/../../Dual/assets/scss/main.scss";
import "@/../../Dual/globalComponents.js";
// import '@/globalComponents.js'
import "@/../../Dual/assets/css/main.css";
import "@/../../Dual/filters/filters";
require("@/../../Dual/assets/css/iconfont.css");

// Mixins
import { globalMixin } from "@/../../Dual/mixins/_globalMixin.js";
import { dateMixin } from "@/../../Dual/mixins/date.js";
import { users } from '@/../../Dual/mixins/users.js';
import branches from '@/../../Dual/mixins/branches.js';
import vuexVariables from '@/../../Dual/mixins/_vuexVariables.js';
import vuexVariablesLocal from '@/mixins/_vuexVariables.js';
Vue.mixin(globalMixin);
Vue.mixin(dateMixin);
Vue.mixin(users);
Vue.mixin(branches);
Vue.mixin(vuexVariables);
Vue.mixin(vuexVariablesLocal);



// CLIENT
import routerMixin from "@/mixins/router.js";
import testingMixin from "@/mixins/testing.js";
import { mainMixin } from "@/mixins/_main.js";
import { userMixin } from "@/mixins/user.js";
import { cartMixin } from "@/mixins/cart.js";
import { productsMixin } from "@/mixins/products.js";
Vue.mixin(testingMixin);
Vue.mixin(routerMixin);
Vue.mixin(mainMixin);
Vue.mixin(userMixin);
Vue.mixin(cartMixin);
Vue.mixin(productsMixin);





// FONT AWESOME ICON
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(fas);
library.add(far);
library.add(fab);
// selected icons
// import FontAwesomeIconSolid from "@/../../Dual/font-awesome/solid.js";
// import FontAwesomeIconRegular from "@/../../Dual/font-awesome/regular.js";
// import FontAwesomeIconBrands from "@/../../Dual/font-awesome/brands.js";
// Vue.component("font-awesome-icon", FontAwesomeIconSolid);
// Vue.component("font-awesome-icon", FontAwesomeIconRegular);
// Vue.component("font-awesome-icon", FontAwesomeIconBrands);

// Feather Icon
// import FeatherIcon  from '@/../../Dual/components/FeatherIcon.vue';
// Vue.component(FeatherIcon.name, FeatherIcon)

// Clipboard
import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);

// Tour
import VueTour from "vue-tour";
Vue.use(VueTour);
require("vue-tour/dist/vue-tour.css");

// VeeValidate
import VeeValidate from "vee-validate";
Vue.use(VeeValidate);

// PrismJS
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";

// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from "vue2-hammer";
Vue.use(VueHammer);

// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';

// Google Maps
import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    // Add your API key here
    key: "YOUR_API_KEY",
    libraries: "places" // This is required if you use the Auto complete plug-in
  }
});

// Vue Router
import router from "./router";
// Vuex Store
import store from "./store/store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  acl,
  render: h => h(App)
}).$mount("#app");
