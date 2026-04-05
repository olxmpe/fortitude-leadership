<script setup lang="ts">
import { components } from "~/slices";

const { client } = usePrismic();
const { data: page, error } = await useAsyncData("about", () =>
  client.getSingle("about"),
);

useHead({
  title: page.value?.data.meta_title ?? "À propos — Fortitude Leadership",
});
</script>

<template>
  <main>
    <pre v-if="error" style="color:red;padding:2rem">ERREUR: {{ error }}</pre>
    <pre v-else-if="!page" style="padding:2rem">page est null — données non reçues</pre>
    <SliceZone v-else :slices="page.data.slices ?? []" :components="components" />
  </main>
</template>
