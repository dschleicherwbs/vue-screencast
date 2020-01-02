import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Server, JSONAPISerializer, Model, hasMany } from "miragejs";
import videoJSON from "./mirage/videos.json";
import tagsJSON from "./mirage/tags.json";
import usersJSON from "./mirage/users.json";
import vuetify from "./plugins/vuetify";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faCaretSquareRight,
  faTrash,
  faEdit,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

[faCheck, faCaretSquareRight, faTrash, faEdit, faSignOutAlt].forEach(icon =>
  library.add(icon)
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

new Server({
  serializers: {
    application: JSONAPISerializer,
    video: JSONAPISerializer.extend({
      include: ["tags"],
      normalize(json) {
        return {
          data: {
            type: "video",
            attributes: json
          }
        };
      }
    }),
    tag: JSONAPISerializer.extend({
      include: ["videos"]
    })
  },
  fixtures: {
    videos: videoJSON,
    tags: tagsJSON,
    users: usersJSON
  },
  models: {
    video: Model.extend({
      tags: hasMany()
    }),
    tag: Model.extend({
      videos: hasMany()
    }),
    users: Model
  },
  routes() {
    this.get("/videos");
    this.get("/users");
    this.post("/videos");
    this.put("/videos/:id");
    this.delete("/videos/:id");
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
