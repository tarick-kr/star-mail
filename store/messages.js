export const state = () => ({

})

export const mutations = {

}

export const actions = {
  async FETCH_MESSAGES (commit, dispatch) {
    try {
      return await this.$axios.$get('/api/v1/message/fetch')
    } catch (e) {
      const message = {
        text: e.response.data.message,
        color: '#F57F17'
      }
      commit('SET_MESSAGE', message, { root: true })
      throw e
    }
  }
}

export const getters = {

}
