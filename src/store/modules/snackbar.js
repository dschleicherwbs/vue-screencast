export default {
  namespaced: true,
  state: {
    snackbars: []
  },
  mutations: {
    SET_SNACKBAR(state, snackbar) {
      state.snackbars = state.snackbars.concat(snackbar);
    }
  },
  actions: {
    setSnackbar({ commit }, snackbar) {
      snackbar.show = true;
      snackbar.color = snackbar.color || "success";
      snackbar.timeout = snackbar.timeout || 6000;
      commit("SET_SNACKBAR", snackbar);
    }
  },
  getters: {}
};
