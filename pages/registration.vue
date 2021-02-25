<template>
  <div class="login-page wrapper-main">
    <v-container fluid class="center-flex height-wrapper">
      <transition appear appear-active-class="content-appear">
        <v-card
        color="#224955"
        dark
        max-width="400"
        outlined
        class="card-wrapper"
        :style="isSmallDeviceLandscape ? 'width: 65%' : ''"
      >
        <div class="wrapper-logo" v-if="!isSmallDeviceLandscape">
          <img src="../static/app_logo_accent.svg" alt="s.tar.mail" height="50">
        </div>
        <form
          class="form"
          :style="isSmallDeviceLandscape ? 'padding-top: 70px; padding-bottom: 13px;' : ''"
          @submit.prevent="submit"
        >
          <v-text-field
            v-model.trim="name"
            :error-messages="nameErrors"
            label="Введите имя"
            append-icon="mdi-account"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          />
          <v-text-field
            v-model.trim="email"
            :error-messages="emailErrors"
            label="Укажите e-mail"
            append-icon="mdi-email"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          />
          <v-text-field
            v-model.trim="password"
            :error-messages="passwordErrors"
            label="Введите пароль"
            type="password"
            append-icon="mdi-lock"
            required
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
          />
          <v-text-field
            v-model.trim="rePassword"
            class="mb-6"
            :error-messages="rePasswordErrors"
            label="Повторите пароль"
            type="password"
            append-icon="mdi-lock"
            required
            @input="$v.rePassword.$touch()"
            @blur="$v.rePassword.$touch()"
          />
          <div class="btn-line">
            <v-btn
              tile
              text
              color="#FFFFFF"
              :loading="loading"
              :disabled="this.$v.$invalid"
              @click="submit"
            >
              Подтвердить
            </v-btn>
          </div>
        </form>
      </v-card>
      </transition>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
import moment from 'moment'

export default {
  layout: 'default',
  mixins: [validationMixin],
  data () {
    return {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      loading: false
    }
  },
  validations: {
    name: { required },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    rePassword: { sameAs: sameAs('password') }
  },
  computed: {
    ...mapGetters({
      isSmallDeviceLandscape: 'isSmallDeviceLandscape'
    }),
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) {
        return errors
      }
      // !this.$v.name.maxLength && errors.push('Имя не может превышать 12 символов')
      !this.$v.name.required && errors.push('Поле не может быть пустым')
      return errors
    },
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
      !this.$v.password.minLength && errors.push('Пароль не может быть короче 6 символов')
      !this.$v.password.required && errors.push('Поле не может быть пустым')
      return errors
    },
    rePasswordErrors () {
      const errors = []
      if (!this.$v.rePassword.$dirty) {
        return errors
      }
      !this.$v.rePassword.sameAs && errors.push('Пароли должны совпадать')
      return errors
    }
  },
  methods: {
    async submit () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.loading = true
        try {
          const formData = {
            date: moment().format('DD.MM.YYYY HH:mm'),
            name: this.name,
            email: this.email,
            password: this.password,
          }
          await this.$store.dispatch('authUser/ADD_USER', formData)
          await this.$store.dispatch('authUser/LOGIN_USER', formData)
          await this.$router.push('/?message=registration')
          await this.$store.dispatch('user/SEND_REGISTR_EMAIL', formData)
          // await this.$router.push('/?message=registration')
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
            justify-content: flex-end
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
