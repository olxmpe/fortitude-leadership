<script setup lang="ts">
import type { LinkField } from "@prismicio/client";
import { PrismicLink } from "@prismicio/vue";

const { data: footer } = await useFooter();
const { reset } = useCookieConsent();

type LinkWithText = LinkField & { text?: string };
</script>

<template>
  <footer v-if="footer" class="footer">
    <div class="footer__top">
      <p class="footer__brand">Fortitude Leadership</p>

      <div
        v-for="(block, i) in footer.data.footer_block"
        :key="i"
        class="footer__block"
      >
        <p class="footer__block-title">{{ block.title }}</p>
        <ul class="footer__links">
          <li v-for="(link, j) in block.link as LinkWithText[]" :key="j">
            <PrismicLink :field="link" class="footer__link">
              {{ link.text }}
            </PrismicLink>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer__bottom">
      <p class="footer__copyright">{{ footer.data.copyright }}</p>
      <ul class="footer__legal">
        <li
          v-for="(link, i) in footer.data.legal_link as LinkWithText[]"
          :key="i"
        >
          <PrismicLink :field="link" class="footer__legal-link">
            {{ link.text }}
          </PrismicLink>
        </li>
        <li>
          <button class="footer__legal-link footer__cookies-btn" @click="reset">
            Gérer les cookies
          </button>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background-color: $color-navy;
  color: $color-white;

  &__top {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: $spacing-sm;
    padding: $spacing-lg $boxed;
    align-items: start;

    @media (max-width: $bp-mobile) {
      grid-template-columns: 1fr;
      gap: $spacing-md;
    }
  }

  &__brand {
    font-family: $font-serif;
    font-size: $font-size-lg;
    font-weight: 400;
    line-height: 1.1;
    color: $color-white;
  }

  &__block-title {
    font-weight: 700;
    margin-bottom: $spacing-xs;
    color: $color-white;
  }

  &__links {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  &__link {
    color: rgba(255, 255, 255, 0.75);
    text-decoration: none;
    font-size: $font-size-sm;
    transition: color 0.2s ease;

    &:hover {
      color: $color-white;
    }
  }

  &__bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    padding: $spacing-xs $boxed;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-sm;
    flex-wrap: wrap;

    @media (max-width: $bp-mobile) {
      flex-direction: column;
      gap: $spacing-xs;
      text-align: center;
    }
  }

  &__copyright {
    font-size: $font-size-xs;
    color: rgba(255, 255, 255, 0.6);
  }

  &__legal {
    list-style: none;
    display: flex;
    gap: $spacing-xs;
    align-items: center;

    li::before {
      content: "·";
      margin-right: $spacing-xs;
      color: rgba(255, 255, 255, 0.4);
    }

    @media (max-width: $bp-mobile) {
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;

      li::before {
        display: none;
      }
    }
  }

  &__cookies-btn {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    font-family: $font-sans;
  }

  &__legal-link {
    font-size: $font-size-xs;
    color: rgba(255, 255, 255, 0.6);
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color 0.2s ease;

    &:hover {
      color: $color-white;
    }
  }
}
</style>
