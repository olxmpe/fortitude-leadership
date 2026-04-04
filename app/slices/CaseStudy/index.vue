<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { asText } from "@prismicio/client";
import { PrismicRichText, PrismicImage } from "@prismicio/vue";

defineProps(getSliceComponentProps<Content.CaseStudySlice>());
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    <h2>{{ asText(slice.primary.title) }}</h2>
    <PrismicRichText :field="slice.primary.subtitle" />
    <PrismicRichText :field="slice.primary.body" />
    <PrismicImage :field="slice.primary.background_image" />
  </section>
</template>
