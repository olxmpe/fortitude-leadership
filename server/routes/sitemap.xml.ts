import * as prismic from "@prismicio/client";
import { repositoryName } from "../../slicemachine.config.json";

const siteUrl = "https://www.fortitude-leadership.com";

export default defineEventHandler(async (event) => {
  const client = prismic.createClient(repositoryName);

  const [articles, categories, legalPages, events] = await Promise.all([
    client.getAllByType("blog_article", {
      orderings: [{ field: "document.last_publication_date", direction: "desc" }],
    }),
    client.getAllByType("blog_category"),
    client.getAllByType("legal"),
    client.getAllByType("event").catch(() => []),
  ]);

  type UrlEntry = { loc: string; priority: string; changefreq: string; lastmod?: string };

  const staticUrls: UrlEntry[] = [
    { loc: siteUrl, priority: "1.0", changefreq: "weekly" },
    { loc: `${siteUrl}/about`, priority: "0.8", changefreq: "monthly" },
    { loc: `${siteUrl}/services`, priority: "0.8", changefreq: "monthly" },
    { loc: `${siteUrl}/blog`, priority: "0.9", changefreq: "weekly" },
    { loc: `${siteUrl}/contact`, priority: "0.7", changefreq: "monthly" },
  ];

  const articleUrls: UrlEntry[] = articles.map((a) => ({
    loc: `${siteUrl}/blog/${a.uid}`,
    priority: "0.7",
    changefreq: "monthly",
    lastmod: a.last_publication_date.split("T")[0],
  }));

  const legalUrls: UrlEntry[] = legalPages.map((p) => ({
    loc: `${siteUrl}/legal/${p.uid}`,
    priority: "0.3",
    changefreq: "yearly",
    lastmod: p.last_publication_date.split("T")[0],
  }));

  const eventUrls: UrlEntry[] = events.map((e) => ({
    loc: `${siteUrl}/event/${e.uid}`,
    priority: "0.6",
    changefreq: "weekly",
    lastmod: e.last_publication_date.split("T")[0],
  }));

  const allUrls = [...staticUrls, ...articleUrls, ...eventUrls, ...legalUrls];

  const items = allUrls
    .map(
      ({ loc, priority, changefreq, lastmod }) => `
  <url>
    <loc>${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}
  </url>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${items}
</urlset>`;

  setHeader(event, "Content-Type", "application/xml; charset=utf-8");
  setHeader(event, "Cache-Control", "max-age=3600");
  return xml;
});
