<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { asText } from "@prismicio/client";
import { PrismicLink, PrismicImage } from "@prismicio/vue";

const { slice } = defineProps(
  getSliceComponentProps<Content.MissionValuesSlice>(),
);
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="missions"
  >
    <div class="missions__top">
      <h2 class="missions__title">{{ slice.primary.title }}</h2>

      <div class="missions__values">
        <div class="missions__value">
          <h3 class="missions__value-heading">
            {{ slice.primary.value_one_heading }}
          </h3>
          <p class="missions__value-text">{{ asText(slice.primary.value_one_description) }}</p>
        </div>
        <div class="missions__value">
          <h3 class="missions__value-heading">
            {{ slice.primary.value_two_heading }}
          </h3>
          <p class="missions__value-text">{{ asText(slice.primary.value_two_description) }}</p>
        </div>
        <div class="missions__value">
          <h3 class="missions__value-heading">
            {{ slice.primary.value_three_heading }}
          </h3>
          <p class="missions__value-text">{{ asText(slice.primary.value_three_description) }}</p>
        </div>
      </div>
    </div>

    <div class="missions__bottom">
      <div class="missions__image-wrapper">
        <PrismicImage
          :field="slice.primary.feature_image"
          class="missions__image"
        />
      </div>
      <div class="missions__cta-block">
        <p class="missions__tagline">{{ asText(slice.primary.tagline_heading) }}</p>
        <PrismicLink :field="slice.primary.cta_link" class="missions__cta">
          {{ slice.primary.cta_text }} →
        </PrismicLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.missions {
  background: $color-navy-lighter;
  padding: $spacing-xl $spacing-lg 0;

  @media (max-width: $bp-mobile) {
    padding: 3rem $spacing-sm 0;
  }

  &__top {
    padding-bottom: $spacing-lg;
  }

  &__title {
    font-size: clamp(2rem, 4vw, 2.8rem);
    font-weight: 400;
    text-align: center;
    margin: 0 0 $spacing-lg;
  }

  &__values {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-md $spacing-lg;

    @media (max-width: $bp-mobile) {
      grid-template-columns: 1fr;
      gap: $spacing-md;
    }
  }

  &__value-heading {
    font-weight: 500;
    margin: 0 0 $spacing-sm;
    letter-spacing: 0.01em;
  }

  &__value-text {
    font-size: $font-size-xs;
    line-height: 1.75;
    margin: 0;
  }

  &__bottom {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: $spacing-lg;

    @media (max-width: $bp-mobile) {
      grid-template-columns: 1fr;
      gap: $spacing-md;
    }
  }

  &__image-wrapper {
    overflow: hidden;
  }

  &__image {
    width: 100%;
    max-height: 520px;
    object-fit: cover;
    display: block;
  }

  &__cta-block {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: $spacing-md;
    padding: $spacing-md 0;
  }

  &__tagline {
    font-family: $font-serif;
    font-size: clamp(1.5rem, 3vw, 2.2rem);
    font-weight: 400;
    color: $color-navy;
    line-height: 1.3;
    margin: 0;
    letter-spacing: 0.02em;
  }

  &__cta {
    display: inline-block;
    font-size: $font-size-xs;
    font-weight: 400;
    letter-spacing: 0.05em;
    color: $color-white;
    background: $color-navy;
    padding: 0.75rem 1.75rem;
    text-decoration: none;
    transition: background-color 0.2s ease;

    &:hover {
      background: $color-navy-light;
    }
  }
}
</style>
