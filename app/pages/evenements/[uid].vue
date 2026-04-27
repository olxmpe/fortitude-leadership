<script setup lang="ts">
import { components } from "~/slices";
import EventHero from "~/slices/EventHero/index.vue";

const { client } = usePrismic();
const route = useRoute();
const uid = route.params.uid as string;

const { data: page, error } = await useAsyncData(uid, () =>
  client.getByUID("event", uid),
);

const siteUrl = "https://www.fortitude-leadership.com";

useSeo({
  title: page.value?.data.title,
  image: page.value?.data.image,
  description: page.value?.data.description,
  fallbackTitle: "Événement — Fortitude Leadership",
});

useHead({
  script: page.value
    ? [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Accueil", item: siteUrl },
              { "@type": "ListItem", position: 2, name: "Événements", item: `${siteUrl}/evenements` },
              {
                "@type": "ListItem",
                position: 3,
                name: page.value.data.title ?? "Événement",
                item: `${siteUrl}/evenements/${page.value.uid}`,
              },
            ],
          }),
        },
      ]
    : [],
});

function formatEventDate(startStr: string | null, endStr: string | null): string {
  if (!startStr) return "";

  const start = new Date(startStr);
  const startDay = start.getDate();
  const startMonth = start.toLocaleDateString("fr-FR", { month: "long" });
  const startYear = start.getFullYear();

  if (!endStr) return `${startDay} ${startMonth} ${startYear}`;

  const end = new Date(endStr);
  const endDay = end.getDate();
  const endMonth = end.toLocaleDateString("fr-FR", { month: "long" });
  const endYear = end.getFullYear();

  if (start.getMonth() === end.getMonth() && startYear === endYear) {
    return `${startDay} – ${endDay} ${startMonth} ${startYear}`;
  }

  return `${startDay} ${startMonth} – ${endDay} ${endMonth} ${endYear}`;
}

const heroSlice = computed(() => {
  if (!page.value) return null;

  return {
    slice_type: "event_hero",
    variation: "default_layout",
    primary: {
      background_image: page.value.data.image,
      title: page.value.data.title,
      description: page.value.data.description,
      primary_cta: page.value.data.cta,
      flyer: page.value.data.flyer,
      date: formatEventDate(page.value.data.start, page.value.data.end),
      location: page.value.data.location,
      format: page.value.data.format,
      participants: page.value.data.attendees_count,
    },
  };
});
</script>

<template>
  <main>
    <pre v-if="error" style="color: red; padding: 2rem">{{ error }}</pre>

    <div v-else-if="page">
      <EventHero
        :slice="heroSlice"
        :index="0"
        :slices="[]"
        :components="components"
      />
      <SliceZone
        :slices="page.data.slices ?? []"
        :components="components"
      />
    </div>
  </main>
</template>
