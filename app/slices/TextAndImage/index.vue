<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/vue";
import { PrismicImage } from "@prismicio/vue";

defineProps(getSliceComponentProps<Content.VisionStatementSlice>());
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    <PrismicRichText :field="slice.primary.title" />
    <PrismicRichText :field="slice.primary.description" />
    <PrismicImage :field="slice.primary.backgroundImage" />
  </section>
</template>
