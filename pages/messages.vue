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
              <h2>Мои сообщения</h2>
            </div>
            <v-divider dark />
            <template v-if="messages.length > 0">
              <v-list
                two-line
                dark
                color="#224955"
              >
                <v-list-item-group>
                  <template v-for="(item, index) in messages">
                    <v-list-item
                      :key="item._id"
                      :to="`/message/${item._id}`"
                    >
                      <template #default="{ active }">
                        <v-list-item-content>
                          <v-list-item-title v-text="item.subject" />

                          <v-list-item-subtitle
                            class="mb-4"
                            v-text="item.email"
                          />

                          <v-list-item-subtitle v-html="item.textWithoutHtml" />
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-list-item-action-text v-text="item.date" />

                          <v-btn
                            fab
                            small
                            text
                          >
                            <v-icon
                              color="grey lighten-1"
                            >
                              mdi-delete-forever
                            </v-icon>
                          </v-btn>
                        </v-list-item-action>
                      </template>
                    </v-list-item>

                    <v-divider
                      v-if="index < messages.length - 1"
                      :key="index"
                    />
                  </template>
                </v-list-item-group>
              </v-list>
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
import AppLoader from '@/components/AppLoader';

export default {
  name: 'MessagesPage',
  components: {
    AppLoader,
  },
  middleware: ['auth'],
  data: () => ({
    messages: [],
    messagesString: [],
    fetching: false,
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

  },
  methods: {
    onScroll(e) {
      this.$store.commit('OFFSET_TOP', e.target.scrollTop);
    },
    async fetchMessages() {
      this.fetching = true;
      this.messages = await this.$store.dispatch('messages/FETCH_MESSAGES', this.token);
      // this.messages = await this.$store.dispatch('messages/FETCH_MESSAGES');
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
