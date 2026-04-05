<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { asText } from "@prismicio/client";
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
    <div class="case-study__content">
      <p class="case-study__label">{{ asText(slice.primary.title) }}</p>
      <p class="case-study__subtitle">{{ asText(slice.primary.subtitle) }}</p>
      <PrismicRichText :field="slice.primary.body" class="case-study__body" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.case-study {
  display: grid;
  grid-template-columns: 40% 1fr;
  min-height: 380px;
  background-color: $color-navy-lighter;

  // Variation: image on the right (default)
  &--default {
    grid-template-columns: 1fr 40%;

    .case-study__image-wrap {
      order: 2;
    }

    .case-study__content {
      order: 1;
      padding: $spacing-sm $spacing-sm $spacing-sm $spacing-md;
    }
  }

  // Variation: image on the left
  &--caseStudyImageLeft {
    .case-study__content {
      padding: $spacing-sm $spacing-md $spacing-sm $spacing-sm;
    }
  }

  @media (max-width: $bp-mobile) {
    grid-template-columns: 1fr !important;

    &--default .case-study__image-wrap,
    &--default .case-study__content {
      order: unset;
    }

    .case-study__content {
      padding: $spacing-sm !important;
    }
  }

  &__image-wrap {
    overflow: hidden;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.75rem;
  }

  &__label {
    font-weight: 700;
    color: $color-navy;
    margin: 0;
    font-size: $font-size-sm;
  }

  &__subtitle {
    font-weight: 600;
    color: $color-navy;
    margin: 0;
    line-height: 1.4;
    font-size: $font-size-sm;
  }

  &__body {
    :deep(p) {
      color: $color-gray;
      margin: 0 0 0.5rem;
      line-height: 1.7;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
