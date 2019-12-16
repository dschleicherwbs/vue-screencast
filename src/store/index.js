import Vue from "vue";
import Vuex from "vuex";
import Api from "@/service/api.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    videos: [],
    tags: []
  },
  mutations: {
    SET_VIDEOS(state, videos) {
      state.videos = videos;
    },
    SET_TAGS(state, tags) {
      state.tags = tags;
    }
  },
  actions: {
    async loadVideos({ commit }) {
      const response = await Api().get("/videos");
      const videos = response.data.data;
      const tags = response.data.included.filter(i => i.type === "tags");
      tags.forEach(t => {
        t.attributes.id = t.id;
        t.attributes.video_ids = t.relationships.videos.data.map(v => v.id);
      });
      videos.forEach(v => {
        v.attributes.id = v.id;
        v.attributes.tag_ids = v.relationships.tags.data.map(t => t.id);
      });
      commit(
        "SET_VIDEOS",
        videos.map(v => v.attributes)
      );
      commit(
        "SET_TAGS",
        tags.map(t => t.attributes)
      );
    }
  },
  modules: {}
});
