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
        <span class="programme__number">{{ String(index + 1).padStart(2, "0") }}</span>
        <p class="programme__item-title">{{ step.title }}</p>
        <p class="programme__item-description">{{ step.description }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.programme {
  background-color: $color-gray-light;
  padding: $spacing-lg $boxed;

  &__title {
    text-align: center;
    margin-bottom: $spacing-md;
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
  }

  &__list {
    display: flex;
    flex-direction: column;
    max-width: 900px;
    margin: 0 auto;
  }

  &__item {
    display: grid;
    grid-template-columns: 5rem 3fr 2fr;
    column-gap: $spacing-sm;
    padding: $spacing-xs 0;
    border-top: 1px solid $color-navy-light;
    align-items: baseline;

    &:first-child {
      border-top: none;
    }

    @media (max-width: $bp-mobile) {
      grid-template-columns: 3rem 1fr;
      column-gap: 1rem;
      row-gap: 0.75rem;
    }
  }

  &__number {
    font-family: $font-serif-garamond;
    font-size: $font-size-lg;
    font-style: italic;
    color: $color-navy-light;
    line-height: 1;
  }

  &__item-title {
    font-family: $font-sans;
    font-size: $font-size-sm;
    font-weight: 400;
    color: $color-navy;
    line-height: 1.5;
    margin: 0;
  }

  &__item-description {
    font-family: $font-serif-garamond;
    font-style: italic;
    font-size: $font-size-sm;
    color: $color-gray;
    line-height: 1.5;
    margin: 0;

    @media (max-width: $bp-mobile) {
      grid-column: 2;
    }
  }
}
</style>
