<script setup lang="ts">
import { components } from "~/slices";

const { client } = usePrismic();
const { data: page, error } = await useAsyncData("services", () =>
  client.getSingle("services"),
);

useSeo({
  title: page.value?.data.meta_title,
  description: page.value?.data.meta_description,
  image: page.value?.data.meta_image,
  fallbackTitle: "Nos services — Fortitude Leadership",
});
</script>

<template>
  <main>
    <pre v-if="error" style="color:red;padding:2rem">ERREUR: {{ error }}</pre>
    <pre v-else-if="!page" style="padding:2rem">page est null — données non reçues</pre>
    <SliceZone v-else :slices="page.data.slices ?? []" :components="components" />
  </main>
</template>
