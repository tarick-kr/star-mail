<template>
  <div class="logout-page wrapper-main">
    <v-container class="center-flex height-wrapper">
      <transition appear appear-active-class="content-appear">
      <!--  Нужно будет вставить какой-то лодер  -->
      </transition>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: 'default',
  created() {
    this.$store.commit('OFFSET_TOP', 0)
  }
}
</script>

<style scoped lang="sass">
  @import "assets/variables"

  .height-wrapper
    height: calc(100vh - 64px)


</style>
