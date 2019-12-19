import Vue from "vue";
import Vuex from "vuex";
import Api from "@/service/api.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    videos: [],
    tags: [],
    playedVideos: []
  },
  mutations: {
    SET_VIDEOS(state, videos) {
      state.videos = videos;
    },
    SET_TAGS(state, tags) {
      state.tags = tags;
    },
    SET_PLAYED_VIDEOS(state, playedVideos) {
      state.playedVideos = playedVideos;
    },
    MARK_VIDEO_PLAYED(state, videoId) {
      // state.playedVideos.push(videoId.toString());
      const newPlayedVideos = state.playedVideos.concat(videoId);
      state.playedVideos = newPlayedVideos;
      window.localStorage.playedVideos = JSON.stringify(newPlayedVideos);
    },
    UNMARK_VIDEO_PLAYED(state, videoId) {
      const newPlayedVideos = state.playedVideos.filter(id => id != videoId);
      state.playedVideos = newPlayedVideos;
      window.localStorage.playedVideos = JSON.stringify(newPlayedVideos);
    },
    ADD_VIDEO(state, video) {
      const newVideos = state.videos.concat(video);
      state.videos = newVideos;
    },
    DELETE_VIDEO(state, videoId) {
      const newVideos = state.videos.filter(video => video.id != videoId);
      state.videos = newVideos;
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

      let playedVideos = JSON.parse(window.localStorage.playedVideos);
      commit("SET_PLAYED_VIDEOS", playedVideos);
    },
    markPlayed({ commit }, videoId) {
      commit("MARK_VIDEO_PLAYED", videoId);
    },
    unmarkPlayed({ commit }, videoId) {
      commit("UNMARK_VIDEO_PLAYED", videoId);
    },
    async createVideo({ commit }, video) {
      const response = await Api().post("/videos", video);
      const savedVideo = response.data.data;
      const fixedVideo = { id: savedVideo.id, ...savedVideo.attributes };
      commit("ADD_VIDEO", fixedVideo);

      return fixedVideo;
    },
    async deleteVideo({ commit }, video) {
      const response = await Api().delete(`/videos/${video.id}`);
      if (response.status == 200 || response.status == 204) {
        commit("DELETE_VIDEO", video.id);
      }
    }
  },

  getters: {
    getTags: state => id => {
      return state.tags.find(tag => tag.id == id);
    }
  },
  modules: {}
});
