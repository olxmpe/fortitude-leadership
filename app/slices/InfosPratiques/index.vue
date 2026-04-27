<script setup lang="ts">
import type { Content } from "@prismicio/client";

defineProps(getSliceComponentProps<Content.InfoGridSlice>());
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="infos-pratiques"
  >
    <div class="infos-pratiques__left">
      <h2 v-if="slice.primary.title" class="infos-pratiques__title">
        {{ slice.primary.title }}
      </h2>
      <p v-if="slice.primary.description" class="infos-pratiques__description">
        {{ slice.primary.description }}
      </p>
    </div>
    <div class="infos-pratiques__grid">
      <div
        v-for="(item, index) in slice.primary.info_items"
        :key="index"
        class="infos-pratiques__item"
      >
        <span class="infos-pratiques__label">{{ item.label }}</span>
        <span class="infos-pratiques__value">{{ item.main_value }}</span>
        <span v-if="item.subtext" class="infos-pratiques__subtext">{{ item.subtext }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.infos-pratiques {
  background-color: $color-navy;
  color: $color-white;
  padding: $spacing-lg $boxed;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: $spacing-lg;
  align-items: flex-start;

  @media (max-width: $bp-mobile) {
    grid-template-columns: 1fr;
    gap: $spacing-sm;
  }

  &__title {
    color: $color-white;
  }

  &__description {
    color: rgba(255, 255, 255, 0.7);
    margin-top: $spacing-xs;
    font-size: $font-size-sm;
    line-height: 1.75;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-sm $spacing-md;

    @media (max-width: $bp-mobile) {
      grid-template-columns: 1fr;
      gap: $spacing-xs;
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    padding-top: 0.75rem;
  }

  &__label {
    font-family: $font-sans;
    font-size: $font-size-xs;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.6;
  }

  &__value {
    font-family: $font-serif-garamond;
    font-size: $font-size-sm;
    font-style: italic;
  }

  &__subtext {
    font-size: $font-size-xs;
    opacity: 0.6;
    line-height: 1.4;
  }
}
</style>
