<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/vue";

defineProps(getSliceComponentProps<Content.FeatureGridSlice>());
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="feature-grid"
  >
    <h2 v-if="slice.primary.title" class="feature-grid__title">
      {{ slice.primary.title }}
    </h2>
    <div class="feature-grid__grid">
      <div
        v-for="(item, index) in slice.primary.items"
        :key="index"
        class="feature-grid__card"
      >
        <h3 class="feature-grid__card-title">{{ item.title }}</h3>
        <PrismicRichText :field="item.description" class="feature-grid__card-description" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.feature-grid {
  padding: $spacing-lg $boxed;

  &__title {
    text-align: center;
    margin-bottom: $spacing-md;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-xs;
    max-width: 1400px;
    margin: 0 auto;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: $bp-mobile) {
      grid-template-columns: 1fr;
    }
  }

  &__card {
    padding: $spacing-xs;
    background-color: $color-navy-lighter;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__card-title {
    font-family: $font-sans;
    font-size: $font-size-sm;
    font-weight: 600;
    color: $color-navy;
  }

  &__card-description {
    font-size: $font-size-xs;
    color: $color-gray;
    line-height: 1.6;

    :deep(p) {
      margin: 0;
    }
  }
}
</style>
