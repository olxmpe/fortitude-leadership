<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import { PrismicRichText, PrismicLink } from "@prismicio/vue";

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
      <h2>{{ toText(slice.primary.mainHeading) }}</h2>
    </div>
    <div class="service__content">
      <h3 v-if="slice.primary.subheading">{{ slice.primary.subheading }}</h3>
      <PrismicRichText
        :field="slice.primary.description"
        class="service__content__description"
      />
      <PrismicLink
        v-if="isFilled.link(slice.primary.cta)"
        :field="slice.primary.cta"
        class="service__content__cta"
      >
        {{ slice.primary.cta.text }}
      </PrismicLink>
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

    &__description {
      :deep(p) {
        margin-bottom: $spacing-xs;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    &__cta {
      align-self: flex-start;
      margin-top: 0.5rem;
      padding: 0.7rem 2rem;
      background-color: $color-navy;
      color: $color-white;
      text-decoration: none;
      font-size: $font-size-xs;
      transition: background-color 0.25s ease;

      &:hover {
        background-color: $color-navy-dark;
      }
    }
  }
}
</style>
