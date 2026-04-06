import { repositoryName } from "./slicemachine.config.json";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      title: "Prismic + Nuxt Minimal Starter",
      htmlAttrs: { lang: "fr" },
      meta: [{ charset: "utf-8" }],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
    },
  },

  modules: ["@nuxt/eslint", "@nuxtjs/prismic"],

  imports: {
    presets: [
      {
        from: "@prismicio/vue",
        imports: ["getSliceComponentProps"],
      },
    ],
  },

  prismic: {
    endpoint: repositoryName,
    preview: "/api/preview",
    clientConfig: {
      routes: [
        { type: "home", path: "/" },
        { type: "about", path: "/about" },
        { type: "services", path: "/services" },
        { type: "blog_articles", path: "/blog" },
        { type: "contact", path: "/contact" },
        { type: "blog_article", path: "/blog/:uid" },
        { type: "event", path: "/event/:uid" },
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
