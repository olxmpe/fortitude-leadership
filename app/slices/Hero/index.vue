<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { asText, isFilled } from "@prismicio/client";
import { PrismicImage, PrismicLink } from "@prismicio/vue";

const { slice } = defineProps(getSliceComponentProps<Content.HeroSlice>());
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="hero"
  >
    <div class="hero__background">
      <PrismicImage
        :field="slice.primary.backgroundImage"
        class="hero__image"
      />
      <div class="hero__overlay" />
    </div>

    <div class="hero__content">
      <h1 class="hero__title">{{ asText(slice.primary.title) }}</h1>
      <span class="hero__subtitle">{{ asText(slice.primary.subtitle) }}</span>
      <PrismicLink
        v-if="slice.primary.cta && isFilled.link(slice.primary.cta)"
        :field="slice.primary.cta"
        class="hero__cta"
      >
        {{ slice.primary.cta.text }} →
      </PrismicLink>
    </div>

    <div class="hero__footer">
      <span class="hero__footer-text">{{ asText(slice.primary.footerText) }}</span>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  width: 100%;
  height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: $color-white;

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
    background: rgba(0, 0, 0, 0.3);
  }

  &__content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
    padding: 0 $spacing-sm;
  }

  &__title {
    font-size: clamp(3rem, 8vw, 5.5rem);
    font-weight: 400;
    letter-spacing: 0.01em;
    margin: 0;
    line-height: 1.1;
  }

  &__subtitle {
    font-size: $font-size-md;
    letter-spacing: 0.04em;
    opacity: 0.9;
  }

  &__cta {
    margin-top: 0.75rem;
    padding: 0.7rem 2rem;
    border: 1px solid rgba(255, 255, 255, 0.8);
    color: $color-white;
    text-decoration: none;
    font-size: $font-size-xs;
    letter-spacing: 0.08em;
    transition:
      background-color 0.25s ease,
      color 0.25s ease;

    &:hover {
      background-color: $color-white;
      color: $color-black;
    }
  }

  &__footer {
    position: absolute;
    bottom: $spacing-xs;
    left: 0;
    right: 0;
    z-index: 1;
    text-align: center;
    padding: 0 $spacing-sm;
  }

  &__footer-text {
    font-size: $font-size-md;
    font-style: italic;
    opacity: 0.75;
    letter-spacing: 0.02em;
  }
}
</style>
