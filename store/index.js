export const state = () => ({
  drawer: true,
});

export const mutations = {
  TOGGLE_DRAWER(state) {
    state.drawer = !state.drawer;
  },
  DRAWER(state, val) {
    state.drawer = val;
  },
};

export const actions = {

};

export const getters = {

};
