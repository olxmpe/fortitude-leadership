<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { PrismicImage } from "@prismicio/vue";
import { PrismicRichText } from "@prismicio/vue";

const { slice } = defineProps(getSliceComponentProps<Content.HeroSlice>());
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    <PrismicImage :field="slice.primary.backgroundImage" />

    <PrismicRichText :field="slice.primary.title" />

    <PrismicRichText :field="slice.primary.subtitle" />

    <PrismicRichText :field="slice.primary.footerText" />
  </section>
</template>
