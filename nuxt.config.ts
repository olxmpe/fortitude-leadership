import { repositoryName } from "./slicemachine.config.json";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      title: "Prismic + Nuxt Minimal Starter",
      htmlAttrs: { lang: "fr" },
      meta: [{ charset: "utf-8" }],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  modules: ["@nuxt/eslint", "@nuxtjs/prismic"],

  prismic: {
    endpoint: repositoryName,
    preview: "/api/preview",
    clientConfig: {
      routes: [
        { type: "home", path: "/" },
      ],
    },
  },

  css: ["~/assets/scss/global.scss"],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/variables" as *;',
        },
      },
    },
  },

  compatibilityDate: "2026-01-02",
});
