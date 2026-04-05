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
        class="btn"
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
    padding: $spacing-lg $boxed $spacing-lg $spacing-md;

    @media (max-width: $bp-mobile) {
      padding: $spacing-lg $boxed;
    }
  }

  &__heading {
    font-style: italic;
  }

  &__description {
    :deep(p) {
      margin-bottom: 0.75rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .btn {
    margin-top: $spacing-sm;
  }
}
</style>
