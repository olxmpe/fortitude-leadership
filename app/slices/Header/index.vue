<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { asText } from "@prismicio/client";
import { PrismicImage } from "@prismicio/vue";

const { slice } = defineProps(
  getSliceComponentProps<Content.SectionHeaderSlice>(),
);
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="page-header"
  >
    <div class="page-header__background">
      <PrismicImage
        :field="slice.primary.backgroundImage"
        class="page-header__image"
      />
      <div class="page-header__overlay" />
    </div>

    <h1 class="page-header__title">{{ asText(slice.primary.heading) }}</h1>
  </section>
</template>

<style scoped lang="scss">
@keyframes header-parallax {
  from {
    transform: scale(1.15) translateY(-6%);
  }
  to {
    transform: scale(1.15) translateY(6%);
  }
}

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

    @media (min-width: $bp-mobile) {
      @supports (animation-timeline: scroll()) {
        transform: scale(1.15) translateY(-6%);
        transform-origin: center center;
        animation: header-parallax linear both;
        animation-timeline: scroll(root block);
        animation-range: 0 100vh;
      }
    }
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: $hero-overlay-background;
  }

  &__title {
    position: relative;
    z-index: 1;
    color: $color-white;
  }
}
</style>
