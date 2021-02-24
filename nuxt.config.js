// import colors from 'vuetify/es5/util/colors';

module.exports = {
  ssr: false,
  head: {
    titleTemplate: '%s - star-mail',
    title: 'star-mail',
    htmlAttrs: {
      lang: 'ru-RU',
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
    '@/plugins/vuelidate',
  ],

  components: true,

  buildModules: [
    '@nuxtjs/vuetify',
  ],

  modules: [
    '@nuxtjs/axios',
  ],

  axios: {},

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
  },

  build: {

  },
};
