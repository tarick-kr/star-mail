<template>
  <div class="message-page wrapper-main">
    <v-container
      id="scrollWrapper"
      class="overflow-y-auto"
      fluid
    >
      <transition
        appear
        appear-active-class="content-appear"
      >
        <div v-scroll:#scrollWrapper="onScroll">
          <v-card
            dark
            color="#224955"
            class="card-about"
            outlined
          >
            <v-card-actions>
              <v-btn
                fab
                small
                text
                to="/"
              >
                <v-icon>
                  mdi-keyboard-backspace
                </v-icon>
              </v-btn>
            </v-card-actions>
            <v-divider
              dark
              class="hidden-sm-and-up"
            />
            <v-card-title class="about-subject">
              Описание проекта:
            </v-card-title>
            <v-card-text class="about-text">
              Это демонстрационный проект, который представляет собой модуль админ-панели, отвечающий за рассылку сообщений.
            </v-card-text>
            <v-card-title class="about-subject">
              Функционал:
            </v-card-title>
            <v-card-text class="about-text">
              Это демонстрационный проект, который представляет собой модуль админ-панели, отвечающий за рассылку сообщений.
            </v-card-text>
            <v-card-title class="about-subject">
              Применённые технологии, фреймворки, библиотеки и прочее:
            </v-card-title>
            <v-card-text class="about-text">
              Это демонстрационный проект, который представляет собой модуль админ-панели, отвечающий за рассылку сообщений.
            </v-card-text>
          </v-card>
        </div>
      </transition>
    </v-container>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  name: 'About',
  head: () => ({
    title: 'О проекте',
  }),
  computed: {
    ...mapGetters({
      drawerMini: 'stateDrawerMini',
    }),
  },
  created() {
    // При изменении OFFSET_TOP у AppToolbar появится тень
    this.$store.commit('OFFSET_TOP', 0);
  },
  mounted() {
    this.checkStateDrawer();
  },
  methods: {
    onScroll(e) {
      this.$store.commit('OFFSET_TOP', e.target.scrollTop);
    },
    checkStateDrawer() {
      if (window.innerWidth >= 600 && window.innerWidth < 1264 && !this.drawerMini) {
        this.$store.commit('SET_STATE_DRAWER_MINI', true);
      }
    },
  },
};
</script>

<style scoped lang="sass">

  .wrapper-main
    #scrollWrapper
      max-height: calc(100vh - 64px)
      .card-about
        max-width: 70%
        margin-left: 48px
        .about-subject
          font-size: 18px
          padding-bottom: 0
        .about-text
          padding: 8px 16px
          font-size: 16px
          color: #fafafab8
    #scrollWrapper::-webkit-scrollbar
      width: 0

  @media screen and (max-width: 1264px)
    .wrapper-main
      #scrollWrapper
        .card-about
          max-width: 80%
          margin-left: 36px

  @media screen and (max-width: 960px)
    .wrapper-main
      #scrollWrapper
        .card-about
          max-width: 90%
          margin-left: 28px

  @media screen and (max-width: 600px)
    .wrapper-main
      #scrollWrapper
        .card-about
          max-width: 100%
          margin: 0 auto

</style>
