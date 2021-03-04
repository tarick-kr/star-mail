// import colors from 'vuetify/es5/util/colors';

module.exports = {
  telemetry: false,
  head: {
    titleTemplate: '%s - star-mail',
    title: 'star-mail',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  loading: { color: '#FFEB3B' },

  css: [
    '@/theme/index.sass',
  ],

  plugins: [
    '@/plugins/tinymce',
    // { src: '@/plugins/tinymce', ssr: true },
    '@/plugins/vuelidate',
    '@/plugins/axios',
  ],
  tinymce: {
    apiKey: process.env.API_KEY_TINYMCE,
  },

  components: true,

  buildModules: [
    '@nuxtjs/vuetify',
  ],

  modules: [
    '@nuxtjs/axios',
  ],

  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
  },

  webfontloader: {
    custom: {
      families: [
        'Raleway:400,900',
        'Lato:400,700,900',
      ],
      urls: [
        'https://fonts.googleapis.com/css?family=Raleway:400,900&display=swap',
        'https://fonts.googleapis.com/css?family=Lato:400,700,900&display=swap',
      ],
    },
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: {
      font: {
        family: 'Lato',
      },
      icons: 'mdi',
    },
    treeShake: true,
    options: {
      customProperties: true,
    },
    theme: {
      light: true,
      themes: {
        light: {
          primary: '#224955',
          accent: '#FFAD00',
          // secondary: colors.amber.darken3,
          // info: colors.teal.lighten1,
          // warning: '#E53935',
          error: '#fd7171',
          success: '#00E676',
        },
        dark: {
          primary: '#224955',
          accent: '#FFAD00',
          // secondary: colors.amber.darken3,
          // info: colors.teal.lighten1,
          // warning: '#E53935',
          error: '#fd7171',
          success: '#00E676',
        },
      },
    },
  },

  build: {
    /*
    ** You can extend webpack config here
    */
    // transpile: ['@tinymce/tinymce-vue'],
    // extend(config, ctx) {},
  },
};
