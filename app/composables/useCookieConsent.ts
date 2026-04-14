export type CookieConsentValue = "accepted" | "refused" | null;

export const useCookieConsent = () => {
  const consent = useCookie<CookieConsentValue>("cookie-consent", {
    maxAge: 60 * 60 * 24 * 395, // 13 months (CNIL maximum)
    sameSite: "lax",
    default: () => null,
  });

  const hasDecided = computed(() => consent.value !== null);
  const isAccepted = computed(() => consent.value === "accepted");

  function accept() {
    consent.value = "accepted";
  }

  function refuse() {
    consent.value = "refused";
  }

  function reset() {
    consent.value = null;
  }

  return { hasDecided, isAccepted, accept, refuse, reset };
};
