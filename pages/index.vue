<template>
  <div />
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  name: 'Index',
  layout: 'auth',
  // head: () => ({
  //   title: 'Модуль рассылки админ-панели',
  // }),
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
};
</script>

<style scoped lang="sass">

</style>
