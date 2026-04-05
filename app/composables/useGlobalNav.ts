export const useGlobalNav = () => {
  const { client } = usePrismic();
  return useAsyncData("global_navigation", () =>
    client.getSingle("global_navigation"),
  );
};
