export const useFooter = () => {
  const { client } = usePrismic();
  return useAsyncData("footer", () => client.getSingle("footer"));
};
