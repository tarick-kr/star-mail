<template>
  <div id="app">
    <template>
      <v-app>
        <v-main>
          <v-fade-transition mode="out-in">
            <nuxt />
          </v-fade-transition>
        </v-main>
      </v-app>
    </template>
    <template v-if="message">
      <v-snackbar
        :timeout="3000"
        :color="message.color"
        value="true"
        @input="closeMessage"
      >
        {{ message.text }}
        <v-btn
          tile
          text
          @click.native="closeMessage"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </v-snackbar>
    </template>
  </div>
</template>

<script>

export default {
  name: 'Default',
  components: {
  },
  data () {
    return {}
  },
  computed: {
    message () {
      return this.$store.getters.getMessage
    }
  },
  methods: {
    closeMessage () {
      this.$store.dispatch('CLEAR_MESSAGE')
    }
  }
}
</script>

<style scoped lang="sass">
  .page-enter-active, .page-leave-active
    transition: opacity 0.4s

  .page-enter, .page-leave-active
    opacity: 0
</style>
