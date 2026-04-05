export const useLatestArticles = (limit = 3) => {
  const { client } = usePrismic();
  return useAsyncData("latest-articles", () =>
    client.getAllByType("blog_article", {
      orderings: [{ field: "document.last_publication_date", direction: "desc" }],
      limit,
    }),
  );
};
