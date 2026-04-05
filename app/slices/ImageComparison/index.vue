<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { PrismicImage } from "@prismicio/vue";

defineProps(getSliceComponentProps<Content.ImageComparisonSlice>());
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="img-comparison"
    :class="`img-comparison--${slice.variation}`"
  >
    <div class="img-comparison__wrap img-comparison__wrap--left">
      <PrismicImage
        :field="slice.primary.leftImage"
        class="img-comparison__img"
      />
    </div>
    <div class="img-comparison__wrap img-comparison__wrap--right">
      <PrismicImage
        :field="slice.primary.rightImage"
        class="img-comparison__img"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.img-comparison {
  display: grid;
  grid-template-columns: 2fr 1fr;
  max-height: 360px;
  gap: $boxed;

  &--inversed {
    grid-template-columns: 1fr 2fr;
  }

  @media (max-width: $bp-mobile) {
    grid-template-columns: 1fr;
    min-height: unset;
  }

  &__wrap {
    overflow: hidden;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}
</style>
