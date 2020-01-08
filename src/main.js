import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import setupMirage from "@/mirage/setup-server";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faCaretSquareRight,
  faTrash,
  faEdit,
  faSignOutAlt,
  faEye
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

[
  faCheck,
  faCaretSquareRight,
  faTrash,
  faEdit,
  faSignOutAlt,
  faEye
].forEach(icon => library.add(icon));

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

setupMirage();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
