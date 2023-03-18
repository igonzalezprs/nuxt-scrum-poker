// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '~/modules/sockets'
  ],
  env: {
    WS_URL: process.env.WS_URL || 'http://localhost:3000'
  },
})
