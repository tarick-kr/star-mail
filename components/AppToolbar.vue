<template>
  <div>
    <v-app-bar
      v-if="toolbarTop"
      dark
      color="#224955"
      class="hidden-xs-only"
      flat
      style="border-bottom: 1px solid rgba(255, 255, 255, 0.12); box-sizing: content-box; position: fixed; top: 0; z-index: 1;"
      height="64"
      :elevation="elevationAppToolbar ? 7 : 0"
    >
      <v-toolbar-title>
        <v-app-bar-nav-icon
          large
          @click.stop="toggleDrawer()"
        />
      </v-toolbar-title>
      <v-spacer />
      <AppToolbarBtn />
    </v-app-bar>

    <v-app-bar
      v-if="toolbarBottom"
      app
      fixed
      bottom
      dark
      color="#224955"
      flat
      :style="`border-top: 1px solid rgba(255, 255, 255, 0.12); box-sizing: content-box; top: calc(${windowHeight - 64}px);`"
      height="64"
      class="elevation-toolbar-bottom"
    >
      <v-toolbar-title>
        <v-app-bar-nav-icon
          tile
          text
          height="64"
          large
          class="nav-icon"
          @click.stop="toggleDrawer()"
        />
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        class="mb-12"
        fab
        dark
        large
        color="#FFAD00"
        elevation="12"
      >
        <v-icon dark>
          mdi-pencil
        </v-icon>
      </v-btn>
      <v-spacer />
      <AppToolbarBtn />
    </v-app-bar>
  </div>
</template>

<script>
import AppToolbarBtn from '@/components/AppToolbarBtn';

export default {
  name: 'AppToolbar',
  components: {
    AppToolbarBtn,
  },
  props: {
    windowWidth: {
      type: Number,
      required: true,
    },
    windowHeight: {
      type: Number,
      required: true,
    },
    elevationAppToolbar: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    toolbarTop: true,
    toolbarBottom: false,
    isAuthenticated: true,
  }),
  watch: {
    windowWidth(val) {
      this.toolbarTop = val >= 600;
      this.toolbarBottom = val < 600;
    },
  },
  beforeMount() {
    console.log('AppToolbar this.windowWidth - ', this.windowWidth);
    this.toolbarTop = this.windowWidth >= 600;
    this.toolbarBottom = this.windowWidth < 600;
  },
  methods: {
    toggleDrawer() {
      this.$store.commit('TOGGLE_STATE_DRAWER');
    },
  },
};
</script>

<style scoped lang="sass">
  ::v-deep .v-toolbar__content
    padding-top: 0
    padding-bottom: 0

  .nav-icon
    width: 64px
    margin-left: -16px

  .elevation-toolbar-bottom
    box-shadow: 0 -4px 5px -2px rgba(0, 0, 0, 0.2), 0px -7px 10px 1px rgba(0, 0, 0, 0.14), 0px -2px 16px 1px rgba(0, 0, 0, 0.12) !important
</style>
