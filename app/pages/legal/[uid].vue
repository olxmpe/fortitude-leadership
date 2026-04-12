<script setup lang="ts">
import { components } from "~/slices";

const { client } = usePrismic();
const route = useRoute();
const uid = route.params.uid as string;

const { data: page, error } = await useAsyncData(`legal-${uid}`, () =>
  client.getByUID("legal", uid),
);

useSeo({
  title: page.value?.data.meta_title,
  description: page.value?.data.meta_description,
  image: page.value?.data.meta_image,
  fallbackTitle: "Mentions légales — Fortitude Leadership",
  noindex: true,
});
</script>

<template>
  <main>
    <pre v-if="error" style="color: red; padding: 2rem">{{ error }}</pre>
    <template v-else-if="page">
      <SliceZone :slices="page.data.slices ?? []" :components="components" />
      <div class="legal">
        <AppRichText :field="page.data.content" />
      </div>
    </template>
  </main>
</template>

<style scoped lang="scss">
.legal {
  padding: $spacing-lg 20%;
  margin: 0 auto;

  @media (max-width: $bp-mobile) {
    padding: $spacing-lg $boxed;
  }
}
</style>
