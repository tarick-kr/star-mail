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
          <AppMessage :message="message" />
        </div>
      </transition>
    </v-container>
  </div>
</template>

<script>

import AppMessage from '@/components/message/AppMessage';

export default {
  name: 'MessageOne',
  components: {
    AppMessage,
  },
  data: () => ({
    message: {},
    fetching: false,
  }),
  head: () => ({
    title: 'Сообщение',
  }),
  created() {
    // При изменении OFFSET_TOP у AppToolbar появится тень
    this.$store.commit('OFFSET_TOP', 0);
    this.fetchMessage();
  },
  mounted() {

  },
  methods: {
    onScroll(e) {
      this.$store.commit('OFFSET_TOP', e.target.scrollTop);
    },
    async fetchMessage() {
      this.fetching = true;
      this.message = await this.$store.dispatch('messages/FETCH_MESSAGE_BY_ID', this.$route.params.id);
      this.fetching = false;
    },
  },

};
</script>

<style scoped lang="sass">

  .wrapper-main
    #scrollWrapper
      max-height: calc(100vh - 64px)
      //.card-message
      //  max-width: 70%
      //  margin-left: 48px
      //  .message-subject
      //    font-size: 18px
      //  .message-date
      //    font-size: 14px
      //  .message-text
      //    padding: 20px 8px 8px
      //    font-size: 18px
      //    color: #fafafa
    #scrollWrapper::-webkit-scrollbar
      width: 0

  //@media screen and (max-width: 1264px)
  //  .wrapper-main
  //    #scrollWrapper
  //      .card-message
  //        max-width: 80%
  //        margin-left: 36px
  //
  //@media screen and (max-width: 960px)
  //  .wrapper-main
  //    #scrollWrapper
  //      .card-message
  //        max-width: 90%
  //        margin-left: 28px
  //
  //@media screen and (max-width: 600px)
  //  .wrapper-main
  //    #scrollWrapper
  //      .card-message
  //        max-width: 100%
  //        margin: 0 auto

</style>
