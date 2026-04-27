<script setup lang="ts">
import { PrismicImage } from "@prismicio/vue";

const { client } = usePrismic();

const { data: allEvents } = await useAsyncData("upcoming-events", () =>
  client.getAllByType("event", {
    pageSize: 10,
    orderings: {
      field: "my.event.start",
      direction: "desc",
    },
  }),
);

const events = computed(() => {
  if (!allEvents.value) return [];
  const seen = new Set();
  return allEvents.value.filter((event) => {
    if (seen.has(event.uid)) return false;
    seen.add(event.uid);
    return true;
  }).slice(0, 3);
});
</script>

<template>
  <section v-if="events?.length" class="upcoming-events">
    <div class="upcoming-events__grid">
      <article
        v-for="event in events"
        :key="event.id"
        class="upcoming-events__card"
      >
        <div class="upcoming-events__card-image">
          <PrismicImage
            :field="event.data.image"
            class="upcoming-events__image"
          />
        </div>
        <div class="upcoming-events__card-content">
          <div class="upcoming-events__meta">
            <span v-if="event.data.start" class="upcoming-events__date">
              {{ toText(event.data.start) }}
            </span>
            <span v-if="event.data.location" class="upcoming-events__location">
              {{ toText(event.data.location) }}
            </span>
          </div>
          <h3 class="upcoming-events__title">{{ toText(event.data.title) }}</h3>
          <p class="upcoming-events__description">
            {{ toText(event.data.description) }}
          </p>
          <span class="upcoming-events__link" aria-hidden="true">Découvrir</span>
          <NuxtLink
            :to="`/evenements/${event.uid}`"
            class="upcoming-events__card-link"
            :aria-label="`Découvrir ${toText(event.data.title)}`"
          />
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped lang="scss">
.upcoming-events {
  padding: $spacing-lg $boxed;

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-md;
    max-width: 1400px;
    margin: 0 auto;
    justify-items: center;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: $bp-mobile) {
      grid-template-columns: 1fr;
      justify-items: stretch;
    }
  }

  &__card {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow: hidden;
    cursor: pointer;

    &:hover .upcoming-events__link {
      opacity: 0.7;
    }
  }

  &__card-link {
    position: absolute;
    inset: 0;
    z-index: 1;
  }

  &__card-image {
    width: 100%;
    aspect-ratio: 4 / 3;
    overflow: hidden;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }

  &__card:hover &__image {
    transform: scale(1.03);
  }

  &__card-content {
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;
    flex: 1;
    padding-top: $spacing-xs;
  }

  &__meta {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  &__date,
  &__location {
    font-size: $font-size-xs;
    color: $color-gray;
  }

  &__title {
    font-weight: 700;
    color: $color-black;
    line-height: 1.4;
  }

  &__description {
    color: $color-gray;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex: 1;
  }

  &__link {
    font-size: $font-size-xs;
    color: $color-navy;
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: opacity 0.2s ease;
    margin-top: auto;
  }
}
</style>
