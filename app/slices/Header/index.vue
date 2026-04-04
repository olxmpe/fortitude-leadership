<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/vue";
import { PrismicImage } from "@prismicio/vue";

const { slice } = defineProps(getSliceComponentProps<Content.SectionHeaderSlice>());
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    <PrismicImage :field="slice.primary.backgroundImage" />
    <PrismicRichText :field="slice.primary.heading" />
  </section>
</template>
