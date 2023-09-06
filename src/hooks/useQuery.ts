import { useCallback, useEffect, useSyncExternalStore } from "react";

import { queryClient } from "../App";
import { QueryFn, QueryKey, QueryOptions } from "../core/queryType";

const useQuery = <TData = unknown>(key: QueryKey, queryFn: QueryFn<TData>, options?: QueryOptions) => {
  const store = useSyncExternalStore(
    useCallback(onStoreChange => queryClient.subscribe(onStoreChange), []),
    useCallback(() => queryClient.getQueryData<TData>(key), [key]),
  );

  const refetch = useCallback(() => {
    queryClient.fetch(key, queryFn, options);
  }, [key, options, queryFn]);

  useEffect(() => {
    if (!options?.enabled) {
      queryClient.fetch(key, queryFn, options);
    }
  }, [key, options, queryFn]);

  return { data: store?.data, error: store?.error, refetch };
};

export default useQuery;
