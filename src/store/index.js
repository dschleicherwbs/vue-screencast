import Vue from "vue";
import Vuex from "vuex";
import Api from "@/service/api.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    videos: [],
    tags: [],
    users: [],
    currentUser: {},
    snackbars: []
  },
  mutations: {
    SET_VIDEOS(state, videos) {
      state.videos = videos;
    },
    SET_TAGS(state, tags) {
      state.tags = tags;
    },
    SET_PLAYED_VIDEOS(state, playedVideos) {
      Vue.set(state.currentUser, "playedVideos", playedVideos);
    },
    SET_USERS(state, users) {
      state.users = users;
    },
    MARK_VIDEO_PLAYED(state, videoId) {
      const newPlayedVideos = state.currentUser.playedVideos.concat(videoId);
      state.currentUser.playedVideos = newPlayedVideos;
    },
    UNMARK_VIDEO_PLAYED(state, videoId) {
      const newPlayedVideos = state.currentUser.playedVideos.filter(
        id => id != videoId
      );
      state.currentUser.playedVideos = newPlayedVideos;
    },
    ADD_VIDEO(state, video) {
      const newVideos = state.videos.concat(video);
      state.videos = newVideos;
    },
    DELETE_VIDEO(state, videoId) {
      const newVideos = state.videos.filter(video => video.id != videoId);
      state.videos = newVideos;
    },
    EDIT_VIDEO(state, video) {
      state.videos.forEach(v => {
        if (v.id == video.id) {
          v = video;
        }
      });
    },
    LOGOUT_USER(state) {
      state.currentUser = {};
      window.localStorage.currentUser = JSON.stringify({});
    },
    SET_CURRENT_USER(state, user) {
      state.currentUser = user;
      window.localStorage.currentUser = JSON.stringify(user);
    },
    SET_SNACKBAR(state, snackbar) {
      state.snackbars = state.snackbars.concat(snackbar);
    },
    CONNECT_TAG_TO_VIDEO(state, { video, tag }) {
      video.tag_ids = video.tag_ids.concat(tag.id.toString());
      tag.video_ids = tag.video_ids.concat(video.id.toString());
    },
    DISCONNECT_TAG_FROM_VIDEO(state, { video, tag }) {
      video.tag_ids = video.tag_ids.filter(tagId => tagId != tag.id);
      tag.video_ids = tag.video_ids.filter(videoId => videoId != video.id);
    },
    CREATE_TAG(state, { tag }) {
      state.tags = state.tags.concat(tag);
    }
  },
  actions: {
    async loadVideos({ commit }) {
      const response = await Api().get("/videos");
      const videos = response.data.data;

      videos.forEach(v => {
        v.attributes.id = v.id;
        v.attributes.tag_ids = v.relationships.tags.data.map(t => t.id);
      });

      commit(
        "SET_VIDEOS",
        videos.map(v => v.attributes)
      );
    },
    async loadAllTags({ commit }) {
      const response = await Api().get("/tags");
      const tags = response.data.data;
      tags.forEach(t => {
        t.attributes.id = t.id;
        t.attributes.video_ids = t.relationships.videos.data.map(v => v.id);
      });
      commit(
        "SET_TAGS",
        tags.map(t => t.attributes)
      );
    },
    async loadUsers({ commit }) {
      const response = await Api().get("/users");
      const users = response.data.data;

      commit(
        "SET_USERS",
        users.map(u => u.attributes)
      );
    },
    async loadCurrentUser({ commit, dispatch }) {
      const user = JSON.parse(window.localStorage.currentUser);
      commit("SET_CURRENT_USER", user);
      dispatch("loadPlayedVideos", user.id);
    },
    async loadPlayedVideos({ commit }, userId) {
      const response = await Api().get(`/users/${userId}`);
      const user = response.data.data.attributes;

      commit("SET_PLAYED_VIDEOS", user.playedVideos);
    },
    async markPlayed({ commit, state }, videoId) {
      if (state.currentUser.id) {
        commit("MARK_VIDEO_PLAYED", videoId);
        await Api().post("/video_plays", {
          video_id: videoId
        });
      }
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
    },
    async editVideo({ commit }, video) {
      const response = await Api().put(`/videos/${video.id}`, video);
      const newVideo = response.data.data.attributes;
      commit("EDIT_VIDEO", newVideo);
      return newVideo;
    },
    logoutUser({ commit }) {
      commit("LOGOUT_USER");
    },
    async loginUser({ commit, dispatch }, loginInfo) {
      try {
        const response = await Api().post("/sessions", loginInfo);
        const user = response.data.data.attributes;

        user.id = response.data.data.id;

        commit("SET_CURRENT_USER", user);
        dispatch("loadPlayedVideos", user.id);

        return user;
      } catch {
        return {
          error: "Email/password combination was incorrect. Please try again"
        };
      }
    },
    async registerUser({ commit, dispatch }, registrationInfo) {
      try {
        const response = await Api().post("/users", registrationInfo);
        const user = response.data.data.attributes;
        user.id = response.data.data.id;

        commit("SET_CURRENT_USER", user);
        dispatch("loadPlayedVideos", user.id);

        return user;
      } catch {
        return {
          error: "Therre was an error. Please try again"
        };
      }
    },
    setSnackbar({ commit }, snackbar) {
      snackbar.show = true;
      snackbar.color = snackbar.color || "success";
      snackbar.timeout = snackbar.timeout || 6000;
      commit("SET_SNACKBAR", snackbar);
    },
    connectTagToVideo({ commit }, { video, tag }) {
      Api().post("video_tags", { video_id: video.id, tag_id: tag.id });
      commit("CONNECT_TAG_TO_VIDEO", { video, tag });
    },
    async disconnectTagFromVideo({ commit }, { video, tag }) {
      Api().post("video_tags/delete", { video_id: video.id, tag_id: tag.id });
      commit("DISCONNECT_TAG_FROM_VIDEO", { video, tag });
    },
    async createTag({ commit }, { name }) {
      const response = await Api().post("/tags", { name });
      const createdTag = response.data.data.attributes;
      createdTag.id = response.data.data.id;
      createdTag.video_ids = [];

      commit("CREATE_TAG", { tag: createdTag });
      return createdTag;
    }
  },
  getters: {
    playedVideos: state => state.currentUser.playedVideos || [],
    isPlayed: (state, getters) => videoId =>
      getters.playedVideos.includes(videoId),
    getTags: state => id => state.tags.find(tag => tag.id == id)
  },
  modules: {}
});
