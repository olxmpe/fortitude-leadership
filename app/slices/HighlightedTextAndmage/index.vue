<script setup lang="ts">
import type { Content } from "@prismicio/client";

defineProps(getSliceComponentProps<Content.TextWithImageSlice>());
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    <div>
      <PrismicImage :field="slice.primary.image" />
    </div>
    <div>
      <PrismicRichText :field="slice.primary.heading" />
      <PrismicRichText :field="slice.primary.description" />
      <PrismicLink :field="slice.primary.button_link" />
    </div>
  </section>
</template>
