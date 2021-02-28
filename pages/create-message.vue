<template>
  <div class="login-page wrapper-main">
    <v-container
      fluid
      class="center-flex height-wrapper"
    >
      <transition
        appear
        appear-active-class="content-appear"
      >
        <form
          class="form-admins"
          @submit.prevent="submit"
        >
          <h2 class="subtitle-1 mt-4 font-weight-bold">
            Укажите email получателя:
          </h2>
          <v-text-field
            v-model="email"
            dark
            :error-messages="emailErrors"
            label="E-mail"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          />
          <h2 class="subtitle-1 mt-4 font-weight-bold">
            Укажите тему письма:
          </h2>
          <v-text-field
            v-model="subject"
            dark
            :error-messages="subjectErrors"
            label="Тема письма"
            required
            @input="$v.subject.$touch()"
            @blur="$v.subject.$touch()"
          />
          <h2
            class="subtitle-1 mt-4 font-weight-bold"
            :class="textErrorEditor ? 'error-modification-title' : ''"
          >
            Содержание письма:
          </h2>
          <div :class="textErrorEditor ? 'error-emergence-hint-on' : 'error-emergence-hint-off'">
            <p class="error-description-hint">
              {{ textErrorEditor }}
            </p>
          </div>
          <editor
            v-model="textMail"
            :api-key="apiKeyTinyMce"
            :error-messages="textMailErrors"
            :init="{
              statusbar: false,
              placeholder: 'Введите текст сообщения...',
              height: 250,
              menubar: false,
              content_style: '.mce-content-body {color: #fafafa;} ' +
                '.mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before { color: rgb(250,250,250,.6);}',
              plugins: [
                'advlist autolink lists link image charmap print anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar: 'undo redo | formatselect | ' +
                'bold italic | alignleft aligncenter ' +
                'alignright alignjustify',
            }"
            @input="$v.textMail.$touch()"
            @onClick="removeInitialValue"
            @onFocus="removeInitialValue"
          />
          <v-divider class="mb-6" />
          <div style="display: flex; justify-content: flex-end">
            <v-btn
              tile
              text
              color="#ffffff"
              :loading="loading"
              type="submit"
            >
              Отправить
            </v-btn>
          </div>
        </form>
      </transition>
    </v-container>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import { API_KEY_TINYMCE } from '@/server/keys';
import Editor from '@tinymce/tinymce-vue';

export default {
  name: 'AppSubscribe',
  components: {
    editor: Editor,
  },
  mixins: [validationMixin],
  data() {
    return {
      apiKeyTinyMce: API_KEY_TINYMCE,
      email: '',
      subject: '',
      // textMail: '<p style=\'font-style: italic; color: #00000099;\'>Введите какой-то текст...</p>',
      loading: false,
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    subject: { required },
    textMail: { required },
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) {
        return errors;
      }
      !this.$v.email.email && errors.push('Введите правильный E-mail');
      !this.$v.email.required && errors.push('Поле не может быть пустым');
      return errors;
    },
    subjectErrors() {
      const errors = [];
      if (!this.$v.subject.$dirty) {
        return errors;
      }
      !this.$v.subject.required && errors.push('Поле не может быть пустым');
      return errors;
    },
    textMailErrors() {
      const errors = [];
      if (!this.$v.textMail.$dirty) {
        return errors;
      }
      !this.$v.textMail.required && errors.push('Поле не может быть пустым');
      return errors;
    },
    // disabledBtn() {
    //   return this.$v.$invalid;
    // },
    textErrorEditor() {
      return this.textMailErrors[0];
    },
  },
  created() {

  },
  methods: {
    // removeInitialValue() {
    //   this.textMail = '';
    // },
    async submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.loading = true;
        const messageData = {
          date: Date.now(),
          email: this.email,
          subject: this.subject,
          textMail: this.textMail,
        };
        try {
          await this.$store.dispatch('adminMailing/MAILING_START', messageData);
          await this.$router.push('/api/v1/send?message=send-ok');
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

  .form-admins
    width: 500px

    .app-wrap-img
      display: flex
      justify-content: space-between
      align-items: flex-end

    .error-description-hint
      font-size: 12px
      color: #ff5252

    .error-emergence-hint-on
      animation: .2s ease-in-out both fade-in

    @keyframes fade-in
      0%
        opacity: 0
        transform: scaleY(0)
      100%
        opacity: 1
        transform: scaleY(1)

    .error-emergence-hint-off
      animation: .2s ease-in-out both fade-out

    @keyframes fade-out
      0%
        opacity: 1
        transform: scaleY(1)
      100%
        opacity: 0
        transform: scaleY(0)

    .error-modification-title
      color: #ff5252
      animation-name: shake
      animation-duration: 0.2s
      animation-fill-mode: both
      animation-timing-function: ease-out

    @keyframes shake
      0%, 100%
        transform: translateX(0)
      10%, 50%, 90%
        transform: translateX(-2px)
      30%, 70%
        transform: translateX(2px)

    ::v-deep.tox.tox-tinymce
      border: 1px solid rgba(255, 255, 255, 0.7) // внешний border
      .tox-editor-container
        .tox-editor-header
          .tox-toolbar-overlord
            .tox-toolbar__primary
              background-color: #224955
              .tox-toolbar__group
                .tox-tbtn
                  .tox-icon.tox-tbtn__icon-wrap
                    svg
                      fill: #fafafa
                  &:hover
                    .tox-icon.tox-tbtn__icon-wrap
                      svg
                        fill: #224955

                .tox-tbtn.tox-tbtn--disabled
                  .tox-icon.tox-tbtn__icon-wrap
                    svg
                      fill: #4e6e77
                  &:hover, &:focus
                    .tox-icon.tox-tbtn__icon-wrap
                      svg
                        fill: #4e6e77

                .tox-tbtn.tox-tbtn--enabled
                  .tox-icon.tox-tbtn__icon-wrap
                    svg
                      fill: #224955

                .tox-tbtn.tox-tbtn--select.tox-tbtn--bespoke
                  color: #fafafa
                  .tox-tbtn__select-chevron
                    svg
                      fill: #fafafa
                  &:hover
                    color: #224955
                    .tox-tbtn__select-chevron
                      svg
                        fill: #224955

        .tox-sidebar-wrap
          .tox-edit-area
            .tox-edit-area__iframe
              background-color: #224955

</style>
