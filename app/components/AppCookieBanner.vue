<script setup lang="ts">
const { hasDecided, accept, refuse } = useCookieConsent();
</script>

<template>
  <Transition name="cookie-banner">
    <div
      v-if="!hasDecided"
      class="cookie-banner"
      role="dialog"
      aria-label="Gestion des cookies"
    >
      <h3>Nous utilisons des cookies sur ce site</h3>
      <p class="cookie-banner__text">
        Ce site utilise des cookies pour améliorer votre expérience et assurer
        la sécurité du formulaire de contact (reCAPTCHA). Vous pouvez accepter
        ou refuser leur utilisation.
      </p>
      <p>
        Consultez notre
        <a href="/legal/politique-de-confidentialite"
          >politique de confidentialité</a
        >
      </p>
      <div class="cookie-banner__actions">
        <button
          class="cookie-banner__btn cookie-banner__btn--refuse"
          @click="refuse"
        >
          Refuser
        </button>
        <button
          class="cookie-banner__btn cookie-banner__btn--accept"
          @click="accept"
        >
          Accepter
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.cookie-banner {
  position: fixed;
  bottom: 1.5rem;
  left: 1.5rem;
  right: 1.5rem;
  z-index: 1000;
  max-width: 560px;
  background: $color-white;
  border: 1px solid $color-navy-light;
  box-shadow: $box-shadow;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (min-width: $bp-mobile) {
    right: auto;
  }

  &__actions {
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
  }

  &__btn {
    padding: 0.6rem 1.5rem;
    font-size: $font-size-xs;
    font-family: $font-sans;
    cursor: pointer;
    border: 1px solid $color-navy;
    transition:
      background-color 0.2s ease,
      color 0.2s ease;

    &--refuse {
      background: $color-white;
      color: $color-navy;

      &:hover {
        background: $color-navy-lighter;
      }
    }

    &--accept {
      background: $color-navy;
      color: $color-white;

      &:hover {
        background: $color-navy-dark;
      }
    }
  }
}

.cookie-banner-enter-active,
.cookie-banner-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.cookie-banner-enter-from,
.cookie-banner-leave-to {
  opacity: 0;
  transform: translateY(1rem);
}
</style>
