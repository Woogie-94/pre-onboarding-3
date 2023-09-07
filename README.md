## 배포 사이트

[배포 사이트](http://pre-onboarding-solo-3.s3-website.ap-northeast-2.amazonaws.com/)

## 프로젝트 실행 방법

```
npm install && npm run dev
```

## 기술 구현

### 로컬 캐싱 구현과 expire time 구현

외부 스토어인 QueryClient를 구현하여 로컬 캐싱을 하고 있습니다. QueryClient는 fetch해온 데이터 및 key, option등 각종 상태들을 포함해 Query로 만들어 QueryClient에 저장합니다.
QueryClient는 리액트와 무관한 외부 스토어이기 때문에 useQuery에서 useSyncExternalStore을 이용해 QueryClient와 동기화 시켜 React가 QueryClient의 Query들을 observing할 수 있게 구현했습니다.

```ts
const useQuery = <TData = unknown>(key: QueryKey, queryFn: QueryFn<TData>, options?: QueryOptions) => {
  const store = useSyncExternalStore(
    useCallback(onStoreChange => queryClient.subscribe(onStoreChange), []),
    useCallback(() => queryClient.getQueryData<TData>(key), [key]),
  );

  // ...
};
```

QueryClient가 캐싱 여부를 판단할 땐 query key를 이용합니다. useQuery를 통해 fetch를 시도하면 지정한 query key가 QueryClient에 존재하는지 검사하며 이미 존재하는 key일 경우 캐싱되어 있는 데이터를 활용하도록합니다.

```ts
// queryClient.ts
find<TData = unknown>(key: QueryKey): Query<TData> | undefined {
    if (typeof key === "object") {
      return this.states.find(state => {
        if (typeof state.key === "object") {
          return state.key.every(item => key.find(k => item === k));
        }
        return false;
      }) as Query<TData>;
    } else {
      return this.states.find(state => state.key === key) as Query<TData>;
    }
}
```

useQuery의 option 중 cacheTime을 통해 캐시 주기를 정해줄 수 있습니다. Query를 생성하면 convertCacheTimeToDate를 통해 캐싱된 시점을 기록하고 fetch 시점마다 모든 Query의 cacheTime을 현재 시간과 비교해 expried된 Query를 만료시켜 캐싱에 제외시킵니다.

```ts
convertCacheTimeToDate(options?: QueryOptions) {
    if (options?.cacheTime) {
      return { ...options, cacheTime: new Date().getTime() + options.cacheTime };
    }
    return options;
}

get isExpiredQuery() {
    if (this.options?.cacheTime) {
      return this.options?.cacheTime < new Date().getTime();
    }
    return false;
}
```

이렇게 만든 Query, QueryClient, useQuery는 아래와 같이 사용됩니다.

```ts
const useSearchQuery = (value: string) => {
  return useQuery(QUERY_KEY.search(value), () => fetch(value), { enabled: true, cacheTime: 60 * 1000 * 10 });
};
```

### 디바운싱

```ts
// useDebounce.ts
const useDebounce = () => {
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const debounce = useCallback((callback: () => void, delay: number) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    const timeout = setTimeout(() => {
      callback();
    }, delay);

    timer.current = timeout;
  }, []);

  return debounce;
};

// 사용
debounce(refetch, 200);
```

API 호출을 최소화 하기 위해 useDebounce를 구현했습니다.

### 키보드 방향키로 추천 검색어 이동

검색창에서 방향키로 검색 결과를 선택할 수 있습니다. 선택한 검색 결과에서 엔터를 누르면 해당 결과의 상세 페이지로 이동할 수 있도록 구현했습니다.
