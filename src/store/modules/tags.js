import Api from "@/service/api.js";

export default {
  namespaced: true,
  state: {
    tags: []
  },
  mutations: {
    SET_TAGS(state, tags) {
      state.tags = tags;
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
    },
    UPDATE_TAG_NAME(state, { tag }) {
      const tagToUpdate = state.tags.find(t => t.id == tag.id);
      tagToUpdate.name = tag.name;
    },
    DELETE_TAG(state, { tag }) {
      state.tags = state.tags.filter(t => t.id != tag.id);
      // state.videos.forEach(video => {
      //   video.tag_ids = video.tag_ids.filter(t => t.id != tag.id);
      // });
    }
  },
  actions: {
    async loadAll({ commit }) {
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
    connectToVideo({ commit }, { video, tag }) {
      Api().post("video_tags", { video_id: video.id, tag_id: tag.id });
      commit("CONNECT_TAG_TO_VIDEO", { video, tag });
    },
    async disconnectFromVideo({ commit }, { video, tag }) {
      Api().post("video_tags/delete", { video_id: video.id, tag_id: tag.id });
      commit("DISCONNECT_TAG_FROM_VIDEO", { video, tag });
    },
    async create({ commit }, { name }) {
      const response = await Api().post("/tags", { name });
      const createdTag = response.data.data.attributes;
      createdTag.id = response.data.data.id;
      createdTag.video_ids = [];

      commit("CREATE_TAG", { tag: createdTag });
      return createdTag;
    },
    updateName({ commit }, { tag }) {
      Api().put(`/tags/${tag.id}`, { tag });
      commit("UPDATE_TAG_NAME", { tag });
    },
    delete({ commit }, { tag }) {
      Api().delete(`/tags/${tag.id}`);
      commit("DELETE_TAG", { tag });
    }
  },
  getters: {
    get: state => id => state.tags.find(tag => tag.id == id)
  }
};
