<template>
  <div class="registration-page">
    <v-container class="center-flex hv-100">
      <transition
        appear
        appear-active-class="content-appear"
      >
        <AppRegistrForm />
      </transition>
    </v-container>
  </div>
</template>

<script>
import AppRegistrForm from '@/components/auth/AppRegistrForm';

export default {
  components: {
    AppRegistrForm,
  },
  layout: 'auth',
};
</script>

<style scoped lang="sass">

</style>
