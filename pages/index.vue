<template>
  <div class="wrapper-main center-flex">
    <transition appear appear-active-class="content-appear">
      <div class="wrapper-text">
        <p>Для того чтобы отправить сообщение вам нужно <nuxt-link to="/login"><span>войти</span></nuxt-link>
           или <nuxt-link to="/registration"><span>зарегистрироваться</span></nuxt-link>
        </p>
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  methods: {

  },
  created() {
    this.$store.commit('OFFSET_TOP', 0)
  }
};
</script>

<style scoped lang="sass">
  @import "assets/variables"

  .wrapper-main
    color: $text-color-main
    height: 100vh
    .wrapper-text
      max-width: 70%
      color: $text-color-main
      font-size: 20px
      letter-spacing: 1px
      span
        color: $accent-color



  //.content-appear
  //  animation: init-content .5s
  //
  //@keyframes init-content
  //  0%
  //    opacity: 0
  //  100%
  //    opacity: 1

</style>
