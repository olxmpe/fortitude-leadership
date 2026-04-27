import { repositoryName } from "./slicemachine.config.json";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
    public: {
      recaptchaSiteKey: process.env.NUXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "",
    },
  },

  app: {
    head: {
      title: "Fortitude Leadership",
      htmlAttrs: { lang: "fr" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#1e3f61" },
        {
          name: "description",
          content:
            "Fortitude Leadership — accompagnement en leadership, développement personnel et performance collective.",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.png" },
        { rel: "preconnect", href: "https://images.prismic.io" },
        { rel: "preconnect", href: "https://static.cdn.prismic.io" },
        { rel: "dns-prefetch", href: "https://images.prismic.io" },
        { rel: "dns-prefetch", href: "https://www.google.com" },
      ],
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
        { type: "legal", path: "/legal/:uid" },
        { type: "blog_article", path: "/blog/:uid" },
        { type: "evenements", path: "/evenements" },
        { type: "event", path: "/evenements/:uid" },
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
