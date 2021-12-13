export default {
    /**
     * Modal window state
     * @param state
     * @param show
     * @param modalName
     */
    setModalState(state, { disk, path }) {
      state.disk = disk;
      state.path = path;
    },
  };