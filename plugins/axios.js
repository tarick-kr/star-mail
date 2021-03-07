const keys = require('../server/keys');

export default function ({ $axios, redirect, store }) {
  $axios.interceptors.request.use((request) => {
    if (store.getters['auth/isAuthenticatedUser'] && !request.headers.common.Authorization) {
      const token = store.getters['auth/tokenUser'];
      request.headers.common.Authorization = `Bearer ${token}`;
    }
    return request;
  });

  $axios.onError((error) => {
    if (error.response) {
      if (error.response.status === 401) {
        redirect(`${keys.BASE_URL}/`);
        // redirect(`${keys.BASE_URL}/login`)
        store.dispatch('auth/LOGOUT_USER');
      }
      if (error.response.status === 500) {
        redirect(`${keys.BASE_URL}/not-found`);
        console.error('Server 500 error');
      }
    }
  });
}
