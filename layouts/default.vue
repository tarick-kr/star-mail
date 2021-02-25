<template>
  <div
    id="appRoot"
    v-resize.quiet="onResize"
  >
    <v-app
      class="app"
    >
      <app-drawer
        :window-width="windowWidth"
        :window-height="windowHeight"
      />
      <app-toolbar
        :window-width="windowWidth"
        :window-height="windowHeight"
        :elevationAppToolbar="elevationAppToolbar"
      />
      <v-fab-transition v-if="floatingBtnCreateShow">
        <v-btn
          class="mx-3 floating-btn-create"
          fab
          dark
          medium
          color="#FFAD00"
        >
          <v-icon dark>
            mdi-pencil
          </v-icon>
        </v-btn>
      </v-fab-transition>
      <v-main>
        <nuxt />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import AppDrawer from '@/components/AppDrawer';
import AppToolbar from '@/components/AppToolbar';
import {mapGetters} from "vuex";

export default {
  name: 'Default',
  components: {
    AppDrawer,
    AppToolbar,
  },
  data: () => ({
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  }),
  computed: {
    ...mapGetters({
      offsetTop: 'offsetTop'
    }),
    floatingBtnCreateShow() {
      return this.windowWidth >= 600 && this.windowWidth < 1264 && this.windowHeight <= 450;
    },
    elevationAppToolbar() {
      return this.offsetTop > 5
    }
  },
  beforeMount() {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.initScreen()
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
      this.initScreen()
    },
    initScreen() {
      if(window.innerHeight <= 450 && window.innerHeight < window.innerWidth) {
        this.$store.commit('IS_SMALL_DEVICE_LANDSCAPE', true)
      } else {
        this.$store.commit('IS_SMALL_DEVICE_LANDSCAPE', false)
      }
    }
  },
};
</script>

<style scoped lang="sass">
  .app
    .floating-btn-create
      bottom: 20px
      right: 8px
      position: fixed
      z-index: 999

</style>
