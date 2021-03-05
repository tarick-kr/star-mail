<template>
  <div
    id="appRoot"
    v-resize.quiet="onResize"
  >
    <template v-if="!loading">
      <nuxt />
    </template>

    <template v-if="message">
      <v-snackbar
        :timeout="3000000"
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
// import AppLoader from '@/components/AppLoader';

export default {
  name: 'Auth',
  components: {
    // AppLoader,
  },
  data: () => ({
    windowWidth: 0,
    windowHeight: 0,
    loading: false,
  }),
  computed: {
    ...mapGetters({
      message: 'message',
      documentReady: 'documentReady',
    }),
  },
  created() {
    this.loading = true;
  },
  beforeMount() {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.initScreen();
  },
  mounted() {
    // При первоначальной загрузке (перезагрузке) - дождаться пока не загрузяться все необходимые ресурсы
    if (!this.documentReady) {
      document.onreadystatechange = () => {
        if (document.readyState === 'complete') {
          this.$store.commit('DOCUMENT_READY', true);
          this.loading = false;
        }
      };
    } else {
      this.loading = false;
    }
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
      this.initScreen();
    },
    initScreen() {
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
