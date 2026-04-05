<script setup lang="ts">
import type { Content } from "@prismicio/client";

const { slice } = defineProps(
  getSliceComponentProps<Content.BlogPageDescriptionSlice>(),
);
</script>

<template>
  <section class="blog-description">
    <p v-if="slice.primary.description" class="blog-description__text">
      {{ slice.primary.description }}
    </p>
  </section>
</template>

<style scoped lang="scss">
.blog-description {
  padding: $spacing-md $boxed $spacing-sm;
  text-align: center;
  max-width: 1000px;
  margin: 0 auto;

  &__text {
    color: $color-gray;
  }
}
</style>
