<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { PrismicImage, PrismicRichText } from "@prismicio/vue";

defineProps(getSliceComponentProps<Content.CaseStudySlice>());
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="case-study"
    :class="`case-study--${slice.variation}`"
  >
    <div class="case-study__image-wrap">
      <PrismicImage :field="slice.primary.image" class="case-study__image" />
    </div>
    <div class="case-study__content-box">
      <div class="case-study__content">
        <h3 class="case-study__label">{{ toText(slice.primary.title) }}</h3>
        <p class="case-study__subtitle">{{ toText(slice.primary.subtitle) }}</p>
        <PrismicRichText :field="slice.primary.body" class="case-study__body" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.case-study {
  display: flex;
  align-items: stretch;
  gap: $spacing-md;

  &--default {
    flex-direction: row-reverse;
  }

  @media (max-width: $bp-mobile) {
    flex-direction: column;
    gap: $spacing-md;
  }

  &__image-wrap {
    flex: 0 0 30%;
    overflow: hidden;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__content-box {
    flex: 1;
    display: flex;
    align-items: center;
    background-color: $color-navy-lighter;
    padding: $spacing-md $spacing-md $spacing-md $boxed;
  }

  &--default .case-study__content-box {
    padding: $spacing-lg $boxed $spacing-lg $spacing-md;
  }

  @media (max-width: $bp-mobile) {
    .case-study__content-box {
      padding: $spacing-lg $boxed !important;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: $spacing-xs;
  }

  &__subtitle {
    font-weight: 600;
  }

  &__body {
    :deep(p) {
      color: $color-gray;
      margin-bottom: 0.5rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
