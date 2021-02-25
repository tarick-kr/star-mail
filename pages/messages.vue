<template>
  <div class="messages-page wrapper-main" >
    <v-container id="scrollWrapper" class="overflow-y-auto" fluid>
      <transition appear appear-active-class="content-appear">
        <div v-scroll:#scrollWrapper="onScroll">
          <div class="pt-6 px-5 pb-3">
            <h2>Мои сообщения</h2>
          </div>
          <v-divider dark></v-divider>
          <template v-if="messages.length > 0">
            <v-list  two-line dark color="#224955">
              <v-list-item-group>
                <template v-for="(item, index) in messages">
                  <v-list-item :key="item._id" :to="`/message/${item._id}`">
                    <template v-slot:default="{ active }">
                      <v-list-item-content>
                        <v-list-item-title v-text="item.subject"></v-list-item-title>

                        <v-list-item-subtitle
                          v-text="item.email"
                        ></v-list-item-subtitle>

                        <v-list-item-subtitle v-text="item.text"></v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-list-item-action-text v-text="item.date"></v-list-item-action-text>

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
                  ></v-divider>
                </template>
              </v-list-item-group>
            </v-list>
          </template>
          <template v-else>
            <div class="pt-6 px-5 pb-3">
              <h3>Список сообщений пуст</h3>
            </div>
          </template>
        </div>
      </transition>
    </v-container>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "messages",
  middleware: ['auth'],
  // async asyncData ({ store }) {
  //   const messages = await store.dispatch('messages/FETCH_MESSAGES')
  //   return {
  //     messages
  //   }
  // },
  data: () => ({
    // items: [
    //   {
    //     date: '23.02.21',
    //     email: 'pochta@mail.com',
    //     text: `Задача организации, в особенности же постоянное информационно-пропагандистское обеспечение нашей`,
    //     title: 'Какое-то название',
    //     id: '1123451326412'
    //   },
    //   {
    //     date: '22.02.21',
    //     email: 'test@mail.com',
    //     text: `Разнообразный и богатый опыт консультация с широким активом в значительной степени обуславливает создание существенных финансовых и административных условий.`,
    //     title: 'Summedfr BBQ',
    //     id: '8974321654132'
    //   },
    //   {
    //     date: '16.01.21',
    //     email: 'test-test@mail.com',
    //     text: 'По своей сути рыбатекст является альтернативой традиционному lorem ipsum, который вызывает у некторых людей недоумение при попытках прочитать рыбу текст. ',
    //     title: 'Ofui oui',
    //     id: '65650324653'
    //   },
    //   {
    //     date: '16.01.21',
    //     email: 'test@mail.com',
    //     text: 'В отличии от lorem ipsum, текст рыба на русском языке наполнит любой макет непонятным смыслом и придаст неповторимый колорит советских времен.',
    //     title: 'Birthsdday gift',
    //     id: '6841632146853401'
    //   },
    //   {
    //     date: '08.01.21',
    //     email: 'pochta@mail.com',
    //     text: 'Сайт рыбатекст поможет дизайнеру, верстальщику,',
    //     title: 'Recipesd to try',
    //     id: '6554653465321'
    //   },
    //   {
    //     date: '01.01.21',
    //     email: 'pochtamail@mail.com',
    //     text: `Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце`,
    //     title: 'Brunchd this weekend?',
    //     id: '+4653161565313'
    //   },
    //   {
    //     date: '20.12.20',
    //     email: 'user@ukr.net',
    //     text: `Разнообразный и богатый опыт консультация`,
    //     title: 'Summedr BBQ',
    //     id: '6742653465301'
    //   },
    //   {
    //     date: '10.12.20',
    //     email: 'user-test@ukr.net',
    //     text: 'Товарищи! рамки и место обучения кадров играет важную роль в формировании соответствующий',
    //     title: 'Oudi oui',
    //     id: '65432465403046'
    //   },
    //   {
    //     date: '09.12.20',
    //     email: 'pochtamail@gmail.com',
    //     text: `При создании генератора мы использовали небезизвестный универсальный код речей.`,
    //     title: 'Brunch this dweekend?',
    //     id: '1321654153465321'
    //   },
    //   {
    //     date: '02.11.20',
    //     email: 'pocht@mail.com',
    //     text: `Повседневная практика показывает, что консультация с широким`,
    //     title: 'Summer BBQd',
    //     id: '87626306523023'
    //   },
    //   {
    //     date: '06.10.20',
    //     email: 'send@mail.ua',
    //     text: 'При создании генератора мы использовали небезизвестный универсальный код речей.',
    //     title: 'Oui ouid',
    //     id: '7964262743256313'
    //   },
    // ],
    messages: []
  }),
  computed: {
    ...mapGetters({
      // messages: 'messages/messages'
    })
  },
  methods: {
    onScroll(e) {
      this.$store.commit('OFFSET_TOP', e.target.scrollTop)
    },
    async fetchMessages() {
      // this.messages = await this.$store.dispatch('messages/FETCH_MESSAGES')
      this.messages = await this.$store.dispatch('messages/FETCH_MESSAGES')
    }
  },
  created() {
    this.$store.commit('OFFSET_TOP', 0)
    this.fetchMessages()
    // this.$store.dispatch('messages/FETCH_MESSAGES')
  }
}
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
