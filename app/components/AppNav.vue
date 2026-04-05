<script setup lang="ts">
import { PrismicLink } from "@prismicio/vue";

const { data: nav } = await useGlobalNav();
const route = useRoute();

const scrolled = ref(false);
const menuOpen = ref(false);

const brandVisible = computed(
  () => scrolled.value || menuOpen.value || route.path !== "/",
);

function onScroll() {
  scrolled.value = window.scrollY > 60;
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function closeMenu() {
  menuOpen.value = false;
}

watch(menuOpen, (open) => {
  document.body.style.overflow = open ? "hidden" : "";
});

onMounted(() => window.addEventListener("scroll", onScroll, { passive: true }));
onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  document.body.style.overflow = "";
});
</script>

<template>
  <header
    class="app-nav"
    :class="{
      'app-nav--scrolled': scrolled,
      'app-nav--open': menuOpen,
    }"
  >
    <div class="app-nav__inner">
      <NuxtLink
        to="/"
        class="app-nav__brand"
        :class="{ 'app-nav__brand--hidden': !brandVisible }"
        @click="closeMenu"
      >
        Fortitude Leadership
      </NuxtLink>

      <nav v-if="nav" class="app-nav__links">
        <PrismicLink
          v-for="(item, index) in nav.data.nav_item"
          :key="index"
          :field="item.url"
          class="app-nav__link"
          :class="{ 'app-nav__link--bold': item.bold }"
        >
          {{ item.display_text }}
        </PrismicLink>
      </nav>

      <button
        class="app-nav__hamburger"
        :aria-expanded="menuOpen"
        aria-label="Menu"
        @click="toggleMenu"
      >
        <span class="app-nav__bar" />
        <span class="app-nav__bar" />
        <span class="app-nav__bar" />
      </button>
    </div>

    <div v-if="nav && menuOpen" class="app-nav__overlay" @click="closeMenu">
      <nav class="app-nav__mobile-links" @click.stop>
        <NuxtLink to="/" class="app-nav__mobile-link" @click="closeMenu">
          Accueil
        </NuxtLink>
        <PrismicLink
          v-for="(item, index) in nav.data.nav_item"
          :key="index"
          :field="item.url"
          class="app-nav__mobile-link"
          :class="{ 'app-nav__mobile-link--bold': item.bold }"
          @click="closeMenu"
        >
          {{ item.display_text }}
        </PrismicLink>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
.app-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease;

  &--scrolled:not(&--open) {
    background-color: $color-white;
    box-shadow: $box-shadow;

    .app-nav__brand,
    .app-nav__link {
      color: $color-navy;
    }

    .app-nav__link--bold {
      color: $color-navy;
    }

    .app-nav__bar {
      background-color: $color-navy;
    }
  }

  &--open {
    background-color: $color-white;
    height: 100dvh;

    .app-nav__brand {
      color: $color-navy;
    }

    .app-nav__bar {
      background-color: $color-navy;

      &:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
      }

      &:nth-child(2) {
        opacity: 0;
        transform: scaleX(0);
      }

      &:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
      }
    }
  }

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem $spacing-sm;
    max-width: 1400px;
    margin: 0 auto;

    @media (max-width: $bp-mobile) {
      padding: 1rem $spacing-xs;
    }
  }

  &__brand {
    font-family: $font-serif;
    font-size: $font-size-md;
    color: $color-white;
    text-decoration: none;
    white-space: nowrap;
    transition:
      color 0.3s ease,
      opacity 0.3s ease;
    z-index: 1;

    &--hidden {
      opacity: 0;
      pointer-events: none;
    }
  }

  &__links {
    display: flex;
    align-items: center;
    gap: 2rem;

    @media (max-width: $bp-mobile) {
      display: none;
    }
  }

  &__link {
    font-size: $font-size-sm;
    color: $color-white;
    text-decoration: none;
    white-space: nowrap;
    transition: color 0.3s ease;

    &:hover {
      opacity: 0.75;
    }

    &--bold {
      font-weight: 600;
    }
  }

  &__hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
    width: 28px;
    height: 28px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 1;

    @media (max-width: $bp-mobile) {
      display: flex;
    }
  }

  &__bar {
    display: block;
    width: 100%;
    height: 1.5px;
    background-color: $color-white;
    border-radius: 1px;
    transition:
      transform 0.3s ease,
      opacity 0.3s ease,
      background-color 0.3s ease;
  }

  &__overlay {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    @media (max-width: $bp-mobile) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &__mobile-links {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: $spacing-sm;
    width: 100%;
  }

  &__mobile-link {
    font-family: $font-serif;
    font-size: $font-size-lg;
    color: $color-navy;
    text-decoration: none;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.6;
    }

    &--bold {
      font-weight: 400;
      border: 1px solid $color-navy;
      padding: 0.6rem 1.5rem;
      font-family: $font-sans;
      font-size: $font-size-sm;
    }
  }
}
</style>
