<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { asText } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/vue";

defineProps(getSliceComponentProps<Content.VisionStatementSlice>());
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="text-and-image"
  >
    <div class="text-and-image__heading-wrap">
      <h1 class="text-and-image__title">{{ asText(slice.primary.title) }}</h1>
    </div>
    <div class="text-and-image__content">
      <PrismicRichText
        :field="slice.primary.description"
        class="text-and-image__description"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.text-and-image {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  padding: $spacing-lg $spacing-sm;
  gap: $spacing-lg;

  @media (max-width: $bp-mobile) {
    grid-template-columns: 1fr;
    padding: $spacing-sm;
    gap: $spacing-sm;
  }

  &__heading-wrap {
    display: flex;
    align-items: flex-start;
  }

  &__title {
    font-size: clamp(2rem, 4vw, 3.2rem);
    color: $color-navy;
    font-weight: 400;
    line-height: 1.15;
    margin: 0;
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  &__description {
    :deep(strong) {
      display: block;
      font-weight: 700;
      color: $color-navy;
      margin-bottom: 1rem;
    }

    :deep(p) {
      margin: 0 0 1rem;
      line-height: 1.75;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
