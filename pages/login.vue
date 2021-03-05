<template>
  <div class="login-page">
    <v-container class="center-flex hv-100">
      <transition
        appear
        appear-active-class="content-appear"
      >
        <AppLoginForm />
      </transition>
    </v-container>
  </div>
</template>

<script>

import AppLoginForm from '@/components/auth/AppLoginForm';
// import { mapGetters } from 'vuex';

export default {
  name: 'LoginPage',
  components: {
    AppLoginForm,
  },
  layout: 'auth',
  head: () => ({
    title: 'Вход',
  }),
};
</script>
