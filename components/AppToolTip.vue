<template>
  <v-tooltip
    :right="windowWidth >= 760"
    :top="windowWidth < 760"
    attach="#scrollWrapper"
    content-class="tooltip-style"
  >
    <template #activator="{ on, attrs }">
      <v-icon
        class="tooltip-icon"
        medium
        dark
        right
        v-bind="attrs"
        v-on="on"
      >
        mdi-information-outline
      </v-icon>
    </template>
    <span>Email адреса следует вводить через запятую</span>
  </v-tooltip>
</template>
<script>
export default {
  name: 'AppToolTip',
};
</script>

<style scoped lang="sass">
// Стили для всплывающей подсказки
.wrapper-main
  #scrollWrapper
    .tooltip-style
      color: #FFAD00
      border: 1px solid #FFAD00
      background: rgba(34, 73, 85, .95)
      opacity: 0.95!important
    .form-admins
      .tooltip-icon
        &:hover
          color: #FFAD00
</style>
