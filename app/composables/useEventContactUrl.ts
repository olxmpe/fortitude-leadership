import { asLink, isFilled } from "@prismicio/client";
import type { LinkField } from "@prismicio/client";

export function useEventContactUrl() {
  const route = useRoute();

  function resolveCtaHref(field: LinkField): string | null {
    if (!isFilled.link(field)) return null;
    const base = asLink(field) ?? "";
    if (!base.includes("/contact")) return base;

    const isOnEventsPage = route.path.startsWith("/evenements");
    if (!isOnEventsPage) return base;

    const uid = route.params.uid;
    const eventParam = uid && typeof uid === "string" ? uid : "D-Day";
    const sep = base.includes("?") ? "&" : "?";
    return `${base}${sep}event=${eventParam}`;
  }

  return { resolveCtaHref };
}
