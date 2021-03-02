<template>
  <div class="create-message-page wrapper-main">
    <v-container
      id="scrollWrapper"
      v-resize.quiet="onResize"
      class="overflow-y-auto"
      fluid
    >
      <transition
        appear
        appear-active-class="content-appear"
      >
        <div
          v-scroll:#scrollWrapper="onScroll"
        >
          <div class="pt-3 pb-3 title-page">
            <h2>Создание сообщения</h2>
          </div>
          <v-divider
            dark
            class="title-page"
          />
          <form
            class="form-admins"
            @submit.prevent="submit"
          >
            <h2 class="subtitle-1 font-weight-bold">
              Укажите адрес получателя:
            </h2>

            <v-text-field
              v-model="email"
              dark
              :error-messages="emailErrors"
              label="Email"
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
              label="Тема"
              required
              @input="$v.subject.$touch()"
              @blur="$v.subject.$touch()"
            />
            <div class="wrapper-error-editor">
              <h2
                class="subtitle-1 mt-4 font-weight-bold pb-6"
                :class="textErrorEditor ? 'error-modification-title' : ''"
              >
                Содержание письма:
              </h2>
              <div :class="textErrorEditor ? 'error-emergence-hint-on' : 'error-emergence-hint-off'">
                <p class="error-description-hint">
                  {{ textErrorEditor }}
                </p>
              </div>
            </div>
            <div>
              <editor
                v-model="textMail"
                api-key="uhxykia7elg30g9994dpwrw183c8xlvbzh8a23ta3igo19ng"
                :error-messages="textMailErrors"
                :init="{
                  statusbar: false,
                  placeholder: 'Введите текст сообщения...',
                  height: 250,
                  menubar: false,
                  content_style: '.mce-content-body {color: #fafafa;}' +
                    '.mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before { color: rgb(250,250,250,.6);}',
                  plugins: [
                    'autolink lists link'
                  ],
                  toolbar: 'undo redo | formatselect | ' +
                    'bold italic | alignleft aligncenter ' +
                    'alignright alignjustify',
                }"
                @input="$v.textMail.$touch()"
                @blur="$v.textMail.$touch()"
              />
            </div>
            <div class="btn-line">
              <v-spacer />
              <v-btn
                class="btn-action"
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
        </div>
      </transition>
    </v-container>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import Editor from '@tinymce/tinymce-vue';

export default {
  name: 'CreateMessagePage',
  components: {
    editor: Editor,
  },
  mixins: [validationMixin],
  middleware: ['auth'],
  data() {
    return {
      email: '',
      subject: '',
      textMail: '',
      loading: false,
      windowWidth: 0,
    };
  },
  validations: {
    email: { required, email },
    subject: { required },
    textMail: { required },
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) {
        return errors;
      }
      !this.$v.email.email && errors.push('Введите корректный email');
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
    // При изменении OFFSET_TOP у AppToolbar появится тень
    this.$store.commit('OFFSET_TOP', 0);
  },
  mounted() {
    this.windowWidth = window.innerWidth;
  },
  methods: {
    onScroll(e) {
      this.$store.commit('OFFSET_TOP', e.target.scrollTop);
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    },

    // checkEmails() {
    //   const arrayEmails = this.emails.split(',');
    //   const valid = arrayEmails.every((email) => this.validateEmail(email));
    //   this.emailsValid = valid;
    //   valid ? this.usersEmails = arrayEmails : this.usersEmails = [];
    // },
    // validateEmail(email) {
    //   const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    //   return reg.test(String(email).toLowerCase());
    // },

    // createArrayEmails() {
    //   this.emails = this.emails.split(',');
    // },

    async submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        // this.loading = true;
        const messageData = {
          date: Date.now(),
          email: this.email,
          subject: this.subject,
          textMail: this.textMail,
        };
        console.log(messageData);
        try {
          // await this.$store.dispatch('adminMailing/MAILING_START', messageData);
          // this.loading = false;
          // await this.$router.push('/messages');
        } catch (e) {
          // this.loading = false;
        }
      }
    },

  },
};
</script>

<style scoped lang="sass">

  .wrapper-main
    #scrollWrapper
      max-height: calc(100vh - 64px)
      .title-page
        margin-bottom: 16px
        margin-left: 25px
        max-width: 800px
      .form-admins
        width: fit-content
        min-width: 800px
        margin-left: 25px
        .btn-line
          display: flex
          justify-content: space-between
          align-items: center
          margin-top: 24px
          .btn-action
            margin-right: -16px

  // Скрытие скролла
  .wrapper-main
    #scrollWrapper::-webkit-scrollbar
      width: 0

  .wrapper-main
    #scrollWrapper
      .form-admins
        .wrapper-error-editor
          position: relative
          .error-description-hint
            font-size: 12px
            color: #ff5252
            position: absolute
            bottom: 6px
            left: 0
            margin: 0

  // Появление и исчезновение ошибки у Editor`a
  .wrapper-main
    #scrollWrapper
      .form-admins
        .wrapper-error-editor
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
            animation: .2s ease-in-out both fade-in reverse
          //@keyframes fade-out
          //  0%
          //    opacity: 1
          //    transform: scaleY(1)
          //  100%
          //    opacity: 0
          //    transform: scaleY(0)

  // ==================================================

  .wrapper-main
    #scrollWrapper
      .form-admins
        // Стили для редактора tinymce
        // desktop
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

        // mobile version tinymce
        ::v-deep.tox.tox-tinymce.tox-platform-touch
          width: 100%
          max-width: 500px
          z-index: 0
          .tox-editor-container
            .tox-editor-header
              .tox-toolbar.tox-toolbar--scrolling
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

  @media screen and (max-width: 960px)
    .wrapper-main
      #scrollWrapper
        .title-page
          max-width: 600px
        .form-admins
          min-width: 600px

  @media screen and (max-width: 760px)
    .wrapper-main
      #scrollWrapper
        .title-page
          margin-right: 25px
        .form-admins
          min-width: unset

  @media screen and (max-width: 600px)
    .wrapper-main
      #scrollWrapper
        max-height: calc(100vh - 64px)
        .title-page
          margin-right: 20px
          margin-left: 20px
        .form-admins
          margin-left: 20px

  @media screen and (max-width: 500px)
    .wrapper-main
      #scrollWrapper
        .title-page
          margin: 0 auto

  @media screen and (max-width: 480px)
    .wrapper-main
      #scrollWrapper
        .form-admins
          margin: 0 auto
          ::v-deep.tox.tox-tinymce.tox-platform-touch
            max-width: 406px

  @media screen and (max-width: 460px)
    .wrapper-main
      #scrollWrapper
        .form-admins
          margin: 0 auto
          ::v-deep.tox.tox-tinymce.tox-platform-touch
            max-width: 370px

  @media screen and (max-width: 400px)
    .wrapper-main
      #scrollWrapper
        .form-admins
          margin: 0 auto
          ::v-deep.tox.tox-tinymce.tox-platform-touch
            max-width: 336px

  @media screen and (max-width: 380px)
    .wrapper-main
      #scrollWrapper
        .form-admins
          margin: 0 auto
          ::v-deep.tox.tox-tinymce.tox-platform-touch
            max-width: 300px

</style>
