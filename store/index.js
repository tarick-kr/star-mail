export const state = () => ({
  drawer: true,
  drawerMini: false,
});

export const mutations = {
  SET_STATE_DRAWER(state, val) {
    state.drawer = val;
  },
  TOGGLE_STATE_DRAWER(state) {
    state.drawer = !state.drawer;
  },
  SET_STATE_DRAWER_MINI(state, val) {
    console.log('SET_STATE_DRAWER_MINI', val);
    state.drawerMini = val;
  },
  // TOGGLE_STATE_DRAWER_MINI(state) {
  //   console.log('TOGGLE_STATE_DRAWER_MINI');
  //   state.drawerMini = !state.drawerMini;
  // },
};

export const actions = {

};

export const getters = {
  stateDrawer: (state) => state.drawer,
  stateDrawerMini: (state) => state.drawerMini,
};
