<template>
  <div />
</template>

<script>

export default {
  layout: 'auth',

  beforeCreate() {
    this.$router.push('/login');
  },
};
</script>

<style scoped lang="sass">

</style>
