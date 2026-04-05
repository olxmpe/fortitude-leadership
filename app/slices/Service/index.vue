<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { asText } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/vue";

const { slice } = defineProps(
  getSliceComponentProps<Content.LeadershipGuidanceSlice>(),
);
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="service"
  >
    <div class="service__heading">
      <h2>{{ asText(slice.primary.mainHeading) }}</h2>
    </div>
    <div class="service__content">
      <h3 v-if="slice.primary.subheading">{{ slice.primary.subheading }}</h3>
      <PrismicRichText
        :field="slice.primary.description"
        class="service__description"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.service {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  padding: $spacing-lg $boxed;
  gap: $spacing-lg;

  @media (max-width: $bp-mobile) {
    grid-template-columns: 1fr;
    padding: $spacing-lg $boxed;
    gap: $spacing-sm;
  }

  &__heading {
    display: flex;
    align-items: flex-start;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;
  }

  &__description {
    :deep(p) {
      margin-bottom: $spacing-xs;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
