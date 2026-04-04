<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/vue";

defineProps<{
  slice: Content.TalentDevelopmentSlice;
}>();
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    <PrismicRichText :field="slice.primary.title" />
    <PrismicRichText :field="slice.primary.subtitle" />
    <PrismicRichText :field="slice.primary.body" />
  </section>
</template>
