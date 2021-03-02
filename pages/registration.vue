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
  name: 'RegistrationPage',
  components: {
    AppRegistrForm,
  },
  layout: 'auth',

};
</script>

<style scoped lang="sass">
  //.page-enter-active, .page-leave-active
  //  transition: opacity 0.4s
  //
  //.page-enter, .page-leave-active
  //  opacity: 0
</style>
