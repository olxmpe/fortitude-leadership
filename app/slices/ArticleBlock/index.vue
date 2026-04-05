<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { asText } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/vue";

defineProps<{
  slice: Content.TalentDevelopmentSlice;
}>();
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="article"
  >
    <div class="article__heading">
      <h2 class="article__title">{{ asText(slice.primary.title) }}</h2>
    </div>
    <div class="article__content">
      <h3 v-if="asText(slice.primary.subtitle)" class="article__subtitle">
        {{ asText(slice.primary.subtitle) }}
      </h3>
      <PrismicRichText :field="slice.primary.body" class="article__body" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.article {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  padding: $spacing-lg $boxed;
  gap: $spacing-lg;

  @media (max-width: $bp-mobile) {
    grid-template-columns: 1fr;
    padding: $spacing-lg $boxed;
    gap: $spacing-sm;
  }

  &__heading {
    display: flex;
    align-items: flex-start;
  }

  &__title {
    font-size: clamp(1.75rem, 4vw, 3.2rem);
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;
  }

  &__body {
    :deep(p) {
      margin-bottom: $spacing-xs;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
