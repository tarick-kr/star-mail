<template>
  <div class="logout-page wrapper-main">
    <v-container class="center-flex height-wrapper">
      <transition
        appear
        appear-active-class="content-appear"
      >
      <!--  Нужно будет вставить какой-то лодер  -->
      </transition>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  layout: 'default',
  computed: {
    ...mapGetters({
      isAuthenticatedUser: 'auth/isAuthenticatedUser',
    }),
  },
  created() {
    this.$store.commit('OFFSET_TOP', 0);
  },
  beforeMount() {
    if (this.isAuthenticatedUser) {
      this.$store.dispatch('auth/LOGOUT_USER');
      this.$router.push('/');
    }
  },
};
</script>

<style scoped lang="sass">
  @import "assets/variables"

  .height-wrapper
    height: calc(100vh - 64px)

</style>
