<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import { PrismicRichText, PrismicLink } from "@prismicio/vue";

defineProps(getSliceComponentProps<Content.LeadershipGuidanceSlice>());
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="paragraph-with-title"
  >
    <h2 v-if="slice.primary.mainHeading" class="paragraph-with-title__heading">
      {{ slice.primary.mainHeading }}
    </h2>
    <div class="paragraph-with-title__content">
      <p v-if="slice.primary.subheading" class="paragraph-with-title__subheading">
        {{ slice.primary.subheading }}
      </p>
      <div v-if="slice.primary.description" class="paragraph-with-title__description">
        <PrismicRichText :field="slice.primary.description" />
      </div>
      <PrismicLink
        v-if="isFilled.link(slice.primary.cta)"
        :field="slice.primary.cta"
        class="paragraph-with-title__cta"
      >
        {{ slice.primary.cta.text }}
      </PrismicLink>
    </div>
  </section>
</template>

<style scoped lang="scss">
.paragraph-with-title {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: $spacing-lg;
  padding: $spacing-lg $boxed;
  align-items: flex-start;

  @media (max-width: $bp-mobile) {
    grid-template-columns: 1fr;
    gap: $spacing-sm;
  }

  &__heading {
    // inherits global h2: $font-serif, left-aligned
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;
  }

  &__subheading {
    font-family: $font-sans;
    font-size: $font-size-sm;
    font-weight: 600;
    color: $color-navy;
    margin: 0;
  }

  &__description {
    color: $color-gray;
    line-height: 1.75;

    :deep(p) {
      margin: 0;

      & + p {
        margin-top: 0.75rem;
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
</style>
