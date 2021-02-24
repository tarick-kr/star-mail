<template>
  <client-only>
    <v-navigation-drawer
      v-model="drawer"
      mobile-breakpoint="600"
      :mini-variant="drawerMini"
      mini-variant-width="64"
      fixed
      width="260"
      dark
      class="appDrawer"
      color="#224955"
      :class="elevationDrawer ? 'elevation-drawer' : '' "
    >
      <!--  Логотип  -->
      <v-app-bar
        height="64"
        dark
        color="#224955"
        elevation="0"
        class="drawer-toolbar"
      >
        <div
          v-if="!drawerMini"
          class="wrap-img-logo"
        >
          <nuxt-link
            to="/"
            class="center-flex w-100"
          >
            <img
              src="../static/app_logo_accent.svg"
              height="36"
              alt="Star Mail"
            >
          </nuxt-link>
        </div>
        <div
          v-else
          class="center-flex wrap-img-logo-mini"
        >
          <nuxt-link
            v-if="drawerMini"
            to="/"
            class="center-flex w-100"
          >
            <img
              src="../static/app_logo_mini_accent.svg"
              height="36"
              alt="Star Mail"
            >
          </nuxt-link>
        </div>
      </v-app-bar>
      <!--  Кнопка "Создать сообщение"  -->
      <div
        v-if="!drawerBtnCreateHidden"
        class="center-flex-column drawer-wrapper-btn"
      >
        <v-btn
          v-if="!drawerMini"
          rounded
          color="#FFAD00"
          large
          class="my-2 mx-6"
        >
          <v-icon
            left
            dark
            class="drawer-btn-icon"
          >
            mdi-border-color
          </v-icon>
          <span class="drawer-btn-text">
            написать
          </span>
        </v-btn>
        <v-btn
          v-else
          class="mx-3"
          fab
          dark
          small
          color="#FFAD00"
        >
          <v-icon dark>
            mdi-pencil
          </v-icon>
        </v-btn>
      </div>
      <div
        v-else
        style="margin-top: 64px;"
      />
      <!--  Меню  -->
      <div
        class="drawer-wrapper-content"
        :style="`height: ${heightWrapperContent}px;`"
      >
        <v-divider />
        <v-list class="pa-0">
          <template v-for="(item) in drawerMenuTop">
            <v-list-item
              v-if="item.name"
              :key="item.title"
              :to="item.href ? item.href : null"
            >
              <v-list-item-icon>
                <v-icon>
                  {{ item.icon }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  <span>
                    {{ item.title }}
                  </span>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider
              v-else-if="item.divider"
              :key="item.title"
              :style="item.hiddenSmDevice && displayBtnFullscreen === 'none' ? 'display: none;' : 'display: block;'"
            />
            <v-list-item
              v-else-if="item.click"
              :key="item.title"
              :style="`display: ${displayBtnFullscreen};`"
              @click="handleFullScreen()"
            >
              <v-list-item-icon>
                <v-icon>
                  {{ screenIcon }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  <span>
                    {{ titleFullScreen }}
                  </span>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>

        <div v-if="drawerToggleBtn">
          <v-btn
            v-if="drawerMini"
            tile
            text
            block
            class="drawer-toggle-btn"
            @click="toggleDrawerMini(false)"
          >
            <v-icon>mdi-chevron-double-right </v-icon>
          </v-btn>
          <v-btn
            v-else
            tile
            text
            block
            class="drawer-toggle-btn"
            @click="toggleDrawerMini(true)"
          >
            <v-icon>mdi-chevron-double-left </v-icon>
          </v-btn>
        </div>
        <v-spacer />
        <div>
          <v-list class="pa-0">
            <template v-for="(item, i) in drawerMenuBottom">
              <v-divider
                v-if="item.divider"
                :key="i"
                class="my-0"
              />
              <v-list-item
                v-else
                :key="item.title"
                :to="item.href ? item.href : null"
                style="height: 64px;"
              >
                <v-list-item-icon style="height: 32px;">
                  <v-icon>
                    {{ item.icon }}
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    <span>
                      {{ item.title }}
                    </span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </div>
      </div>
    </v-navigation-drawer>
  </client-only>
</template>

<script>

import { mapGetters } from 'vuex';
import Util from '@/util';

export default {
  name: 'AppDrawer',
  props: {
    windowWidth: {
      type: Number,
      required: true,
    },
    windowHeight: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    screenIcon: 'mdi-fullscreen',
    titleFullScreen: 'Развернуть',
  }),
  computed: {
    ...mapGetters({
      drawerMini: 'stateDrawerMini',
    }),
    drawer: {
      get() {
        return this.$store.getters.stateDrawer;
      },
      set(val) {
        this.$store.commit('SET_STATE_DRAWER', val);
      },
    },
    drawerMenuTop() {
      return [
        {
          title: 'Сообщения',
          icon: 'mdi-email',
          name: 'Messages',
          href: '/messages',
        },
        {
          title: 'Шаблоны',
          icon: 'mdi-view-dashboard-variant',
          name: 'Users',
          href: '/templates',
        },
        {
          title: 'Разделитель-1',
          divider: true,
        },
        {
          title: 'Профиль',
          icon: 'mdi-account-cog',
          name: 'Profile',
          href: '/profile',
        },
        {
          title: 'Разделитель-2',
          divider: true,
        },
        {
          title: 'fullscreen',
          click: true,
        },
        {
          title: 'Разделитель-3',
          divider: true,
          hiddenSmDevice: true,
        },
      ];
    },
    drawerMenuBottom() {
      return [
        { divider: true },
        {
          title: 'О сервисе',
          group: 'extra',
          icon: 'mdi-help-circle-outline',
          href: '/about',
        },
      ];
    },
    drawerToggleBtn() {
      return this.windowWidth < 1264;
    },
    drawerBtnCreateHidden() {
      return this.windowHeight <= 450 || this.windowWidth < 600;
    },
    heightWrapperContent() {
      return this.drawerBtnCreateHidden ? this.windowHeight - 64 : this.windowHeight - 64 - 150;
    },
    displayBtnFullscreen() {
      return this.windowHeight <= 600 || this.windowWidth <= 600 ? 'flex' : 'none';
    },
    elevationDrawer() {
      return this.drawer && !this.drawerMini && this.windowWidth >= 600 && this.windowWidth < 1264
    }
  },
  watch: {
    windowWidth(newVal, val) {
      if (newVal !== val) {
        this.initDrawer();
      }
    },
    drawer() {
      this.$store.commit('SET_STATE_DRAWER_MINI', true);
    },
  },
  created() {
    this.initDrawer();
  },
  methods: {
    toggleDrawerMini(val) {
      this.$store.commit('SET_STATE_DRAWER_MINI', val);
    },
    initDrawer() {
      if (this.windowWidth < 600) {
        this.$store.commit('SET_STATE_DRAWER', false);
        this.$store.commit('SET_STATE_DRAWER_MINI', true);
      } else if (this.windowWidth >= 600 && this.windowWidth < 1264) {
        this.$store.commit('SET_STATE_DRAWER', true);
        this.$store.commit('SET_STATE_DRAWER_MINI', true);
      } else {
        this.$store.commit('SET_STATE_DRAWER', true);
        this.$store.commit('SET_STATE_DRAWER_MINI', false);
      }
    },
    handleFullScreen() {
      if (this.screenIcon === 'mdi-fullscreen') {
        this.titleFullScreen = 'Свернуть';
        this.screenIcon = 'mdi-fullscreen-exit';
      } else {
        this.titleFullScreen = 'Развернуть';
        this.screenIcon = 'mdi-fullscreen';
      }
      Util.toggleFullScreen();
    },
  },
};
</script>

<style scoped lang="sass">

  .appDrawer
    ::v-deep.v-navigation-drawer__content::-webkit-scrollbar
      width: 4px
      background-color: #224955
    ::v-deep.v-navigation-drawer__content::-webkit-scrollbar-thumb
      border-radius: 4px
      background-color: #295f6f
    ::v-deep.v-navigation-drawer__content::-webkit-scrollbar-track
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2)
      border-radius: 2px
      background-color: #809fa9
    .drawer-toolbar
      ::v-deep.v-toolbar__content
        width: 100%
        height: 100%
        padding: 0

  .appDrawer
    .drawer-toolbar
      position: fixed
      top: 0
      z-index: 2
      border-right: 1px solid rgba(255, 255, 255, 0.12) !important
      border-bottom: 1px solid rgba(255, 255, 255, 0.12) !important
      box-sizing: content-box
      .wrap-img-logo
        width: 100%
      .wrap-img-logo-mini
        width: 100%

    .drawer-wrapper-btn
      height: 150px
      margin-top: 64px
      justify-content: center
      .drawer-btn-icon
        &::before
          height: 18px
      .drawer-btn-text
        font-size: 17px
        font-weight: 700
        line-height: 18px

    .drawer-wrapper-content
      display: flex
      flex-direction: column
      justify-content: space-between
      .full-screen-btn
        width: 56px
        height: 64px
      .drawer-toggle-btn
        height: 56px

  .elevation-drawer
    box-shadow: 4px 0 5px -2px rgba(0, 0, 0, 0.2), 7px 0 10px 1px rgba(0, 0, 0, 0.14), 2px 0 16px 1px rgba(0, 0, 0, 0.12) !important

</style>
