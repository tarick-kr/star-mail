<template>
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
      class="addressees"
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
</template>

<script>
import moment from 'moment';

export default {
  name: 'AppMessage',
  props: {
    message: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    getDate(date) {
      return moment(date).format('DD.MM.YY');
    },
  },
};
</script>

<style scoped lang="sass">
  @import "assets/variables"

  .card-message
    max-width: 70%
    margin-left: 48px
    .addressees
      z-index: 0
    .message-subject
      font-size: 18px
      word-break: break-word
      line-height: 24px
    .message-date
      font-size: 14px
      white-space: nowrap
      align-self: flex-start
    .message-text
      padding: 20px 8px 8px
      font-size: 18px
      color: $text-color-main

  @media screen and (max-width: 1264px)
    .card-message
      max-width: 80%
      margin-left: 36px

  @media screen and (max-width: 960px)
    .card-message
      max-width: 90%
      margin-left: 28px

  @media screen and (max-width: 600px)
    .card-message
      max-width: 100%
      margin: 0 auto

</style>
