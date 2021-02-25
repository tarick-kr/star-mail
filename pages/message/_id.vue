<template>
  <div class="message-page wrapper-main">
    <v-container id="scrollWrapper" class="overflow-y-auto" fluid>
      <transition appear appear-active-class="content-appear">
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
              class="hidden-sm-and-up"
              to="/messages"
            >
              <v-icon>
                mdi-keyboard-backspace
              </v-icon>
            </v-btn>
          </v-card-actions>
          <v-divider dark class="hidden-sm-and-up" />

          <v-card-title class="title pb-2">Какое-то название</v-card-title>
          <div class="d-flex justify-space-between">
            <v-card-subtitle class="subtitle-1 pt-0 pb-2">pochta@mail.com</v-card-subtitle>
            <v-card-subtitle class="subtitle-1 pt-0 pb-2">21.02.21</v-card-subtitle>
          </div>
          <v-divider dark />
          <v-card-text class="title">Задача организации, в особенности же постоянное информационно-пропагандистское обеспечение нашей. Задача организации, в особенности же постоянное информационно-пропагандистское обеспечение нашей. Задача организации, в особенности же постоянное информационно-пропагандистское обеспечение нашей. Задача организации, в особенности же постоянное информационно-пропагандистское обеспечение нашей.</v-card-text>

        </v-card>
      </transition>
    </v-container>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="sass">
  .wrapper-main
    #scrollWrapper
      .card-message
        max-width: 70%
        margin-left: 48px

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
