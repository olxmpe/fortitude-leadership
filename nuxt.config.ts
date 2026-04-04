import { repositoryName, apiEndpoint } from "./slicemachine.config.json";

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
    endpoint: apiEndpoint || repositoryName,
    preview: "/api/preview",
    clientConfig: {
      routes: [
        { type: "page", uid: "home", path: "/" },
        { type: "page", path: "/:uid" },
      ],
    },
  },

  compatibilityDate: "2026-01-02",
});
