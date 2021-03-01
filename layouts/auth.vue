<template>
  <div
    id="appRoot"
    v-resize.quiet="onResize"
  >
    <nuxt />
    <template v-if="message">
      <v-snackbar
        :timeout="3000"
        :color="message.color"
        value="true"
        @input="closeMessage"
      >
        {{ message.text }}
        <v-btn
          tile
          text
          @click="closeMessage"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </v-snackbar>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Auth',
  data: () => ({
    windowWidth: 0,
    windowHeight: 0,
  }),
  computed: {
    ...mapGetters({
      message: 'message',
    }),
  },
  beforeMount() {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.initScreen();
  },
  methods: {
    onResize() {
      console.log('onResize');
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
      this.initScreen();
    },
    initScreen() {
      console.log('initScreen innerHeight - ', window.innerHeight);
      console.log('initScreen innerWidth - ', window.innerWidth);
      if (window.innerHeight <= 450 && window.innerHeight < window.innerWidth) {
        this.$store.commit('IS_SMALL_DEVICE_LANDSCAPE', true);
      } else {
        this.$store.commit('IS_SMALL_DEVICE_LANDSCAPE', false);
      }
    },
    closeMessage() {
      this.$store.commit('CLEAR_MESSAGE');
    },
  },
};

</script>

<style scoped lang="sass">
  //.page-enter-active, .page-leave-active
  //  transition: opacity 0.4s
  //
  //.page-enter, .page-leave-active
  //  opacity: 0
</style>
