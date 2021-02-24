<template>
  <div class="login-page wrapper-main">
    <v-container class="center-flex height-wrapper">
      <transition appear appear-active-class="content-appear">
        <v-card
        color="#224955"
        dark
        max-width="400"
        outlined
        class="card-wrapper"
      >
        <div class="wrapper-logo">
          <img src="../static/app_logo_accent.svg" alt="s.tar.mail" height="50">
        </div>
        <form
          class="form"
          @submit.prevent="submit"
        >
          <v-text-field
            v-model.trim="email"
            :error-messages="emailErrors"
            label="E-mail"
            append-icon="mdi-email"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          />
          <v-text-field
            v-model.trim="password"
            class="mb-6"
            :error-messages="passwordErrors"
            label="Пароль"
            type="password"
            append-icon="mdi-lock"
            required
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
          />
          <div class="btn-line">
            <nuxt-link
              class="link"
              to="/registration"
            >
            <span>
              зарегистрироваться
            </span>
            </nuxt-link>
            <v-btn
              tile
              text
              color="#FFFFFF"
              :loading="loading"
              @click="submit"
            >
              Войти
            </v-btn>
          </div>
        </form>
      </v-card>
      </transition>
    </v-container>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
  layout: 'default',
  mixins: [validationMixin],
  data () {
    return {
      email: '',
      password: '',
      loading: false
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: { required }
  },
  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) {
        return errors
      }
      !this.$v.email.email && errors.push('Введите правильный E-mail')
      !this.$v.email.required && errors.push('Поле не может быть пустым')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) {
        return errors
      }
      // !this.$v.password.alphaNum && errors.push('Пароль может состоять из цифр и латиницы')
      !this.$v.password.required && errors.push('Поле не может быть пустым')
      return errors
    }
  },
  mounted () {
    const { message } = this.$route.query
    if (message === 'login') {
      const message = {
        text: 'Для начала войдите или зарегистрируйтесь',
        color: '#F57F17'
      }
      this.$store.dispatch('SET_MESSAGE', message)
    }
  },
  methods: {
    async submit () {
      const { page } = this.$route.query
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.loading = true
        try {
          const formData = {
            email: this.email,
            password: this.password
          }
          await this.$store.dispatch('authUser/LOGIN_USER', formData)
          page === 'super' ? await this.$router.push('/calcs/calc-super') : await this.$router.push('/')
          this.loading = false
        } catch (e) {
          this.loading = false
        }
      }
    }
  },
  created() {
    this.$store.commit('OFFSET_TOP', 0)
  }
}
</script>

<style scoped lang="sass">
  @import "assets/variables"

  .login-page
    .height-wrapper
      height: calc(100vh - 64px)
      .card-wrapper
        max-width: 300px
        .wrapper-logo
          text-align: center
          margin-bottom: 50px
          img
            width: 100%
        .form
          padding: 0 40px
          .btn-line
            display: flex
            justify-content: space-between
            align-items: center
            margin-right: -16px
            .link
              color: rgba(255, 255, 255, 0.75)
              span
                font-size: 13px
                letter-spacing: 1px

  @media screen and (max-width: 500px)
    .login-page
      .height-wrapper
        .card-wrapper
          max-width: 300px
          .wrapper-logo
            margin-bottom: 30px
            img
              width: 60%
          .form
            padding: 0 24px


</style>
