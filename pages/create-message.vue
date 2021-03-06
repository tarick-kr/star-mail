<template>
  <div class="create-message-page wrapper-main">
    <v-container
      id="scrollWrapper"
      v-resize.quiet="onResize"
      class="overflow-y-auto"
      fluid
    >
      <transition
        appear
        appear-active-class="content-appear"
      >
        <div
          v-scroll:#scrollWrapper="onScroll"
        >
          <AppCreateMessageForm :window-width="windowWidth" />
        </div>
      </transition>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AppCreateMessageForm from '@/components/create-message/AppCreateMessageForm';

export default {
  name: 'CreateMessagePage',
  components: {
    AppCreateMessageForm,
  },
  middleware: ['auth'],
  data() {
    return {
      windowWidth: 0,
    };
  },
  head: () => ({
    title: 'Создание рассылки',
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
    this.windowWidth = window.innerWidth;
    this.checkStateDrawer();
  },
  methods: {
    onScroll(e) {
      this.$store.commit('OFFSET_TOP', e.target.scrollTop);
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    checkStateDrawer() {
      if (this.windowWidth >= 600 && this.windowWidth < 1264 && !this.drawerMini) {
        this.$store.commit('SET_STATE_DRAWER_MINI', true);
      }
    },
  },
};
</script>

<style scoped lang="sass">
  @import "assets/variables"

  .wrapper-main
    #scrollWrapper
      max-height: calc(100vh - 64px)

  // Скрытие скролла
  .wrapper-main
    #scrollWrapper::-webkit-scrollbar
      width: 0

  @media screen and (max-width: 600px)
    .wrapper-main
      #scrollWrapper
        max-height: calc(100vh - 64px)

</style>
