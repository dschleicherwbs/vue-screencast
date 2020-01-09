import Vue from "vue";
import Vuex from "vuex";
import snackbarModule from "./modules/snackbar";
import tagsModule from "./modules/tags";
import videosModule from "./modules/videos";
import usersModule from "./modules/users";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    snackbar: snackbarModule,
    tags: tagsModule,
    videos: videosModule,
    users: usersModule
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {}
});
