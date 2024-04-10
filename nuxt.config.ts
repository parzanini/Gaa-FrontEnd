// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path';
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['nuxt-swiper', '@pinia/nuxt'],
  alias: {
    '@': resolve(__dirname, '/'),
  },
  css: ["~/assets/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
