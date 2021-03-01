<template>
  <transition
    appear
    appear-active-class="content-appear"
  >
    <v-card
      color="#224955"
      dark
      outlined
      class="form-wrapper"
      :class="isSmallDeviceLandscape ? 'padding' : ''"
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
          <v-spacer />
          <v-btn
            class="btn-action"
            tile
            text
            color="#FFFFFF"
            :loading="loading"
            :disabled="this.$v.$invalid"
            type="submit"
          >
            Подтвердить
          </v-btn>
        </div>
      </form>
    </v-card>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate';
import {
  required, email, sameAs, minLength,
} from 'vuelidate/lib/validators';
// import moment from 'moment';

export default {
  mixins: [validationMixin],
  layout: 'auth',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      loading: false,
    };
  },
  validations: {
    name: { required },
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    },
    rePassword: { sameAs: sameAs('password') },
  },
  computed: {
    ...mapGetters({
      isSmallDeviceLandscape: 'isSmallDeviceLandscape',
    }),
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) {
        return errors;
      }
      // !this.$v.name.maxLength && errors.push('Имя не может превышать 12 символов')
      !this.$v.name.required && errors.push('Поле не может быть пустым');
      return errors;
    },
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
      !this.$v.password.minLength && errors.push('Пароль не может быть короче 6 символов');
      !this.$v.password.required && errors.push('Поле не может быть пустым');
      return errors;
    },
    rePasswordErrors() {
      const errors = [];
      if (!this.$v.rePassword.$dirty) {
        return errors;
      }
      !this.$v.rePassword.sameAs && errors.push('Пароли должны совпадать');
      return errors;
    },
  },
  methods: {
    async submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.loading = true;
        try {
          const formData = {
            // date: moment().format('DD.MM.YYYY HH:mm'),
            name: this.name,
            email: this.email,
            password: this.password,
          };
          await this.$store.dispatch('auth/ADD_USER', formData);
          await this.$store.dispatch('auth/LOGIN_USER', formData);
          await this.$router.push('/messages');
          // await this.$store.dispatch('user/SEND_REGISTR_EMAIL', formData)
          // await this.$router.push('/?message=registration')
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
      margin-bottom: 40px
      img
        width: 75%
    .form
      .btn-line
        display: flex
        justify-content: space-between
        align-items: center
        .link
          color: rgba(255, 255, 255, 0.75)
          span
            font-size: 13px
            letter-spacing: 1px
        .btn-action
          margin-right: -16px

  .form-wrapper.padding
    padding-top: 116px

</style>
