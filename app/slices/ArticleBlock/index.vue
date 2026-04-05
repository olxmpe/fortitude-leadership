<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { asText } from "@prismicio/client";
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
    <h2>{{ asText(slice.primary.title) }}</h2>
    <p>{{ asText(slice.primary.subtitle) }}</p>
    <PrismicRichText :field="slice.primary.body" />
  </section>
</template>
