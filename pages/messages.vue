<template>
  <div class="messages-page wrapper-main">
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
          <template v-if="!fetching">
            <div class="pt-6 px-5 pb-3">
              <h2>Мои рассылки</h2>
            </div>
            <v-divider dark />
            <template v-if="messages.length > 0">
              <AppListMessages
                :messages="messages"
                @remove="deleteMessage"
              />
            </template>
            <template v-else>
              <div class="pt-6 px-5 pb-3">
                <h3>Список сообщений пуст</h3>
              </div>
            </template>
          </template>
          <template v-else>
            <AppLoader />
          </template>
        </div>
      </transition>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AppLoader from '@/components/common/AppLoader';
import AppListMessages from '@/components/messages/AppListMessages';

export default {
  name: 'MessagesPage',
  components: {
    AppLoader,
    AppListMessages,
  },
  middleware: ['auth'],
  data: () => ({
    messages: [],
    fetching: false,
  }),
  head: () => ({
    title: 'Мои рассылки',
  }),
  computed: {
    ...mapGetters({
      token: 'auth/tokenUser',
    }),
  },
  created() {
    // При изменении OFFSET_TOP у AppToolbar появится тень
    this.$store.commit('OFFSET_TOP', 0);
    this.fetchMessages();
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
    async fetchMessages() {
      this.fetching = true;
      this.messages = await this.$store.dispatch('messages/FETCH_MESSAGES', this.token);
      this.fetching = false;
    },
    async deleteMessage(e) {
      this.fetching = true;
      await this.$store.dispatch('messages/DELETE_MESSAGE', e);
      this.messages = await this.$store.dispatch('messages/FETCH_MESSAGES', this.token);
      this.fetching = false;
    },
  },
};
</script>

<style scoped lang="sass">

  .wrapper-main
    #scrollWrapper
      padding: 0 50px 20px
      max-height: calc(100vh - 64px)
    #scrollWrapper::-webkit-scrollbar
      width: 0

  @media screen and (max-width: 960px)
    .wrapper-main
      #scrollWrapper
        padding: 0 30px 20px
  @media screen and (max-width: 600px)
    .wrapper-main
      #scrollWrapper
        padding: 0 20px 0

</style>
