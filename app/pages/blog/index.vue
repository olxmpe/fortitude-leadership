<script setup lang="ts">
import { filter } from "@prismicio/client";
import { components } from "~/slices";

const { client } = usePrismic();
const route = useRoute();

const selectedCategoryUid = computed(
  () => route.query.category as string | undefined,
);
const currentPage = computed(() => Number(route.query.page) || 1);

const [{ data: page }, { data: categories }] = await Promise.all([
  useAsyncData("blog-page", () => client.getSingle("blog_articles")),
  useAsyncData("blog-categories", () =>
    client.getAllByType("blog_category", {
      orderings: [{ field: "my.blog_category.name" }],
    }),
  ),
]);

const selectedCategoryId = computed(() => {
  if (!selectedCategoryUid.value || !categories.value) return undefined;
  return categories.value.find((c) => c.uid === selectedCategoryUid.value)?.id;
});

const { data: articlesQuery, pending } = await useAsyncData(
  "blog-articles",
  () =>
    client.getByType("blog_article", {
      pageSize: 9,
      page: currentPage.value,
      orderings: [
        { field: "document.last_publication_date", direction: "desc" },
      ],
      ...(selectedCategoryId.value
        ? {
            filters: [
              filter.at("my.blog_article.category", selectedCategoryId.value),
            ],
          }
        : {}),
      fetchLinks: ["blog_category.name"],
    }),
  { watch: [selectedCategoryUid, currentPage] },
);

function selectCategory(uid: string | undefined) {
  navigateTo({ query: uid ? { category: uid } : {} });
}

function goToPage(p: number) {
  navigateTo({
    query: {
      ...(selectedCategoryUid.value
        ? { category: selectedCategoryUid.value }
        : {}),
      ...(p > 1 ? { page: String(p) } : {}),
    },
  });
}

useSeo({
  title: page.value?.data.meta_title,
  description: page.value?.data.meta_description,
  image: page.value?.data.meta_image,
  fallbackTitle: "Blog — Fortitude Leadership",
});

useHead({
  link: [
    {
      rel: "alternate",
      type: "application/rss+xml",
      title: "Fortitude Leadership — Blog",
      href: "/rss.xml",
    },
  ],
});

</script>

<template>
  <main class="blog">
    <SliceZone
      v-if="page"
      :slices="page.data.slices ?? []"
      :components="components"
    />

    <div class="blog__content">
      <div v-if="categories?.length" class="blog__filters">
        <button
          class="blog__filter"
          :class="{ 'blog__filter--active': !selectedCategoryUid }"
          @click="selectCategory(undefined)"
        >
          Tous
        </button>
        <button
          v-for="cat in categories"
          :key="cat.id"
          class="blog__filter"
          :class="{ 'blog__filter--active': selectedCategoryUid === cat.uid }"
          @click="selectCategory(cat.uid!)"
        >
          {{ cat.data.name }}
        </button>
      </div>

      <div class="blog__grid" :class="{ 'blog__grid--loading': pending }">
        <template v-if="articlesQuery?.results.length">
          <ArticleCard
            v-for="article in articlesQuery.results"
            :key="article.id"
            :article="article"
          />
        </template>
        <p v-else-if="!pending" class="blog__empty">
          Aucun article pour le moment.
        </p>
      </div>

      <nav
        v-if="(articlesQuery?.total_pages ?? 1) > 1"
        class="blog__pagination"
        aria-label="Pagination"
      >
        <button
          class="blog__page-btn"
          :disabled="currentPage <= 1"
          @click="goToPage(currentPage - 1)"
        >
          ← Précédent
        </button>

        <div class="blog__page-numbers">
          <button
            v-for="p in articlesQuery?.total_pages"
            :key="p"
            class="blog__page-num"
            :class="{ 'blog__page-num--active': p === currentPage }"
            @click="goToPage(p)"
          >
            {{ p }}
          </button>
        </div>

        <button
          class="blog__page-btn"
          :disabled="currentPage >= (articlesQuery?.total_pages ?? 1)"
          @click="goToPage(currentPage + 1)"
        >
          Suivant →
        </button>
      </nav>
    </div>
  </main>
</template>

<style scoped lang="scss">
.blog {
  &__content {
    padding: $spacing-lg $boxed;
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }

  &__filters {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-xs;
  }

  &__filter {
    padding: 0.4rem 1.2rem;
    border: 1px solid $color-navy-light;
    background: none;
    color: $color-gray;
    font-family: $font-sans;
    font-size: $font-size-xs;
    cursor: pointer;
    transition:
      background-color 0.2s ease,
      color 0.2s ease,
      border-color 0.2s ease;

    &:hover {
      border-color: $color-navy;
      color: $color-navy;
    }

    &--active,
    &--active:hover {
      background-color: $color-navy;
      border-color: $color-navy;
      color: $color-white;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-sm;
    transition: opacity 0.2s ease;

    &--loading {
      opacity: 0.4;
      pointer-events: none;
    }

    @media (max-width: $bp-mobile) {
      grid-template-columns: 1fr;
    }
  }

  &__empty {
    grid-column: 1 / -1;
    text-align: center;
    color: $color-gray;
    padding: $spacing-lg 0;
  }

  &__pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-xs;
  }

  &__page-btn {
    padding: 0.5rem 1rem;
    border: 1px solid $color-navy-light;
    background: none;
    color: $color-navy;
    font-family: $font-sans;
    font-size: $font-size-xs;
    cursor: pointer;
    transition: opacity 0.2s ease;

    &:disabled {
      opacity: 0.3;
      cursor: default;
    }

    &:not(:disabled):hover {
      background-color: $color-navy-lighter;
    }
  }

  &__page-numbers {
    display: flex;
    gap: 0.5rem;
  }

  &__page-num {
    width: 2rem;
    height: 2rem;
    border: 1px solid $color-navy-light;
    background: none;
    color: $color-navy;
    font-family: $font-sans;
    font-size: $font-size-xs;
    cursor: pointer;
    transition:
      background-color 0.2s ease,
      color 0.2s ease;

    &:hover {
      background-color: $color-navy-lighter;
    }

    &--active {
      background-color: $color-navy;
      color: $color-white;
      border-color: $color-navy;
    }
  }
}
</style>
