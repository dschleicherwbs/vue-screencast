import Api from "@/service/api.js";

export default {
  namespaced: true,
  state: {
    videos: []
  },
  mutations: {
    SET_VIDEOS(state, videos) {
      state.videos = videos;
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
    }
  },
  actions: {
    async loadAll({ commit }) {
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

    async create({ commit }, video) {
      const response = await Api().post("/videos", video);
      const savedVideo = response.data.data;
      const fixedVideo = { id: savedVideo.id, ...savedVideo.attributes };
      commit("ADD_VIDEO", fixedVideo);

      return fixedVideo;
    },
    async delete({ commit }, video) {
      const response = await Api().delete(`/videos/${video.id}`);
      if (response.status == 200 || response.status == 204) {
        commit("DELETE_VIDEO", video.id);
      }
    },
    async edit({ commit }, video) {
      const response = await Api().put(`/videos/${video.id}`, video);
      const newVideo = response.data.data.attributes;
      commit("EDIT_VIDEO", newVideo);
      return newVideo;
    }
  }
};
