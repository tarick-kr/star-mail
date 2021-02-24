<template>
  <div class="messages-page wrapper-main" >
    <v-container id="scrollWrapper" class="overflow-y-auto" fluid>
      <transition appear appear-active-class="content-appear">
          <v-list v-scroll:#scrollWrapper="onScroll" two-line dark color="#224955">
            <v-list-item-group>
              <template v-for="(item, index) in items">
                <v-list-item :key="item.title" :to="`/message/${item.id}`">
                  <template v-slot:default="{ active }">
                    <v-list-item-content>
                      <v-list-item-title v-text="item.title"></v-list-item-title>

                      <v-list-item-subtitle
                        v-text="item.headline"
                      ></v-list-item-subtitle>

                      <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-list-item-action-text v-text="item.action"></v-list-item-action-text>

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
                  v-if="index < items.length - 1"
                  :key="index"
                ></v-divider>
              </template>
            </v-list-item-group>
          </v-list>
      </transition>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "messages",
  data: () => ({
    items: [
      {
        action: '15 min',
        headline: 'pochta@mail.com',
        subtitle: `Задача организации, в особенности же постоянное информационно-пропагандистское обеспечение нашей`,
        title: 'Какое-то название',
        id: '1123451326412'
      },
      {
        action: '2 hr',
        headline: 'test@mail.com',
        subtitle: `Разнообразный и богатый опыт консультация с широким активом в значительной степени обуславливает создание существенных финансовых и административных условий.`,
        title: 'Summer BBQ',
        id: '8974321654132'
      },
      {
        action: '6 hr',
        headline: 'test-test@mail.com',
        subtitle: 'По своей сути рыбатекст является альтернативой традиционному lorem ipsum, который вызывает у некторых людей недоумение при попытках прочитать рыбу текст. ',
        title: 'Oui oui',
        id: '65650324653'
      },
      {
        action: '12 hr',
        headline: 'test@mail.com',
        subtitle: 'В отличии от lorem ipsum, текст рыба на русском языке наполнит любой макет непонятным смыслом и придаст неповторимый колорит советских времен.',
        title: 'Birthday gift',
        id: '6841632146853401'
      },
      {
        action: '18hr',
        headline: 'pochta@mail.com',
        subtitle: 'Сайт рыбатекст поможет дизайнеру, верстальщику,',
        title: 'Recipe to try',
        id: '6554653465321'
      },
      {
        action: '15 min',
        headline: 'pochtamail@mail.com',
        subtitle: `Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце`,
        title: 'Brunch this weekend?',
        id: '+4653161565313'
      },
      {
        action: '2 hr',
        headline: 'user@ukr.net',
        subtitle: `Разнообразный и богатый опыт консультация`,
        title: 'Summer BBQ',
        id: '6742653465301'
      },
      {
        action: '6 hr',
        headline: 'user-test@ukr.net',
        subtitle: 'Товарищи! рамки и место обучения кадров играет важную роль в формировании соответствующий',
        title: 'Oui oui',
        id: '65432465403046'
      },
      {
        action: '15 min',
        headline: 'pochtamail@gmail.com',
        subtitle: `При создании генератора мы использовали небезизвестный универсальный код речей.`,
        title: 'Brunch this weekend?',
        id: '1321654153465321'
      },
      {
        action: '2 hr',
        headline: 'pocht@mail.com',
        subtitle: `Повседневная практика показывает, что консультация с широким`,
        title: 'Summer BBQ',
        id: '87626306523023'
      },
      {
        action: '6 hr',
        headline: 'send@mail.ua',
        subtitle: 'При создании генератора мы использовали небезизвестный универсальный код речей.',
        title: 'Oui oui',
        id: '7964262743256313'
      },
    ],
  }),
  methods: {
    onScroll(e) {
      this.$store.commit('OFFSET_TOP', e.target.scrollTop)
    }
  },
  created() {
    this.$store.commit('OFFSET_TOP', 0)
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
