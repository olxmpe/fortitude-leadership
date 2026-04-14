<script setup lang="ts">
import { components } from "~/slices";

const { client } = usePrismic();
const { data: page, error } = await useAsyncData("services", () =>
  client.getSingle("services"),
);

const siteUrl = "https://www.fortitude-leadership.com";

useSeo({
  title: page.value?.data.meta_title,
  description: page.value?.data.meta_description,
  image: page.value?.data.meta_image,
  fallbackTitle: "Nos services — Fortitude Leadership",
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
          { "@type": "ListItem", position: 2, name: "Nos services", item: `${siteUrl}/services` },
        ],
      }),
    },
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#service`,
        name: "Fortitude Leadership",
        url: `${siteUrl}/services`,
        description: "Accompagnement en leadership, développement personnel et performance collective.",
        provider: {
          "@type": "Organization",
          name: "Fortitude Leadership",
          url: siteUrl,
        },
        areaServed: "FR",
        inLanguage: "fr",
        availableLanguage: "French",
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
