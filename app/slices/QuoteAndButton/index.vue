<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { asText, isFilled } from "@prismicio/client";
import { getSliceComponentProps, PrismicLink } from "@prismicio/vue";

defineProps(getSliceComponentProps<Content.TestimonialSlice>());
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
      class="btn"
    />
  </section>
</template>

<style scoped lang="scss">
.quote {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: $spacing-lg $boxed;
  max-width: 960px;
  margin: 0 auto;

  @media (max-width: $bp-mobile) {
    padding: $spacing-lg $boxed;
  }

  &__author {
    font-size: $font-size-xs;
    color: $color-gray;
    letter-spacing: 0.06em;
    margin-bottom: $spacing-xs;
  }

  &__text {
    font-family: $font-serif;
    font-size: clamp(1.8rem, 4vw, 3rem);
    color: $color-navy;
    line-height: 1.25;
    margin-bottom: $spacing-sm;
  }
}
</style>
