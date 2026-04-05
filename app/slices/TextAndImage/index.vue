<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { asText, isFilled } from "@prismicio/client";
import { PrismicImage, PrismicRichText } from "@prismicio/vue";

defineProps(getSliceComponentProps<Content.VisionStatementSlice>());
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="text-and-image"
  >
    <div>
      <h2>{{ asText(slice.primary.title) }}</h2>
      <PrismicRichText :field="slice.primary.description" />
    </div>
    <div v-if="isFilled.image(slice.primary.backgroundImage)">
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
  padding: $spacing-lg $boxed;
  gap: $spacing-lg;
  align-items: center;
  text-align: center;

  &__image {
    width: 100%;
    max-height: 560px;
    object-fit: cover;
    display: block;
  }

  @media (max-width: $bp-mobile) {
    grid-template-columns: 1fr;
    padding: $spacing-lg $boxed;
    gap: $spacing-sm;

    &__image {
      max-height: 300px;
    }
  }
}
</style>
