<template>

    <div
      id="appRoot"
      v-resize.quiet="onResize"
    >
      <template>
        <v-app
          class="app"
        >
          <app-drawer
            :window-width="windowWidth"
            :window-height="windowHeight"
            v-click-outside="closeDrawer"
          />
          <app-toolbar
            :window-width="windowWidth"
            :window-height="windowHeight"
            :elevationAppToolbar="elevationAppToolbar"
          />
          <v-fab-transition v-if="middleDeviceLandscape">
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
      </template>
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
            @click.native="closeMessage"
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
    windowWidth: 0,
    windowHeight: 0,
  }),
  computed: {
    ...mapGetters({
      offsetTop: 'offsetTop',
      message: 'message',
      drawerMini: 'stateDrawerMini',
    }),
    middleDeviceLandscape() {
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
    },
    closeMessage () {
      this.$store.commit('CLEAR_MESSAGE')
    },
    closeDrawer() {
      if (this.windowWidth >= 600 && this.windowWidth < 1264 && !this.drawerMini) {
        this.$store.commit('SET_STATE_DRAWER_MINI', true)
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
