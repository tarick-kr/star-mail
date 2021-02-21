export const state = () => ({
  drawer: true,
  drawerMini: false,
  fullScreen: false,
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
    console.log('INIT_FULL_SCREEN');
    state.fullScreen = val;
  },
};

export const actions = {
  INIT_FULL_SCREEN({ commit }, winWidth) {
    if (winWidth < 600) {
      commit('INIT_FULL_SCREEN', true);
    } else {
      commit('INIT_FULL_SCREEN', false);
    }
  },
};

export const getters = {
  stateDrawer: (state) => state.drawer,
  stateDrawerMini: (state) => state.drawerMini,
  fullScreen: (state) => state.fullScreen,
};
