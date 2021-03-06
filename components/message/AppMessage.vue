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

<style scoped>

</style>
