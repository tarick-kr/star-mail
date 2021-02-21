<template>
  <v-btn
    tile
    text
    small
    height="64"
    :color="isAuthenticated ? '#FFAD00' : 'white'"
    class="btn-toolbar px-0"
    @click.stop="isAuthenticated=!isAuthenticated"
  >
    <div class="center-flex-column">
      <v-icon v-if="isAuthenticated">
        mdi-account-check
      </v-icon>
      <v-icon v-else>
        mdi-account-lock
      </v-icon>
      <span
        v-if="isAuthenticated"
        class="btn-text"
      >выйти</span>
      <span
        v-else
        class="btn-text"
      >войти</span>
    </div>
  </v-btn>
</template>

<script>
export default {
  name: 'AppToolbarBtn',
  data: () => ({
    isAuthenticated: false,
  }),
};
</script>

<style scoped lang="sass">
  .btn-toolbar
    width: 64px
    margin-right: -16px
    .btn-text
      font-size: 9px
      line-height: 15px

</style>
