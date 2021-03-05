<template>
  <v-app>
    <v-container
      fluid
      class="wrapper"
    >
      <v-row class="hv-100 center-flex">
        <div class="text-center">
          <div class="span404">
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </div>
          <hr class="mx-3 my-5">
          <h2>
            К сожалению, {{ userName }}, такая страница не найдена
          </h2>
          <NuxtLink
            to="/messages"
          >
            вернуться на главную
          </NuxtLink>
        </div>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import jwtDecode from 'jwt-decode';

export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    userName: '',
  }),
  head: () => ({
    title: '404 Страница не найдена',
  }),
  computed: {
    ...mapGetters({
      token: 'auth/tokenUser',
    }),
  },
  created() {
    const jwtData = jwtDecode(this.token) || {};
    this.userName = jwtData.userName;
  },
};
</script>

<style scoped lang="sass">
  @import "assets/variables"
  .wrapper
    background-color: $background-color-main
    .span404
      display: flex
      justify-content: center
      transition-delay: .6s
      span
        color: $accent-color
        font-size: 250px
        font-weight: bold
        line-height: 215px
    h2
      margin-bottom: 16px
      font-weight: 500
      letter-spacing: 1px
    a
      color: $accent-color

  @media screen and (max-width: 780px)
    .wrapper
      .span404
        span
          font-size: 212px
          line-height: 186px
      h2
        font-size: 21px

  @media screen and (max-width: 450px)
    .wrapper
      .span404
        span
          font-size: 155px
          line-height: 135px

</style>
