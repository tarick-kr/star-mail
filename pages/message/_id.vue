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

            <v-card-title class="title pb-2">
              Какое-то название
            </v-card-title>
            <div class="d-flex justify-space-between">
              <v-card-subtitle class="subtitle-1 pt-0 pb-2">
                pochta@mail.com
              </v-card-subtitle>
              <v-card-subtitle class="subtitle-1 pt-0 pb-2">
                21.02.21
              </v-card-subtitle>
            </div>
            <v-divider dark />
            <v-card-text class="title">
              Задача организации, в особенности же постоянное информационно-пропагандистское обеспечение нашей. Задача организации, в особенности же
              постоянное информационно-пропагандистское обеспечение нашей. Задача организации, в особенности же постоянное информационно-пропагандистское
              обеспечение нашей. Задача организации, в особенности же постоянное информационно-пропагандистское обеспечение нашей.
            </v-card-text>
          </v-card>
        </div>
      </transition>
    </v-container>
  </div>
</template>

<script>

export default {
  name: 'MessageOne',
  created() {
    // При изменении OFFSET_TOP у AppToolbar появится тень
    this.$store.commit('OFFSET_TOP', 0);
  },
  methods: {
    onScroll(e) {
      this.$store.commit('OFFSET_TOP', e.target.scrollTop);
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
