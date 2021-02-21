<template>
  <div
    id="appRoot"
    v-resize.quiet="onResize"
  >
    <v-app
      class="app"
    >
      <!--      <AppToolbarFullScreenBtn-->
      <!--        :window-width="windowWidth"-->
      <!--        class="hidden-sm-and-up"-->
      <!--      />-->
      <app-drawer
        :window-width="windowWidth"
        :window-height="windowHeight"
      />
      <app-toolbar
        :window-width="windowWidth"
        :window-height="windowHeight"
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
      <v-main
        class="page-wrapper"
      >
        <nuxt />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import AppDrawer from '@/components/AppDrawer';
import AppToolbar from '@/components/AppToolbar';

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
    floatingBtnCreateShow() {
      return this.windowWidth >= 600 && this.windowWidth < 1264 && this.windowHeight <= 450;
    },
  },
  beforeMount() {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
    },
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

  //.page-enter-active, .page-leave-active
  //  transition: opacity 0.4s
  //
  //.page-enter, .page-leave-active
  //  opacity: 0
</style>
