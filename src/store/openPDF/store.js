import mutations from './mutations';

export default {
  namespaced: true,
  state() {
    return {
      // modal window
      disk: null,

      // modal name
      path: null,
    };
  },
  mutations,
};
