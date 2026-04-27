<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import { PrismicLink, PrismicRichText } from "@prismicio/vue";

const { slice } = defineProps(getSliceComponentProps<Content.CallToActionCenteredSlice>());

const { resolveCtaHref } = useEventContactUrl();

const primaryCtaHref = computed(() => resolveCtaHref(slice.primary.primary_button));
</script>

<template>
  <section class="event-cta">
    <div class="event-cta__container">
      <h2 v-if="slice.primary.title">
        {{ slice.primary.title }}
      </h2>
      <div v-if="slice.primary.description" class="event-cta__description">
        <PrismicRichText :field="slice.primary.description" />
      </div>
      <div class="event-cta__buttons">
        <PrismicLink
          v-if="isFilled.link(slice.primary.flyer)"
          :field="slice.primary.flyer"
          class="event-cta__btn event-cta__btn--outline"
        >
          {{ slice.primary.flyer.text || "Télécharger la plaquette" }}
        </PrismicLink>
        <a
          v-if="primaryCtaHref"
          :href="primaryCtaHref"
          class="event-cta__btn event-cta__btn--primary"
        >
          {{ slice.primary.primary_button.text || "Déposer votre candidature" }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.event-cta {
  padding: $spacing-lg $boxed;

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 700px;
    margin: 0 auto;
    text-align: center;

    h2 {
      margin-bottom: $spacing-xs;
    }
  }

  &__description {
    color: $color-gray;
    margin-bottom: $spacing-md;

    :deep(p) {
      margin: 0;
    }
  }

  &__buttons {
    display: flex;
    gap: $spacing-xs;
    justify-content: center;

    @media (max-width: $bp-mobile) {
      flex-direction: column;
      align-items: stretch;
      max-width: 320px;
      width: 100%;
    }
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.65rem 1.5rem;
    font-family: $font-sans;
    font-size: $font-size-xs;
    font-weight: 400;
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;

    &--primary {
      background-color: $color-navy;
      color: $color-white;
      border: 1px solid $color-navy;

      &:hover {
        background-color: $color-navy-dark;
        border-color: $color-navy-dark;
      }
    }

    &--outline {
      background-color: $color-white;
      color: $color-navy;
      border: 1px solid $color-navy;

      &:hover {
        background-color: $color-navy-lighter;
      }
    }
  }
}
</style>
