<template>
  <div
    id="appRoot"
    v-resize="onResize"
  >
    <v-app
      class="app"
    >
      <app-drawer :window-width="windowWidth" />
      <app-toolbar :window-width="windowWidth" />
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
    windowWidth: 0,
  }),
  computed: {

  },
  beforeMount() {
    this.windowWidth = window.innerWidth;
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
  },
};
</script>

<style lang="sass" scoped>
//.app-header
//  height: 64px
//  max-height: 64px

//.page-wrapper
  //min-height: calc(100vh - 64px)

//.page-enter-active, .page-leave-active
//  transition: opacity 0.4s
//
//.page-enter, .page-leave-active
//  opacity: 0

</style>
