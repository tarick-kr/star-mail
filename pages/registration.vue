<template>
  <div class="registration-page">
    <v-container class="center-flex hv-100">
      <AppRegistrForm />
    </v-container>
  </div>
</template>

<script>
import AppRegistrForm from '@/components/auth/AppRegistrForm';
import { mapGetters } from 'vuex';

export default {
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
