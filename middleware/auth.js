export default function ({ store, redirect }) {
  if (!store.getters['auth/isAuthenticatedUser']) {
    redirect('/login');
  }
}
