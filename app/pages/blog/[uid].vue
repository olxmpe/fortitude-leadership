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

useHead({
  title: page.value?.data.title ?? "Article — Fortitude Leadership",
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
