<template>
  <div>
    <v-app-bar
      v-if="toolbarTop"
      absolute
      dark
      color="#224955"
      class="hidden-xs-only"
      flat
      style="border-bottom: 1px solid rgba(255, 255, 255, 0.12); box-sizing: content-box;"
      height="64"
    >
      <v-toolbar-title>
        <v-app-bar-nav-icon
          large
          @click.stop="toggleDrawer()"
        />
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        class="ma-2"
        small
        fab
      >
        <v-avatar>
          <img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="John"
          >
        </v-avatar>
      </v-btn>
    </v-app-bar>
    <v-app-bar
      v-if="toolbarBottom"
      app
      absolute
      bottom
      dark
      color="#224955"
      flat
      style="border-top: 1px solid rgba(255, 255, 255, 0.12); box-sizing: content-box;"
      height="64"
    >
      <v-toolbar-title>
        <v-app-bar-nav-icon
          large
          @click.stop="toggleDrawer()"
        />
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        class="ma-2"
        small
        fab
      >
        <v-avatar>
          <img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="John"
          >
        </v-avatar>
      </v-btn>
    </v-app-bar>
  </div>
</template>
<script>

export default {
  name: 'AppToolbar',
  components: {},
  props: {
    windowWidth: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    toolbarTop: true,
    toolbarBottom: false,
  }),
  watch: {
    windowWidth(val) {
      this.toolbarTop = val >= 600;
      this.toolbarBottom = val < 600;
    },
  },
  beforeMount() {
    this.toolbarTop = this.windowWidth >= 600;
    this.toolbarBottom = this.windowWidth < 600;
  },
  methods: {
    toggleDrawer() {
      this.$store.commit('TOGGLE_DRAWER');
    },
  },
};
</script>

<style scoped lang="sass">
  ::v-deep .v-toolbar__content
    padding-top: 0
    padding-bottom: 0
</style>
