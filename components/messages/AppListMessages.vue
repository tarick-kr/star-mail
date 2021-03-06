<template>
  <v-list
    two-line
    dark
    color="#224955"
  >
    <v-list-item-group>
      <template v-for="(item, index) in messages">
        <v-list-item
          :key="item._id"
        >
          <template #default="{ active }">
            <v-list-item-content @click="openMessage(item._id)">
              <v-list-item-title v-text="item.subject" />

              <v-list-item-subtitle
                class="mb-4"
                v-text="item.emailsString"
              />

              <v-list-item-subtitle v-html="item.textWithoutHtml" />
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text>{{ getDate(item.date) }}</v-list-item-action-text>

              <v-btn
                fab
                small
                text
                @click.stop="deleteMessage(item._id)"
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

<script>
import moment from 'moment';

export default {
  name: 'AppListMessages',
  props: {
    messages: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    getDate(date) {
      return moment(date).format('DD.MM.YY');
    },
    deleteMessage(id) {
      this.$emit('remove', id);
    },
    openMessage(id) {
      this.$router.push(`/message/${id}`);
    },
  },
};
</script>

<style scoped>

</style>
