<template>
  <div class="wrapper-main center-flex">
    <transition appear appear-active-class="content-appear">
      <div class="wrapper-text">
        <p>Для того чтобы отправить сообщение вам нужно
          <nuxt-link to="/login"><span>войти</span></nuxt-link>
           или <nuxt-link to="/registration"><span>зарегистрироваться</span></nuxt-link>
        </p>
      </div>
    </transition>
  </div>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  data: () => ({

  }),
  computed: {
    ...mapGetters({
      isAuthenticatedUser: 'auth/isAuthenticatedUser'
    })
  },
  created() {
    this.$store.commit('OFFSET_TOP', 0)
    if (this.isAuthenticatedUser) {
      this.$router.push('/messages')
    }
  },
  beforeMount () {
    // if (this.isAuthenticatedUser) {
    //   this.$router.push('/messages')
    // }
  },
  mounted() {
    const { message } = this.$route.query
    switch (message) {
      case 'logout': {
        const message = {
          text: 'Вы успешно вышли',
          color: '#00E676'
        }
        this.$store.dispatch('SET_MESSAGE', message)
        break
      }
      case 'registration': {
        const message = {
          text: 'Вы успешно зарегистрированы !!!',
          color: '#00E676'
        }
        this.$store.dispatch('SET_MESSAGE', message)
        break
      }
    }
  }
};
</script>

<style scoped lang="sass">
  @import "assets/variables"

  .wrapper-main
    color: $text-color-main
    height: 100vh
    .wrapper-text
      max-width: 440px
      color: $text-color-main
      font-size: 20px
      letter-spacing: 1px
      text-align: center
      span
        color: $accent-color

  @media screen and (max-width: 600px)
    .wrapper-main
      .wrapper-text
        max-width: 330px

  @media screen and (max-width: 450px)
    .wrapper-main
      .wrapper-text
        max-width: 250px

</style>
