<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/vue";

const { slice } = defineProps(getSliceComponentProps<Content.LeadershipGuidanceSlice>());
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    <div>
      <PrismicRichText :field="slice.primary.mainHeading" />
    </div>
    <div>
      <p>{{ slice.primary.subheading }}</p>
      <PrismicRichText :field="slice.primary.description" />
    </div>
  </section>
</template>
