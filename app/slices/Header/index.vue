<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { asText } from "@prismicio/client";
import { PrismicImage } from "@prismicio/vue";

const { slice } = defineProps(getSliceComponentProps<Content.SectionHeaderSlice>());
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="page-header"
  >
    <div class="page-header__background">
      <PrismicImage :field="slice.primary.backgroundImage" class="page-header__image" />
      <div class="page-header__overlay" />
    </div>

    <h1 class="page-header__title">{{ asText(slice.primary.heading) }}</h1>
  </section>
</template>

<style scoped lang="scss">
.page-header {
  position: relative;
  width: 100%;
  height: 45vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $color-white;
  overflow: hidden;

  &__background {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
  }

  &__title {
    position: relative;
    z-index: 1;
    font-size: clamp(2rem, 6vw, 4rem);
    letter-spacing: 0.02em;
    color: $color-white;
  }
}
</style>
