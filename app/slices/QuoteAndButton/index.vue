<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import { getSliceComponentProps, PrismicLink } from "@prismicio/vue";

defineProps(getSliceComponentProps<Content.TestimonialSlice>());
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="quote-cta"
  >
    <p v-if="slice.primary.author" class="quote-cta__author">
      {{ slice.primary.author }}
    </p>
    <p class="quote">{{ toText(slice.primary.quote) }}</p>
    <PrismicLink
      v-if="isFilled.link(slice.primary.button)"
      :field="slice.primary.button"
      class="btn"
    />
  </section>
</template>

<style scoped lang="scss">
.quote-cta {
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
    margin-bottom: $spacing-xs;
  }
}
</style>
