<script setup lang="ts">
import type { BlogArticleDocument, TalentDevelopmentSlice } from "~~/prismicio-types";
import { asText, isFilled } from "@prismicio/client";
import { PrismicImage } from "@prismicio/vue";

const props = defineProps<{ article: BlogArticleDocument }>();

const excerpt = computed(() => {
  const slice = props.article.data.slices.find(
    s => s.slice_type === "talent_development",
  ) as TalentDevelopmentSlice | undefined;
  if (!slice) return "";
  return asText(slice.primary.subtitle) || asText(slice.primary.body);
});
</script>

<template>
  <NuxtLink :to="`/blog/${article.uid}`" class="article-card">
    <div class="article-card__media">
      <PrismicImage
        v-if="isFilled.image(article.data.image)"
        :field="article.data.image"
        class="article-card__image"
      />
      <div v-else class="article-card__placeholder" />
    </div>
    <div class="article-card__body">
      <p class="article-card__title">{{ article.data.title }}</p>
      <p v-if="excerpt" class="article-card__excerpt">{{ excerpt }}</p>
      <span class="article-card__link">Lire la suite</span>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
.article-card {
  flex: 0 1 360px;
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;
  text-decoration: none;
  color: inherit;

  &:hover .article-card__image {
    transform: scale(1.03);
  }

  &__media {
    overflow: hidden;
    aspect-ratio: 4 / 3;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }

  &__placeholder {
    width: 100%;
    height: 100%;
    background: $color-navy-lighter;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;
    flex: 1;
  }

  &__title {
    font-weight: 700;
    color: $color-black;
  }

  &__excerpt {
    color: $color-gray;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__link {
    font-size: $font-size-xs;
    color: $color-navy;
    text-decoration: underline;
    text-underline-offset: 3px;
    margin-top: auto;
  }
}
</style>
