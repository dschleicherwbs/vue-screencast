import Api from "@/service/api.js";
import Vue from "vue";

export default {
  namespaced: true,
  state: {
    users: [],
    currentUser: {}
  },
  getters: {
    playedVideos: state => state.currentUser.playedVideos || [],
    videoIsPlayed: (state, getters) => videoId =>
      getters.playedVideos.includes(videoId)
  },
  mutations: {
    SET_PLAYED_VIDEOS(state, playedVideos) {
      Vue.set(state.currentUser, "playedVideos", playedVideos);
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
    SET_USERS(state, users) {
      state.users = users;
    },
    LOGOUT_USER(state) {
      state.currentUser = {};
      window.localStorage.currentUser = JSON.stringify({});
    },
    SET_CURRENT_USER(state, user) {
      state.currentUser = user;
      window.localStorage.currentUser = JSON.stringify(user);
    }
  },
  actions: {
    async loadALL({ commit }) {
      const response = await Api().get("/users");
      const users = response.data.data;

      commit(
        "SET_USERS",
        users.map(u => u.attributes)
      );
    },
    async loadCurrent({ commit, dispatch }) {
      const user = JSON.parse(window.localStorage.currentUser);
      commit("SET_CURRENT_USER", user);
      dispatch("loadPlayed", user.id);
    },
    async login({ commit, dispatch }, loginInfo) {
      try {
        const response = await Api().post("/sessions", loginInfo);
        const user = response.data.data.attributes;

        user.id = response.data.data.id;

        commit("SET_CURRENT_USER", user);
        dispatch("loadPlayed", user.id);

        return user;
      } catch {
        return {
          error: "Email/password combination was incorrect. Please try again"
        };
      }
    },
    logout({ commit }) {
      commit("LOGOUT_USER");
    },
    async register({ commit, dispatch }, registrationInfo) {
      try {
        const response = await Api().post("/users", registrationInfo);
        const user = response.data.data.attributes;
        user.id = response.data.data.id;

        commit("SET_CURRENT_USER", user);
        dispatch("loadPlayed", user.id);

        return user;
      } catch {
        return {
          error: "Therre was an error. Please try again"
        };
      }
    },
    unmarkVideoPlayed({ commit }, videoId) {
      commit("UNMARK_VIDEO_PLAYED", videoId);
    },
    async markVideoPlayed({ commit, state }, videoId) {
      if (state.currentUser.id) {
        commit("MARK_VIDEO_PLAYED", videoId);
        await Api().post("/video_plays", {
          video_id: videoId
        });
      }
    },
    async loadPlayed({ commit }, userId) {
      const response = await Api().get(`/users/${userId}`);
      const user = response.data.data.attributes;

      commit("SET_PLAYED_VIDEOS", user.playedVideos);
    }
  }
};
