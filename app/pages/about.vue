<script setup lang="ts">
import { components } from "~/slices";

const { client } = usePrismic();
const { data: page, error } = await useAsyncData("about", () =>
  client.getSingle("about"),
);

const siteUrl = "https://www.fortitude-leadership.com";

useSeo({
  title: page.value?.data.meta_title,
  description: page.value?.data.meta_description,
  image: page.value?.data.meta_image,
  fallbackTitle: "À propos — Fortitude Leadership",
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
          { "@type": "ListItem", position: 2, name: "À propos", item: `${siteUrl}/about` },
        ],
      }),
    },
  ],
});
</script>

<template>
  <main>
    <pre v-if="error" style="color:red;padding:2rem">ERREUR: {{ error }}</pre>
    <pre v-else-if="!page" style="padding:2rem">page est null — données non reçues</pre>
    <SliceZone v-else :slices="page.data.slices ?? []" :components="components" />
  </main>
</template>
