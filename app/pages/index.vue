<script setup lang="ts">
import { components } from "~/slices";

const { client } = usePrismic();

const [{ data: page, error }, { data: articles }] = await Promise.all([
  useAsyncData("index", () => client.getSingle("home")),
  useLatestArticles(3),
]);

useSeo({
  title: page.value?.data.meta_title,
  description: page.value?.data.meta_description,
  image: page.value?.data.meta_image,
  fallbackTitle: "Fortitude Leadership",
});
</script>

<template>
  <main>
    <pre v-if="error" style="color:red;padding:2rem">ERREUR: {{ error }}</pre>
    <pre v-else-if="!page" style="padding:2rem">page est null — données non reçues</pre>
    <template v-else>
      <SliceZone :slices="page.data.slices ?? []" :components="components" />

      <section v-if="articles?.length" class="latest-articles">
        <h2 class="latest-articles__title">Nos derniers articles</h2>
        <div class="latest-articles__grid">
          <ArticleCard
            v-for="article in articles"
            :key="article.id"
            :article="article"
          />
        </div>
      </section>
    </template>
  </main>
</template>

<style scoped lang="scss">
.latest-articles {
  padding: $spacing-lg $boxed;

  &__title {
    text-align: center;
    margin-bottom: $spacing-lg;
  }

  &__grid {
    display: flex;
    justify-content: center;
    gap: $spacing-sm;

    @media (max-width: $bp-mobile) {
      flex-direction: column;
    }
  }
}
</style>
