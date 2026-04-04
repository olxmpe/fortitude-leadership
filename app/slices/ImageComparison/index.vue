<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { PrismicImage } from "@prismicio/vue";

defineProps(getSliceComponentProps<Content.ImageComparisonSlice>());
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    <div>
      <PrismicImage :field="slice.primary.leftImage" />
      <PrismicImage :field="slice.primary.rightImage" />
    </div>
  </section>
</template>
