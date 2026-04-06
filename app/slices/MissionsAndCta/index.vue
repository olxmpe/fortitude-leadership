<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { asText } from "@prismicio/client";
import { PrismicLink, PrismicImage } from "@prismicio/vue";

const { slice } = defineProps(
  getSliceComponentProps<Content.MissionValuesSlice>(),
);
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="missions"
  >
    <div class="missions__top">
      <h2>{{ slice.primary.title }}</h2>

      <div class="missions__top__values">
        <div class="missions__top__values__value">
          <h3>{{ slice.primary.value_one_heading }}</h3>
          <p>{{ asText(slice.primary.value_one_description) }}</p>
        </div>
        <div class="missions__top__values__value">
          <h3>{{ slice.primary.value_two_heading }}</h3>
          <p>{{ asText(slice.primary.value_two_description) }}</p>
        </div>
        <div class="missions__top__values__value">
          <h3>{{ slice.primary.value_three_heading }}</h3>
          <p>{{ asText(slice.primary.value_three_description) }}</p>
        </div>
      </div>
    </div>

    <div class="missions__bottom">
      <PrismicImage
        :field="slice.primary.feature_image"
        class="missions__bottom__image"
      />
      <div class="missions__bottom__cta">
        <p class="quote">
          {{ asText(slice.primary.tagline_heading) }}
        </p>
        <PrismicLink :field="slice.primary.cta_link" class="btn">
          {{ slice.primary.cta_text }}
        </PrismicLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.missions {
  h2 {
    text-align: center;
  }

  &__top {
    padding: $spacing-lg $boxed 200px $boxed;
    background: $color-navy-lighter;

    &__values {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: $boxed;

      &__value {
        display: flex;
        flex-direction: column;
      }
    }
  }

  &__bottom {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    transform: translateY($boxed);

    &__image {
      transform: translateY(-30%);
      width: 100%;
      max-height: 350px;
      object-fit: cover;
      display: block;
    }

    &__cta {
      padding: 0 $boxed 20%;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  @media (max-width: $bp-mobile) {
    &__top {
      padding: $spacing-lg $boxed 250px $boxed;
      background: $color-navy-lighter;
    }

    &__top__values,
    &__bottom {
      grid-template-columns: 1fr;
    }
  }
}
</style>
