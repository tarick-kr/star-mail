<template>
  <div class="login-page">
    <v-container class="center-flex hv-100">
      <AppLoginForm />
    </v-container>
  </div>
</template>

<script>

import AppLoginForm from '@/components/auth/AppLoginForm';
import { mapGetters } from 'vuex';

export default {
  components: {
    AppLoginForm,
  },
  layout: 'auth',
  computed: {
    ...mapGetters({
      isAuthenticatedUser: 'auth/isAuthenticatedUser',

    }),
  },

  mounted() {
    const { message } = this.$route.query;
    if (message === 'login') {
      const message = {
        text: 'Для начала войдите или зарегистрируйтесь',
        color: '#F57F17',
      };
      this.$store.commit('SET_MESSAGE', message);
    }
  },
  created() {
    if (this.isAuthenticatedUser) {
      this.$router.push('/messages');
    }
    this.$store.commit('OFFSET_TOP', 0);
  },

};
</script>
