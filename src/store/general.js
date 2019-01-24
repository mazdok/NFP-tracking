export default {
  state: {
    processing: false,
    error: null,
    isSidebarOpen: false
  },
  mutations: {
    'SET_PROCESSING'(state, payload) {
      state.processing = payload;
    },
    'SET_ERROR'(state, payload) {
      state.error = payload;
    },
    'CLEAR_ERROR'(state) {
      state.error = null;
    },
    'TOGGLE_SIDEBAR'(state, payload) {
      state.isSidebarOpen = payload;
    }
  },
  actions: {
  },
  getters: {
    getProcessing: (state) => state.processing,
    getError: (state) => state.error
  }
}