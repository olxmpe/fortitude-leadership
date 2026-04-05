<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { asText, isFilled } from "@prismicio/client";
import { PrismicImage, PrismicLink, PrismicRichText } from "@prismicio/vue";

defineProps(getSliceComponentProps<Content.TextWithImageSlice>());
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="highlight"
  >
    <div class="highlight__image-wrap">
      <PrismicImage :field="slice.primary.image" class="highlight__image" />
    </div>
    <div class="highlight__content">
      <h2 class="highlight__heading">{{ asText(slice.primary.heading) }}</h2>
      <PrismicRichText
        :field="slice.primary.description"
        class="highlight__description"
      />
      <PrismicLink
        v-if="isFilled.link(slice.primary.button_link)"
        :field="slice.primary.button_link"
        class="highlight__cta"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.highlight {
  display: grid;
  grid-template-columns: 45% 1fr;
  min-height: 420px;
  background-color: $color-navy-lighter;

  @media (max-width: $bp-mobile) {
    grid-template-columns: 1fr;
  }

  &__image-wrap {
    overflow: hidden;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: $spacing-xs;
    padding: $spacing-sm $spacing-sm $spacing-sm $spacing-md;

    @media (max-width: $bp-mobile) {
      padding: $spacing-sm;
    }
  }

  &__heading {
    font-style: italic;
    margin: 0;
    line-height: 1.3;
  }

  &__description {
    :deep(p) {
      margin: 0 0 0.75rem;
      line-height: 1.7;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  &__cta {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: $spacing-xs;
    padding: 0.65rem 1.25rem;
    background-color: $color-navy;
    color: $color-white;
    font-family: $font-sans;
    font-size: $font-size-xs;
    font-weight: 400;
    letter-spacing: 0.04em;
    text-decoration: none;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: $color-navy-dark;
    }
  }
}
</style>
