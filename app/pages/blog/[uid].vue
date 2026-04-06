<script setup lang="ts">
import { isFilled } from "@prismicio/client";
import { PrismicImage } from "@prismicio/vue";
import { components } from "~/slices";

const { client } = usePrismic();
const route = useRoute();
const uid = route.params.uid as string;

const { data: page, error } = await useAsyncData(uid, () =>
  client.getByUID("blog_article", uid),
);

const siteUrl = "https://www.fortitude-leadership.com";

useSeo({
  title: page.value?.data.title,
  image: page.value?.data.image,
  type: "article",
  fallbackTitle: "Article — Fortitude Leadership",
});

useHead({
  script: page.value
    ? [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: page.value.data.title,
            image: page.value.data.image?.url ?? undefined,
            url: `${siteUrl}/blog/${page.value.uid}`,
            datePublished: page.value.first_publication_date,
            dateModified: page.value.last_publication_date,
            author: {
              "@type": "Organization",
              name: "Fortitude Leadership",
              url: siteUrl,
            },
            publisher: {
              "@type": "Organization",
              name: "Fortitude Leadership",
              url: siteUrl,
            },
          }),
        },
      ]
    : [],
});
</script>

<template>
  <main>
    <pre v-if="error" style="color: red; padding: 2rem">{{ error }}</pre>

    <article v-else-if="page">
      <header class="article-header">
        <div
          v-if="isFilled.image(page.data.image)"
          class="article-header__media"
        >
          <PrismicImage
            :field="page.data.image"
            class="article-header__image"
          />
          <div class="article-header__overlay" />
        </div>
        <div class="article-header__content">
          <h1>{{ page.data.title }}</h1>
        </div>
      </header>

      <SliceZone
        :slices="page.data.slices ?? []"
        :components="components"
      />
    </article>
  </main>
</template>

<style scoped lang="scss">
.article-header {
  position: relative;
  height: 45vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &__media {
    position: absolute;
    inset: 0;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
  }

  &__content {
    position: relative;
    z-index: 1;
    padding: 0 $boxed;
    text-align: center;

    h1 {
      color: $color-white;
    }
  }
}
</style>
