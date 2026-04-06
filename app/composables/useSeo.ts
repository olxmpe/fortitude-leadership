interface SeoOptions {
  title?: string | null;
  description?: string | null;
  image?: { url?: string | null } | null;
  type?: "website" | "article";
  fallbackTitle: string;
}

export const useSeo = ({ title, description, image, type = "website", fallbackTitle }: SeoOptions) => {
  const siteUrl = "https://www.fortitude-leadership.com";
  const route = useRoute();
  const canonical = `${siteUrl}${route.path}`;

  const resolvedTitle = title || fallbackTitle;

  useSeoMeta({
    title: resolvedTitle,
    ogTitle: resolvedTitle,
    description: description || undefined,
    ogDescription: description || undefined,
    ogImage: image?.url ?? undefined,
    ogType: type,
    ogUrl: canonical,
    twitterCard: image?.url ? "summary_large_image" : "summary",
    twitterTitle: resolvedTitle,
    twitterDescription: description || undefined,
    twitterImage: image?.url ?? undefined,
  });

  useHead({
    link: [{ rel: "canonical", href: canonical }],
  });
};
