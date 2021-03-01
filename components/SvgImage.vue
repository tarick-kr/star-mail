<template>
  <div :style="`height: ${height}px; width: ${width}px`">
    <img
      :src="imageSrc"
      :alt="imageAlt"
    >
  </div>
</template>

<script>
export default {
  name: 'SvgImage',
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      default: 100,
    },
    width: {
      type: Number,
      default: 100,
    },
    imageAlt: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped lang="sass">
  img
    height: 100%
    width: 100%
</style>
