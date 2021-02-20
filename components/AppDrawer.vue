<template>
  <client-only>
    <v-navigation-drawer
      id="appDrawer"
      v-model="drawer"
      mobile-breakpoint="600"
      :mini-variant="drawerMini"
      mini-variant-width="64"
      app
      fixed
      width="260"
      dark
      color="#224955"
    >
      <v-toolbar
        height="64"
        dark
        color="#224955"
        elevation="0"
        class="drawer-toolbar"
        style="position:relative;"
      >
        <nuxt-link
          v-if="!drawerMini"
          to="/"
          class="center-flex w-100"
        >
          <img
            src="../static/app_logo.svg"
            height="36"
            alt="Star Mail"
          >
        </nuxt-link>
        <div
          v-else
          class="drawer-angle-btn center-flex"
        >
          <nuxt-link
            v-if="drawerMini"
            to="/"
            class="center-flex w-100"
          >
            <img
              src="../static/app_logo_mini.svg"
              height="36"
              alt="Star Mail"
            >
          </nuxt-link>
        </div>
      </v-toolbar>

      <div class="center-flex-column drawer-wrapper-btn">
        <v-divider />

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

        <v-divider />
      </div>
      <div class="drawer-wrapper-content">
        <div>
          <v-list class="pa-0">
            <template v-for="(item, i) in drawerMenuTop">
              <v-list-item
                v-if="item.name"
                :key="item.name"
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
                :key="i"
              />
            </template>
          </v-list>
        </div>
        <div v-if="drawerToggleBtn">
          <v-btn
            v-if="drawerMini"
            tile
            text
            block
            height="64px"
            @click="toggleDrawerMini(false)"
          >
            <v-icon>mdi-chevron-double-right </v-icon>
          </v-btn>
          <v-btn
            v-else
            tile
            text
            block
            height="64px"
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

export default {
  name: 'AppDrawer',
  props: {
    windowWidth: {
      type: Number,
      required: true,
    },
  },
  data: () => ({

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
        { divider: true },
        {
          title: 'Профиль',
          icon: 'mdi-account-cog',
          name: 'Profile',
          href: '/profile',
        },
        { divider: true },
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
  },
};
</script>

<style lang="sass">
  #appDrawer
    .drawer-angle-btn
      position: absolute
      height: 64px
      width: 64px
      top: 0
      left: 0

    .drawer-header
      margin-bottom: 50px
    .drawer-wrapper-btn
      height: 150px
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
      height: calc(100vh - 64px - 150px)

</style>
