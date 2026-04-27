<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import { PrismicImage, PrismicLink } from "@prismicio/vue";

defineProps(getSliceComponentProps<Content.EventHeroSlice>());
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="event-hero"
  >
    <div class="event-hero__background">
      <PrismicImage
        :field="slice.primary.background_image"
        :widths="[1200, 1920, 2560]"
        sizes="100vw"
        class="event-hero__background-image"
      />
      <div class="event-hero__overlay" />
    </div>

    <div class="event-hero__content">
      <h1 class="event-hero__title">{{ toText(slice.primary.title) }}</h1>
      <p class="event-hero__description">
        {{ toText(slice.primary.description) }}
      </p>
      <div class="event-hero__ctas">
        <PrismicLink
          v-if="slice.primary.flyer && isFilled.link(slice.primary.flyer)"
          :field="slice.primary.flyer"
          class="event-hero__cta"
        >
          {{ slice.primary.flyer.text || "Télécharger la plaquette" }}
        </PrismicLink>
        <PrismicLink
          v-if="slice.primary.primary_cta && isFilled.link(slice.primary.primary_cta)"
          :field="slice.primary.primary_cta"
          class="event-hero__cta event-hero__cta--primary"
        >
          {{ slice.primary.primary_cta.text || "Déposez votre candidature" }}
        </PrismicLink>
      </div>
    </div>

    <div
      v-if="slice.primary.date || slice.primary.location || slice.primary.format || slice.primary.participants"
      class="event-hero__footer"
    >
      <div v-if="slice.primary.date" class="event-hero__info-item">
        <span class="event-hero__info-label">Date</span>
        <span class="event-hero__info-value">{{ slice.primary.date }}</span>
      </div>
      <div v-if="slice.primary.location" class="event-hero__info-item">
        <span class="event-hero__info-label">Lieu</span>
        <span class="event-hero__info-value">{{ toText(slice.primary.location) }}</span>
      </div>
      <div v-if="slice.primary.format" class="event-hero__info-item">
        <span class="event-hero__info-label">Format</span>
        <span class="event-hero__info-value">{{ toText(slice.primary.format) }}</span>
      </div>
      <div v-if="slice.primary.participants" class="event-hero__info-item">
        <span class="event-hero__info-label">Participants</span>
        <span class="event-hero__info-value">{{ toText(slice.primary.participants) }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.event-hero {
  position: relative;
  width: 100%;
  height: 100svh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: $color-white;

  @media (max-width: $bp-mobile) {
    height: auto;
    min-height: 100svh;
  }

  &__background {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  &__background-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: rgba(7, 17, 38, 0.65);
  }

  // Prend tout l'espace disponible et centre son contenu
  &__content {
    position: relative;
    z-index: 1;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: $spacing-xs;
    padding: 5rem $boxed 0;

    @media (max-width: $bp-mobile) {
      padding: 5rem $boxed $spacing-xs;
      gap: 1rem;
    }
  }

  &__title {
    color: $color-white;
  }

  &__description {
    font-family: $font-sans;
    font-size: $font-size-sm;
    font-weight: 400;
    line-height: 1.75;
    opacity: 0.9;
    max-width: 480px;
  }

  &__ctas {
    display: flex;
    gap: 0.75rem;
    margin-top: 0.5rem;
    justify-content: center;
    flex-wrap: wrap;

    @media (max-width: $bp-mobile) {
      flex-direction: column;
      align-items: stretch;
      max-width: 320px;
      width: 100%;
    }
  }

  &__cta {
    padding: 0.75rem 1.75rem;
    border: 1px solid rgba(255, 255, 255, 0.7);
    color: $color-white;
    text-decoration: none;
    font-size: $font-size-xs;
    font-weight: 400;
    transition: background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease;
    display: inline-block;

    &:hover {
      background-color: $color-white;
      border-color: $color-white;
      color: $color-navy;
    }

    &--primary {
      background-color: rgba(255, 255, 255, 0.15);
    }

    @media (max-width: $bp-mobile) {
      text-align: center;
    }
  }

  // Ancré en bas naturellement (flex-shrink: 0), pas besoin d'absolute
  &__footer {
    position: relative;
    z-index: 1;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: $spacing-sm;
    flex-wrap: nowrap;
    padding: $spacing-xs $boxed $spacing-xs;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.35) 0%, transparent 100%);

    @media (max-width: $bp-mobile) {
      flex-direction: column;
      gap: 0.6rem;
      padding: $spacing-xs $boxed;
    }
  }

  &__info-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
    text-align: center;
    flex-shrink: 0;

    @media (max-width: $bp-mobile) {
      flex-direction: row;
      align-items: baseline;
      text-align: left;
      gap: 0.6rem;
    }
  }

  &__info-label {
    font-family: $font-sans;
    font-size: $font-size-xs;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    opacity: 0.7;

    @media (max-width: $bp-mobile) {
      flex-shrink: 0;
    }
  }

  &__info-value {
    font-family: $font-serif-garamond;
    font-size: $font-size-sm;
    font-weight: 400;
    font-style: italic;
    white-space: nowrap;

    @media (max-width: $bp-mobile) {
      font-size: $font-size-xs;
      white-space: normal;
    }
  }
}
</style>
