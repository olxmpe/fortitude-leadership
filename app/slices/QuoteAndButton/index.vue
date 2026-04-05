<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { asText, isFilled } from "@prismicio/client";
import { PrismicLink } from "@prismicio/vue";

const { slice } = defineProps(
  getSliceComponentProps<Content.TestimonialSlice>(),
);
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="quote"
  >
    <p v-if="slice.primary.author" class="quote__author">
      {{ slice.primary.author }}
    </p>
    <p class="quote__text">{{ asText(slice.primary.quote) }}</p>
    <PrismicLink
      v-if="isFilled.link(slice.primary.button)"
      :field="slice.primary.button"
      class="quote__cta"
    />
  </section>
</template>

<style scoped lang="scss">
.quote {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: $spacing-lg $spacing-sm;
  max-width: 900px;
  margin: 0 auto;

  &__author {
    font-size: $font-size-xs;
    color: $color-gray;
    letter-spacing: 0.06em;
    margin: 0 0 $spacing-xs;
  }

  &__text {
    font-family: $font-serif;
    font-size: clamp(1.8rem, 4vw, 3rem);
    color: $color-navy;
    font-weight: 400;
    line-height: 1.25;
    margin: 0 0 $spacing-sm;
  }

  &__cta {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.65rem 1.25rem;
    background-color: $color-navy;
    color: $color-white;
    font-family: $font-sans;
    font-size: $font-size-xs;
    font-weight: 400;
    letter-spacing: 0.04em;
    text-decoration: none;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: $color-navy-dark;
    }
  }
}
</style>
