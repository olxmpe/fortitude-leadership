<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { PrismicRichText, PrismicLink, PrismicImage } from "@prismicio/vue";

const { slice } = defineProps(getSliceComponentProps<Content.MissionValuesSlice>());
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    <div>
      <div>
        <div>
          <h3>{{ slice.primary.value_one_heading }}</h3>
          <PrismicRichText :field="slice.primary.value_one_description" />
        </div>
        <div>
          <h3>{{ slice.primary.value_two_heading }}</h3>
          <PrismicRichText :field="slice.primary.value_two_description" />
        </div>
        <div>
          <h3>{{ slice.primary.value_three_heading }}</h3>
          <PrismicRichText :field="slice.primary.value_three_description" />
        </div>
      </div>

      <PrismicImage :field="slice.primary.feature_image" />

      <div>
        <PrismicRichText :field="slice.primary.tagline_heading" />
        <PrismicLink :field="slice.primary.cta_link">
          {{ slice.primary.cta_text }}
        </PrismicLink>
      </div>
    </div>
  </section>
</template>
