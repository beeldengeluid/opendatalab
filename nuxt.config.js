import theme from './config/theme'
import i18n from './config/i18n'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - Open Data Lab',
    title: 'Beeld en Geluid',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/scss/layout/index.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',

    // Adapted from https://github.com/geeogi/nuxt-responsive-loader
    '~/modules/nuxt-responsive-loader',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://i18n.nuxtjs.org,
    'nuxt-i18n',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {
    nestedProperties: ['datasets.slug'],
  },

  // i18n module configuration (https://i18n.nuxtjs.org/options-reference/)
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US' },
      { code: 'nl', iso: 'nl-NL' },
    ],
    defaultLocale: 'en',
    vueI18n: i18n,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      onlyOnRoot: true, // recommended
    },
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['./assets/scss/vuetify/index.scss'],
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        light: theme,
        dark: theme,
      },
    },
  },

  // Router
  router: {
    base: process.env.BASE_URL || '/',
  },

  // https://nuxtjs.org/docs/2.x/features/loading/
  loading: {
    color: '#008adb',
    height: '5px',
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: true,
    extend(config, { isDev, isClient }) {
      // Default block
      // if (isDev && isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/,
      //   })
      // }
      // Default block end

      // here I tell webpack not to include jpgs and pngs
      // as base64 as an inline image
      // config.module.rules.find(
      //   rule => rule.loader === "url-loader"
      // ).exclude = /\.(jpe?g|png)$/;

      // Configure the responsive-loader
      config.module.rules.push({
        test: /\.(jpe?g|png)$/i,
        loader: 'responsive-loader',
        options: {
          min: 575,
          max: 1140,
          steps: 7,
          placeholder: false,
          quality: 60,
          adapter: require('responsive-loader/sharp'),
        },
      })
    },
  },
}
