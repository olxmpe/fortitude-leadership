<script setup lang="ts">
import { PrismicRichText, PrismicLink } from "@prismicio/vue";
import type { Content } from "@prismicio/client";

const { slice } = defineProps(getSliceComponentProps<Content.TestimonialSlice>());
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    <p>{{ slice.primary.author }}</p>
    <PrismicRichText :field="slice.primary.quote" />
    <PrismicLink :field="slice.primary.button" />
  </section>
</template>
