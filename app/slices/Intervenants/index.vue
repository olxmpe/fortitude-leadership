<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { PrismicImage } from "@prismicio/vue";

defineProps(getSliceComponentProps<Content.TeamProfilesGridSlice>());
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="intervenants"
  >
    <div
      v-if="slice.primary.titre || slice.primary.description"
      class="intervenants__header"
    >
      <h2 v-if="slice.primary.titre" class="intervenants__title">
        {{ slice.primary.titre }}
      </h2>
      <p v-if="slice.primary.description" class="intervenants__description">
        {{ slice.primary.description }}
      </p>
    </div>
    <div class="intervenants__grid">
      <div
        v-for="(profile, index) in slice.primary.profiles"
        :key="index"
        class="intervenants__card"
      >
        <div class="intervenants__photo-wrap">
          <PrismicImage :field="profile.photo" class="intervenants__photo" />
        </div>
        <p class="intervenants__name">{{ profile.name }}</p>
        <p class="intervenants__role">{{ profile.role }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.intervenants {
  padding: $spacing-lg $boxed;

  &__header {
    margin-bottom: $spacing-md;
    text-align: center;
  }

  &__title {
    font-family: $font-serif;
    font-size: $font-size-lg;
    font-weight: 400;
    color: $color-navy;
  }

  &__description {
    font-size: $font-size-sm;
    color: $color-gray;
    margin-top: $spacing-xs;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: $spacing-xs;
    max-width: 1400px;
    margin: 0 auto;

    @media (max-width: $bp-mobile) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  &__photo-wrap {
    width: 100%;
    aspect-ratio: 2 / 3;
    overflow: hidden;
    margin-bottom: 0.75rem;
  }

  &__photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__name {
    font-family: $font-sans;
    font-size: $font-size-sm;
    font-weight: 600;
    color: $color-navy;
    margin: 0 0 0.25rem;
  }

  &__role {
    font-size: $font-size-xs;
    color: $color-gray;
    margin: 0;
    line-height: 1.4;
  }
}
</style>
