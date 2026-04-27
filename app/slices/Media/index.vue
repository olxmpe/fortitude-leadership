<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/vue";

const { slice } = defineProps(getSliceComponentProps<Content.MediaFeatureSlice>());

function getEmbedUrl(url: string): string {
  if (!url) return "";

  const params = "autoplay=1&mute=1&controls=0&playsinline=1&rel=0&loop=1";

  const short = url.match(/youtu\.be\/([^?&]+)/);
  if (short) return `https://www.youtube.com/embed/${short[1]}?${params}&playlist=${short[1]}`;

  const watch = url.match(/[?&]v=([^&]+)/);
  if (watch) return `https://www.youtube.com/embed/${watch[1]}?${params}&playlist=${watch[1]}`;

  return url;
}

const embedUrl = computed(() =>
  isFilled.embed(slice.primary.video) ? getEmbedUrl(slice.primary.video.embed_url ?? "") : "",
);
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="media"
  >
    <div class="media__container">
      <div class="media__content">
        <h2 v-if="slice.primary.title" class="media__title">
          {{ slice.primary.title }}
        </h2>
        <div v-if="slice.primary.description" class="media__description">
          <PrismicRichText :field="slice.primary.description" />
        </div>
      </div>
      <div v-if="embedUrl" class="media__wrapper">
        <iframe
          class="media__iframe"
          :src="embedUrl"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.media {
  padding: $spacing-lg $boxed;
  background-color: $color-gray-light;

  &__container {
    display: grid;
    grid-template-columns: 2fr 3fr;
    gap: $spacing-lg;
    align-items: center;

    @media (max-width: $bp-mobile) {
      grid-template-columns: 1fr;
      gap: $spacing-xs;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;
  }

  &__title {
    font-family: $font-serif;
    font-size: $font-size-lg;
    font-weight: 400;
    color: $color-navy;
    margin-bottom: 0;

    @media (max-width: $bp-mobile) {
      font-size: $font-size-md;
    }
  }

  &__description {
    color: $color-gray;
    font-size: $font-size-sm;
    line-height: 1.75;

    :deep(p) {
      margin: 0;

      & + p {
        margin-top: 0.75rem;
      }
    }
  }

  &__wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
  }

  &__iframe {
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
  }
}
</style>
