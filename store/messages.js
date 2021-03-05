import jwtDecode from 'jwt-decode';

export const state = () => ({ });

export const mutations = { };

export const actions = {
  async FETCH_MESSAGES({ commit }, token) {
    const jwtData = jwtDecode(token) || {};
    const { userId } = jwtData;
    try {
      return await this.$axios.$get(`/api/v1/message/fetch-all/${userId}`);
    } catch (e) {
      const message = {
        text: e.response.data.message,
        status: 'warning',
      };
      commit('SET_MESSAGE', message, { root: true });
      throw e;
    }
  },

  async FETCH_MESSAGE_BY_ID({ commit }, messageId) {
    try {
      return await this.$axios.$get(`/api/v1/message/fetch-one/${messageId}`);
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  async SEND_MESSAGE(commit, {
    date, emailsArray, emailsString, subject, textMail, textMailWithoutHtml, token,
  }) {
    const jwtData = jwtDecode(token) || {};
    const dataMessage = {
      subject,
      textMail,
      textMailWithoutHtml,
      emailsArray,
      emailsString,
      date,
      userId: jwtData.userId,
    };
    try {
      await this.$axios.$post('/api/v1/message/send', dataMessage);
    } catch (e) {
      const message = {
        text: e.response.data.message,
        status: 'warning',
      };
      commit('SET_MESSAGE', message, { root: true });
      throw e;
    }
  },

  async DELETE_MESSAGE({ commit }, messageId) {
    try {
      return await this.$axios.$post(`/api/v1/message/delete/${messageId}`);
    } catch (e) {
      const message = {
        text: e.response.data.message,
        status: 'warning',
      };
      commit('SET_MESSAGE', message, { root: true });
      throw e;
    }
  },
};

export const getters = { };
