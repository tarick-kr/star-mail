module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:vue/essential',
    'plugin:vue/vue3-recommended',
    'plugin:nuxt/base',
    'plugin:nuxt/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    'max-len': ['error', { code: 160 }],
    'vue/max-len': ['error', {
      code: 160,
      template: 160,
    }],
    'no-shadow': 'off',
    'no-console': 'off',
    'no-unused-expressions': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    'global-require': 'off',
    'no-cjs-in-config': 0,
  },
  settings: {
    'import/resolver': {
      nuxt: {
        extensions: ['.js', '.vue'],
      },
    },
    'import/core-modules': ['vue', 'vuex'], // these modules are included in nuxt.js
  },
};
