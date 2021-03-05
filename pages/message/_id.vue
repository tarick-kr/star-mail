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
            class="card-message"
            outlined
          >
            <v-card-actions>
              <v-btn
                fab
                small
                text
                to="/messages"
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
            <div class="d-flex justify-space-between align-center">
              <v-card-title class="message-subject">
                {{ message.subject }}
              </v-card-title>
              <v-card-title class="message-date">
                {{ getDate(message.date) }}
              </v-card-title>
            </div>
            <v-expansion-panels
              flat
              accordion
            >
              <v-expansion-panel>
                <v-expansion-panel-header
                  color="#224955"
                >
                  Получатели
                  <template #actions>
                    <v-icon
                      color="#FFFFFF"
                      medium
                    >
                      mdi-chevron-down
                    </v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content
                  color="#224955"
                >
                  <p>
                    {{ message.emailsString }}
                  </p>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>

            <v-divider dark />
            <v-card-text
              class="message-text"
              v-html="message.text"
            />
          </v-card>
        </div>
      </transition>
    </v-container>
  </div>
</template>

<script>

import moment from 'moment';

export default {
  name: 'MessageOne',
  data: () => ({
    message: '',
    fetching: false,
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
    getDate(date) {
      return moment(date).format('DD.MM.YY');
    },
  },

};
</script>

<style scoped lang="sass">

  .wrapper-main
    #scrollWrapper
      max-height: calc(100vh - 64px)
      .card-message
        max-width: 70%
        margin-left: 48px
        .message-subject
          font-size: 18px
        .message-date
          font-size: 14px
        .message-text
          padding: 20px 8px 8px
          font-size: 18px
          color: #fafafa
    #scrollWrapper::-webkit-scrollbar
      width: 0

  @media screen and (max-width: 1264px)
    .wrapper-main
      #scrollWrapper
        .card-message
          max-width: 80%
          margin-left: 36px

  @media screen and (max-width: 960px)
    .wrapper-main
      #scrollWrapper
        .card-message
          max-width: 90%
          margin-left: 28px

  @media screen and (max-width: 600px)
    .wrapper-main
      #scrollWrapper
        .card-message
          max-width: 100%
          margin: 0 auto

</style>
