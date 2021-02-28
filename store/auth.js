import Cookie from 'cookie';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

function isJWTValid(token) {
  if (!token) {
    return false;
  }
  const jwtData = jwtDecode(token) || {};
  if (jwtData.userId) {
    const expires = jwtData.exp || 0;
    return (new Date().getTime() / 1000) < expires;
  }
  return false;
}

function getMessagesIdsFromCookies() {
  const cookiesStr = process.browser ? document.cookie : this.app.context.req.headers.cookie;
  const cookies = Cookie.parse(cookiesStr || '') || {};
  const token = cookies['jwt-token'];
  const jwtData = jwtDecode(token) || {};
  console.log('jwtData - ', jwtData);
  const { messagesIds } = jwtData;
  console.log('messagesIds - ', messagesIds);
}

export const state = () => ({
  tokenUser: null,
});

export const mutations = {
  SET_TOKEN_USER(state, token) {
    state.tokenUser = token;
  },

  CLEAR_TOKEN_USER(state) {
    state.tokenUser = null;
  },
};

export const actions = {
  async ADD_USER({ commit }, formData) {
    try {
      await this.$axios.$post('/api/v1/auth/create', formData);
    } catch (e) {
      const message = {
        text: e.response.data.message,
        color: '#F57F17',
      };
      commit('SET_MESSAGE', message, { root: true });
      throw e;
    }
  },
  async LOGIN_USER({ commit, dispatch }, formData) {
    try {
      const token = await this.$axios.$post('/api/v1/auth/login', formData);
      dispatch('SET_TOKEN_USER', token);
      getMessagesIdsFromCookies(token);
    } catch (e) {
      const message = {
        text: e.response.data.message,
        color: '#F57F17',
      };
      commit('SET_MESSAGE', message, { root: true });
      throw e;
    }
  },
  LOGOUT_USER({ commit }) {
    this.$axios.setToken(false);
    commit('CLEAR_TOKEN_USER');
    Cookies.remove('jwt-token');
  },
  SET_TOKEN_USER({ commit }, token) {
    this.$axios.setToken(token, 'Bearer');
    commit('SET_TOKEN_USER', token);
    Cookies.set('jwt-token', token);
  },
  AUTO_LOGIN({ dispatch }) {
    const cookiesStr = process.browser ? document.cookie : this.app.context.req.headers.cookie;
    const cookies = Cookie.parse(cookiesStr || '') || {};
    const token = cookies['jwt-token'];
    if (isJWTValid(token)) {
      dispatch('SET_TOKEN_USER', token);
    } else {
      dispatch('LOGOUT_USER');
    }
  },
};

export const getters = {
  isAuthenticatedUser: (state) => Boolean(state.tokenUser),
  tokenUser: (state) => state.tokenUser,
};
