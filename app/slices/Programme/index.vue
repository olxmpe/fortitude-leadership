<script setup lang="ts">
import type { Content } from "@prismicio/client";

defineProps(getSliceComponentProps<Content.NumberedListWithNotesSlice>());
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="programme"
  >
    <h2 v-if="slice.primary.title" class="programme__title">
      {{ slice.primary.title }}
    </h2>
    <div class="programme__list">
      <div
        v-for="(step, index) in slice.primary.steps"
        :key="index"
        class="programme__item"
      >
        <div class="programme__item-left">
          <span class="programme__item-number">{{ String(index + 1).padStart(2, "0") }}</span>
          <span class="programme__item-title">{{ step.title }}</span>
        </div>
        <p class="programme__item-description">{{ step.description }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.programme {
  padding: $spacing-lg $boxed;

  &__title {
    margin-bottom: $spacing-md;
  }

  &__list {
    display: flex;
    flex-direction: column;
  }

  &__item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $spacing-md;
    padding: $spacing-xs 0;
    border-top: 1px solid $color-navy-light;

    &:last-child {
      border-bottom: 1px solid $color-navy-light;
    }

    @media (max-width: $bp-mobile) {
      grid-template-columns: 1fr;
      gap: $spacing-xs;
    }
  }

  &__item-left {
    display: flex;
    align-items: flex-start;
    gap: $spacing-xs;
  }

  &__item-number {
    font-family: $font-serif-garamond;
    font-size: $font-size-lg;
    font-weight: 300;
    color: $color-navy-light;
    line-height: 1;
    flex-shrink: 0;
  }

  &__item-title {
    font-family: $font-sans;
    font-size: $font-size-sm;
    font-weight: 600;
    color: $color-navy;
    padding-top: 0.25rem;
    line-height: 1.4;
  }

  &__item-description {
    font-size: $font-size-xs;
    color: $color-gray;
    line-height: 1.6;
    margin: 0;
    padding-top: 0.4rem;
  }
}
</style>
