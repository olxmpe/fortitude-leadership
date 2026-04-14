<script setup lang="ts">
import { components } from "~/slices";

const { client } = usePrismic();
const { data: page } = await useAsyncData("contact", () =>
  client.getSingle("contact"),
);

const { public: { recaptchaSiteKey } } = useRuntimeConfig();
const { isAccepted } = useCookieConsent();

watch(isAccepted, (accepted) => {
  if (accepted && recaptchaSiteKey) {
    useHead({
      script: [{ src: `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`, defer: true }],
    });
  }
}, { immediate: true });

useSeo({
  title: page.value?.data.meta_title,
  description: page.value?.data.meta_description,
  image: page.value?.data.meta_image,
  fallbackTitle: "Contact — Fortitude Leadership",
});

const form = reactive({
  lastName: "",
  firstName: "",
  email: "",
  phone: "",
  message: "",
  website: "", // honeypot — must stay empty
});

const errors = reactive({
  lastName: false,
  firstName: false,
  email: false,
  message: false,
});

const status = ref<"idle" | "loading" | "success" | "error">("idle");

function validate() {
  errors.lastName = !form.lastName.trim();
  errors.firstName = !form.firstName.trim();
  errors.email = !form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  errors.message = !form.message.trim();
  return !Object.values(errors).some(Boolean);
}

async function getRecaptchaToken(): Promise<string> {
  if (!recaptchaSiteKey) return "";
  return new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gr = (window as any).grecaptcha;
    if (!gr) return resolve("");
    gr.ready(async () => {
      const token: string = await gr.execute(recaptchaSiteKey, { action: "contact" });
      resolve(token);
    });
  });
}

async function submit() {
  if (!validate()) return;
  status.value = "loading";
  try {
    const recaptchaToken = await getRecaptchaToken();
    await $fetch("/api/contact", {
      method: "POST",
      body: { ...form, recaptchaToken },
    });
    status.value = "success";
  } catch {
    status.value = "error";
  }
}
</script>

<template>
  <main>
    <SliceZone
      v-if="page"
      :slices="page.data.slices ?? []"
      :components="components"
    />

    <section class="contact">
      <div class="contact__info">
        <p class="contact__brand">Fortitude Leadership</p>
        <div class="contact__details">
          <a
            v-if="page?.data.contact_email"
            :href="`mailto:${page.data.contact_email}`"
            class="contact__detail-link"
            >{{ page.data.contact_email }}</a
          >
          <a
            v-if="page?.data.contact_phone_number"
            :href="`tel:${page.data.contact_phone_number}`"
            class="contact__detail-link"
            >{{ page.data.contact_phone_number }}</a
          >
        </div>
      </div>

      <form
        v-if="status !== 'success'"
        class="contact__form"
        @submit.prevent="submit"
      >
        <input
          v-model="form.website"
          class="contact__honeypot"
          type="text"
          name="website"
          autocomplete="off"
          tabindex="-1"
          aria-hidden="true"
        />

        <div class="contact__row">
          <div
            class="contact__field"
            :class="{ 'contact__field--error': errors.lastName }"
          >
            <label class="contact__label"
              >Votre nom<span class="contact__required">*</span></label
            >
            <input
              v-model="form.lastName"
              class="contact__input"
              type="text"
              autocomplete="family-name"
            />
          </div>
          <div
            class="contact__field"
            :class="{ 'contact__field--error': errors.firstName }"
          >
            <label class="contact__label"
              >Votre prénom<span class="contact__required">*</span></label
            >
            <input
              v-model="form.firstName"
              class="contact__input"
              type="text"
              autocomplete="given-name"
            />
          </div>
        </div>

        <div
          class="contact__field"
          :class="{ 'contact__field--error': errors.email }"
        >
          <label class="contact__label"
            >Votre adresse email<span class="contact__required">*</span></label
          >
          <input
            v-model="form.email"
            class="contact__input"
            type="email"
            autocomplete="email"
          />
        </div>

        <div class="contact__field">
          <label class="contact__label">Votre numéro de téléphone</label>
          <input
            v-model="form.phone"
            class="contact__input"
            type="tel"
            autocomplete="tel"
          />
        </div>

        <div
          class="contact__field"
          :class="{ 'contact__field--error': errors.message }"
        >
          <label class="contact__label"
            >Votre message<span class="contact__required">*</span></label
          >
          <textarea v-model="form.message" class="contact__textarea" rows="7" />
        </div>

        <p v-if="status === 'error'" class="contact__error-msg">
          Une erreur est survenue, veuillez réessayer.
        </p>

        <div class="contact__submit-row">
          <button
            class="contact__submit btn"
            type="submit"
            :disabled="status === 'loading'"
          >
            {{ status === "loading" ? "Envoi en cours…" : "Envoyer" }}
          </button>
        </div>
      </form>

      <div v-else class="contact__success">
        <p>
          Votre message a bien été envoyé. Nous vous répondrons dans les plus
          brefs délais.
        </p>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
.contact {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: $spacing-lg;
  padding: $spacing-lg $boxed;
  align-items: start;

  @media (max-width: $bp-mobile) {
    grid-template-columns: 1fr;
    gap: $spacing-md;
  }

  &__brand {
    font-family: $font-serif;
    font-size: $font-size-lg;
    color: $color-navy;
    margin-bottom: $spacing-sm;
  }

  &__details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__detail-link {
    color: $color-navy;
    font-size: $font-size-sm;
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;
  }

  &__row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $spacing-xs;

    @media (max-width: $bp-mobile) {
      grid-template-columns: 1fr;
    }
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    &--error .contact__input,
    &--error .contact__textarea {
      border-color: #c0392b;
    }
  }

  &__label {
    font-size: $font-size-xs;
    font-weight: 600;
    color: $color-navy;
  }

  &__required {
    color: #c0392b;
    margin-left: 0.2rem;
  }

  &__input,
  &__textarea {
    border: 1px solid $color-navy-light;
    background: $color-white;
    padding: 0.75rem 1rem;
    font-family: $font-sans;
    font-size: $font-size-xs;
    color: $color-gray;
    width: 100%;
    outline: none;
    transition: border-color 0.2s ease;
    resize: none;

    &:focus {
      border-color: $color-navy;
    }
  }

  &__honeypot {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
  }

  &__submit-row {
    display: flex;
    justify-content: flex-end;
    margin-top: $spacing-xs;
  }

  &__submit {
    margin: 0;

    &:disabled {
      opacity: 0.6;
      cursor: default;
    }
  }

  &__error-msg {
    color: #c0392b;
    font-size: $font-size-xs;
  }

  &__success {
    padding: $spacing-sm;
    background: $color-navy-lighter;
    color: $color-navy;
    font-size: $font-size-sm;
    line-height: 1.6;
  }
}
</style>
