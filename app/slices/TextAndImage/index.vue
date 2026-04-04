<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { asText } from "@prismicio/client";
import { PrismicRichText, PrismicImage } from "@prismicio/vue";

defineProps(getSliceComponentProps<Content.VisionStatementSlice>());
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="text-and-image"
  >
    <div class="text-and-image__text">
      <h2 class="text-and-image__title">{{ asText(slice.primary.title) }}</h2>
      <PrismicRichText
        :field="slice.primary.description"
        class="text-and-image__description"
      />
    </div>
    <div class="text-and-image__media">
      <PrismicImage
        :field="slice.primary.backgroundImage"
        class="text-and-image__image"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.text-and-image {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  min-height: 60vh;
  padding: $spacing-xl $spacing-lg;
  gap: $spacing-lg;

  @media (max-width: $bp-mobile) {
    grid-template-columns: 1fr;
    padding: 3rem $spacing-sm;
    gap: $spacing-md;
  }

  &__text {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: $spacing-md;
    padding-right: $spacing-md;

    @media (max-width: $bp-mobile) {
      padding-right: 0;
    }
  }

  &__title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 400;
    margin: 0;
    line-height: 1.15;
  }

  &__description {
    :deep(p) {
      font-size: clamp(0.85rem, 1.5vw, 0.95rem);
      line-height: 1.75;
      margin: 0 0 0.75rem;

      &:last-child {
        margin-bottom: 0;
      }
    }

    :deep(strong) {
      font-weight: 500;
    }
  }

  &__media {
    overflow: hidden;
  }

  &__image {
    width: 100%;
    max-height: 500px;
    object-fit: cover;
    display: block;
  }
}
</style>
