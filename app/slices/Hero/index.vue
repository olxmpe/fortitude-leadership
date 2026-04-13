<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
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
        v-if="slice.primary.backgroundImage.mobile"
        :field="slice.primary.backgroundImage.mobile"
        sizes="100vw"
        class="hero__background__image hero__background__image--mobile"
      />
      <PrismicImage
        :field="slice.primary.backgroundImage"
        :widths="[1200, 1920, 2560]"
        sizes="100vw"
        class="hero__background__image hero__background__image--desktop"
      />
      <div class="hero__background__overlay" />
    </div>

    <div class="hero__content">
      <h1 class="hero__content__title">{{ toText(slice.primary.title) }}</h1>
      <span class="hero__content__subtitle">
        {{ toText(slice.primary.subtitle) }}
      </span>
      <PrismicLink
        v-if="slice.primary.cta && isFilled.link(slice.primary.cta)"
        :field="slice.primary.cta"
        class="hero__content__cta"
      >
        {{ slice.primary.cta.text }}
      </PrismicLink>
    </div>

    <div class="hero__footer">
      <span class="hero__footer-text">{{ toText(slice.primary.footerText) }}</span>
    </div>
  </section>
</template>

<style scoped lang="scss">
@keyframes hero-parallax {
  from {
    transform: scale(1.15) translateY(-6%);
  }
  to {
    transform: scale(1.15) translateY(6%);
  }
}

.hero {
  position: relative;
  width: 100%;
  height: 85svh;
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

    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;

      &--mobile {
        display: block;

        @media (min-width: $bp-mobile) {
          display: none;
        }
      }

      &--desktop {
        display: none;

        @media (min-width: $bp-mobile) {
          display: block;

          @supports (animation-timeline: scroll()) {
            transform: scale(1.15) translateY(-6%);
            transform-origin: center center;
            animation: hero-parallax linear both;
            animation-timeline: scroll(root block);
            animation-range: 0 100vh;
          }
        }
      }
    }

    &__overlay {
      position: absolute;
      inset: 0;
      background: $hero-overlay-background;
    }
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

    &__title {
      color: $color-white;
    }

    &__subtitle {
      font-size: 1.2rem;
      font-weight: 200;
      opacity: 0.9;
    }

    &__cta {
      margin-top: 0.75rem;
      padding: 0.7rem 2rem;
      border: 1px solid rgba(255, 255, 255, 0.8);
      color: $color-white;
      text-decoration: none;
      font-size: $font-size-xs;
      transition:
        background-color 0.25s ease,
        color 0.25s ease;

      &:hover {
        background-color: $color-white;
        color: $color-black;
      }
    }
  }

  &__footer {
    position: absolute;
    bottom: $spacing-xs;
    left: 0;
    right: 0;
    z-index: 1;
    text-align: center;
    padding: $boxed;
  }

  &__footer-text {
    font-size: $font-size-sm;
    font-weight: 200;
    opacity: 0.9;
    font-style: italic;
  }
}
</style>
