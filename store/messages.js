import jwtDecode from 'jwt-decode';

export const state = () => ({

});

export const mutations = {

};

export const actions = {
  async FETCH_MESSAGES({ commit }, token) {
    const jwtData = jwtDecode(token) || {};
    const { userId } = jwtData;
    try {
      return await this.$axios.$get(`/api/v1/message/fetch-all/${userId}`);
    } catch (e) {
      const message = {
        text: e.response.data.message,
        color: '#F57F17',
      };
      commit('SET_MESSAGE', message, { root: true });
      throw e;
    }
  },

  async FETCH_MESSAGES_BY_ID({ commit }, messageId) {
    console.log('action FETCH_MESSAGES_BY_ID messageId - ', messageId);
    try {
      return await this.$axios.$get(`/api/v1/message/fetch-one/${messageId}`);
    } catch (e) {
      const message = {
        text: e.response.data.message,
        color: '#F57F17',
      };
      commit('SET_MESSAGE', message, { root: true });
      throw e;
    }
  },

  async CREATE_MESSAGE(commit, {
    date, email, subject, textMail, textMailWithoutHtml, token,
  }) {
    const jwtData = jwtDecode(token) || {};
    const dataMessage = {
      subject,
      textMail,
      textMailWithoutHtml,
      email,
      date,
      userId: jwtData.userId,
    };
    try {
      return await this.$axios.$post('/api/v1/message/create', dataMessage);
    } catch (e) {
      const message = {
        text: e.response.data.message,
        color: '#F57F17',
      };
      commit('SET_MESSAGE', message, { root: true });
      // commit('FETCHING', false, { root: true });
      throw e;
    }
  },
};

export const getters = {

};
