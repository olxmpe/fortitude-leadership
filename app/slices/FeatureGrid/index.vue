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
        <span class="feature-grid__number">{{ String(index + 1).padStart(2, "0") }}</span>
        <p class="feature-grid__card-title">{{ item.title }}</p>
        <div class="feature-grid__card-description">
          <PrismicRichText :field="item.description" />
        </div>
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
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: $spacing-xs;
    max-width: 1400px;
    margin: 0 auto;

    @media (max-width: $bp-mobile) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__card {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: $spacing-xs;
    border: 1px solid $color-navy-light;
  }

  &__number {
    font-family: $font-serif-garamond;
    font-size: $font-size-sm;
    font-style: italic;
    color: $color-navy-light;
    line-height: 1;
  }

  &__card-title {
    font-family: $font-sans;
    font-size: $font-size-sm;
    font-weight: 700;
    color: $color-navy;
    margin: 0;
    line-height: 1.3;
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
