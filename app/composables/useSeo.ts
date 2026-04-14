interface SeoOptions {
  title?: string | null;
  description?: string | null;
  image?: { url?: string | null } | null;
  type?: "website" | "article";
  fallbackTitle: string;
  publishedTime?: string | null;
  modifiedTime?: string | null;
  noindex?: boolean;
}

export const useSeo = ({
  title,
  description,
  image,
  type = "website",
  fallbackTitle,
  publishedTime,
  modifiedTime,
  noindex = false,
}: SeoOptions) => {
  const siteUrl = "https://www.fortitude-leadership.com";
  const route = useRoute();
  const canonical = `${siteUrl}${route.path}`;

  const siteName = "Fortitude Leadership";
  const baseTitle = title || fallbackTitle;
  const resolvedTitle = baseTitle.includes(siteName)
    ? baseTitle
    : `${siteName} | ${baseTitle}`;

  useSeoMeta({
    title: resolvedTitle,
    ogTitle: resolvedTitle,
    ogSiteName: "Fortitude Leadership",
    description: description || undefined,
    ogDescription: description || undefined,
    ogImage: image?.url ?? undefined,
    ogType: type,
    ogUrl: canonical,
    twitterCard: image?.url ? "summary_large_image" : "summary",
    twitterTitle: resolvedTitle,
    twitterDescription: description || undefined,
    twitterImage: image?.url ?? undefined,
    robots: noindex ? "noindex, follow" : undefined,
    articlePublishedTime:
      type === "article" ? (publishedTime ?? undefined) : undefined,
    articleModifiedTime:
      type === "article" ? (modifiedTime ?? undefined) : undefined,
  });

  useHead({
    link: [{ rel: "canonical", href: canonical }],
  });
};
