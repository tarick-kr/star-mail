<template>
  <v-btn
    tile
    text
    small
    height="64"
    color="white"
    class="btn-toolbar px-0"
    to="/logout"
  >
    <div class="center-flex-column">
      <v-icon>mdi-logout-variant</v-icon>
      <span class="btn-text">выйти</span>
    </div>
  </v-btn>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'AppToolbarBtn',

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
