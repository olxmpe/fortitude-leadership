import * as prismic from "@prismicio/client";
import { repositoryName } from "../../slicemachine.config.json";

const siteUrl = "https://www.fortitude-leadership.com";

export default defineEventHandler(async (event) => {
  const client = prismic.createClient(repositoryName);

  const articles = await client.getAllByType("blog_article", {
    orderings: [{ field: "document.last_publication_date", direction: "desc" }],
    pageSize: 50,
  });

  const items = articles
    .map((article) => {
      const title = escapeXml(article.data.title ?? "Sans titre");
      const link = `${siteUrl}/blog/${article.uid}`;
      const pubDate = new Date(article.first_publication_date).toUTCString();
      const image = article.data.image?.url;

      return `
    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      ${image ? `<enclosure url="${escapeXml(image)}" type="image/jpeg" />` : ""}
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Fortitude Leadership — Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Articles sur le leadership, le développement personnel et la performance collective.</description>
    <language>fr</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  setHeader(event, "Content-Type", "application/rss+xml; charset=utf-8");
  setHeader(event, "Cache-Control", "max-age=3600");
  return xml;
});

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
