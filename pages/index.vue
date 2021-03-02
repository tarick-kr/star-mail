<template>
  <div />
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  name: 'Index',
  layout: 'auth',
  // beforeCreate() {
  //   this.$router.push('/login');
  // },
  computed: {
    ...mapGetters({
      isAuthenticatedUser: 'auth/isAuthenticatedUser',
    }),
  },
  created() {
    if (this.isAuthenticatedUser) {
      this.$router.push('/messages');
    } else {
      this.$router.push('/login');
    }
    this.$store.commit('OFFSET_TOP', 0);
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
};
</script>

<style scoped lang="sass">

</style>
