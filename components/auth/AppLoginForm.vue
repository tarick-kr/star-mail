<template>
  <v-card
    color="#224955"
    dark
    outlined
    class="form-wrapper"
  >
    <div
      class="wrapper-logo"
    >
      <img
        :src="require('@/static/app_logo_accent.svg')"
        alt="s.tar.mail"
      >
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
        height="40"
        color="#ffffff"
        class="text-field-conf"
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      />
      <v-text-field
        v-model.trim="password"
        :error-messages="passwordErrors"
        label="Пароль"
        type="password"
        append-icon="mdi-lock"
        required
        height="40"
        color="#ffffff"
        class="text-field-conf"
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
          class="btn-action"
          tile
          text
          color="#FFFFFF"
          :loading="loading"
          type="submit"
        >
          Войти
        </v-btn>
      </div>
    </form>
  </v-card>
</template>
<script>
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';

export default {
  name: 'AppLoginForm',
  components: {

  },
  mixins: [validationMixin],
  data() {
    return {
      email: '',
      password: '',
      loading: false,
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    password: { required },
  },
  computed: {
    ...mapGetters({
      isSmallDeviceLandscape: 'isSmallDeviceLandscape',
    }),
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) {
        return errors;
      }
      !this.$v.email.email && errors.push('Введите правильный E-mail');
      !this.$v.email.required && errors.push('Поле не может быть пустым');
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) {
        return errors;
      }
      // !this.$v.password.alphaNum && errors.push('Пароль может состоять из цифр и латиницы')
      !this.$v.password.required && errors.push('Поле не может быть пустым');
      return errors;
    },
  },
  methods: {
    async submit() {
      // const { page } = this.$route.query
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.loading = true;
        try {
          const formData = {
            email: this.email,
            password: this.password,
          };
          await this.$store.dispatch('auth/LOGIN_USER', formData);
          await this.$router.push('/messages');
          this.loading = false;
        } catch (e) {
          this.loading = false;
        }
      }
    },
  },
};
</script>

<style scoped lang="sass">
  @import "assets/variables"

  .form-wrapper
    max-width: 360px
    padding: 16px
    .wrapper-logo
      width: 100%
      text-align: center
      margin-bottom: 30px
      img
        width: 75%
    .form
      .btn-line
        display: flex
        justify-content: space-between
        align-items: center
        margin-top: 20px
        .link
          color: rgba(255, 255, 255, 0.75)
          span
            font-size: 13px
            letter-spacing: 1px
        .btn-action
          margin-right: -16px

  .form-wrapper
    ::v-deep.text-field-conf.error--text,
    ::v-deep.text-field-conf .error--text
      color: rgb(232, 108, 105) !important
      caret-color: rgb(232, 108, 105) !important

</style>
