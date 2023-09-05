import QUERY_KEY from "./queryKeys";
import useQuery from "../hooks/useQuery";
import { getSearchResult } from "../services/search";

const fetch = async (value: string) => {
  const { data } = await getSearchResult(value);
  return data;
};

const useSearchQuery = (value: string) => {
  return useQuery(QUERY_KEY.search(value), () => fetch(value), { enabled: true, cacheTime: 60 * 1000 * 10 });
};

export default useSearchQuery;
