<template>
  <v-btn
    class="full-screen-btn"
    icon
    color="white"
    @click="handleFullScreen()"
  >
    <v-icon large>
      {{ screenIcon }}
    </v-icon>
  </v-btn>
</template>

<script>
import Util from '@/util';
import { mapGetters } from 'vuex';

export default {
  name: 'AppToolbarFullScreenBtn',
  props: {
    windowWidth: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    screenIcon: 'mdi-fullscreen',
  }),
  computed: {
    // ...mapGetters({
    //   fullScreen: 'fullScreen',
    // }),
  },
  // beforeMount() {
  //   console.log('beforeMount fullScreen', this.fullScreen);
  //   if (this.fullScreen) {
  //     console.log('beforeMount fullScreen', this.fullScreen);
  //     this.handleFullScreen();
  //   }
  // },
  mounted() {
    if (this.windowWidth < 600) {
      console.log('mounted handleFullScreen', this.windowWidth);
      this.handleFullScreen();
    }
  },
  methods: {
    handleFullScreen() {
      console.log('handleFullScreen()');
      if (this.screenIcon === 'mdi-fullscreen') {
        this.screenIcon = 'mdi-fullscreen-exit';
      } else {
        this.screenIcon = 'mdi-fullscreen';
      }
      Util.toggleFullScreen();
    },
  },
};
</script>

<style scoped lang="sass">

  .full-screen-btn
    position: absolute
    width: 64px
    height: 64px
    top: 0
    right: 0
    z-index: 999

</style>
