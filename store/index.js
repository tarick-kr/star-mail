export const state = () => ({
  drawer: true,
  drawerMini: false,
  fullScreen: false,
  offsetTop: 0,
  isSmallDeviceLandscape: false,
  message: null,
  fetching: false
});

export const mutations = {
  SET_STATE_DRAWER(state, val) {
    state.drawer = val;
  },
  TOGGLE_STATE_DRAWER(state) {
    state.drawer = !state.drawer;
  },
  SET_STATE_DRAWER_MINI(state, val) {
    state.drawerMini = val;
  },
  INIT_FULL_SCREEN(state, val) {
    state.fullScreen = val;
  },
  OFFSET_TOP(state, val) {
    state.offsetTop = val;
  },
  IS_SMALL_DEVICE_LANDSCAPE(state, val) {
    state.isSmallDeviceLandscape = val
  },
  SET_MESSAGE (state, message) {
    state.message = message
  },
  CLEAR_MESSAGE (state) {
    state.message = null
  },
  FETCHING (state, val) {
    state.fetching = val
  }
 };

export const actions = {
  nuxtServerInit ({ dispatch }) {
    dispatch('auth/AUTO_LOGIN')
  },
  INIT_FULL_SCREEN({ commit }, winWidth) {
    if (winWidth < 600) {
      commit('INIT_FULL_SCREEN', true);
    } else {
      commit('INIT_FULL_SCREEN', false);
    }
  },
};

export const getters = {
  stateDrawer: ({drawer}) => drawer,
  stateDrawerMini: ({drawerMini}) => drawerMini,
  fullScreen: ({fullScreen}) => fullScreen,
  offsetTop: ({offsetTop}) => offsetTop,
  isSmallDeviceLandscape: ({isSmallDeviceLandscape}) => isSmallDeviceLandscape,
  message: ({message}) => message,
  fetching: ({fetching}) => fetching,
};
