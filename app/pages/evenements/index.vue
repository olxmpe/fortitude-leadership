<script setup lang="ts">
import { components } from "~/slices";

const { client } = usePrismic();

const { data: page } = await useAsyncData("evenements_listing", () =>
  client.getSingle("evenements"),
);

const siteUrl = "https://www.fortitude-leadership.com";

useSeo({
  title: page.value?.data.meta_title,
  description: page.value?.data.meta_description,
  image: page.value?.data.meta_image,
  fallbackTitle: "Événements — Fortitude Leadership",
});

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Événements", item: `${siteUrl}/evenements` },
        ],
      }),
    },
  ],
});
</script>

<template>
  <main>
    <SliceZone
      v-if="page"
      :slices="page.data.slices ?? []"
      :components="components"
    />
  </main>
</template>
