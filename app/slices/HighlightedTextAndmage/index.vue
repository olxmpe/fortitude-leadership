<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import { PrismicImage, PrismicLink, PrismicRichText } from "@prismicio/vue";

defineProps(getSliceComponentProps<Content.TextWithImageSlice>());
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="highlight"
  >
    <h2>{{ toText(slice.primary.heading) }}</h2>
    <PrismicRichText :field="slice.primary.description" />
    <PrismicLink
      v-if="isFilled.link(slice.primary.button_link)"
      :field="slice.primary.button_link"
      class="btn"
    />
  </section>
</template>

<style scoped lang="scss">
.highlight {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: $spacing-lg $boxed;
}
</style>
