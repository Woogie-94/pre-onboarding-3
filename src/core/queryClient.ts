import Query from "./query";
import { QueryFn, QueryKey, QueryOptions } from "./queryType";

class QueryClient {
  states: Query[];
  listeners: Set<() => void>;

  constructor() {
    this.states = [];
    this.listeners = new Set();
  }

  getQueryData<TData = unknown>(key: QueryKey) {
    return this.find<TData>(key);
  }

  setQueryData<TData = unknown>(key: QueryKey, data: TData, options?: QueryOptions) {
    if (!this.isStateEmpty) {
      this.states = [
        ...this.states.map(state => {
          if (state.key === key) {
            state.setData(data);
          }

          return state;
        }),
        new Query({ key, data, options }),
      ];
    } else {
      this.states = [new Query({ key, data, options })];
    }
  }

  updateQuerys() {
    this.states = this.states.filter(state => !state.isExpiredQuery);
  }

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

  async fetch<TData = unknown>(key: QueryKey, queryFn: QueryFn<TData>, options?: QueryOptions) {
    this.updateQuerys();
    if (this.find(key)) {
      return;
    }

    try {
      const result = await queryFn();
      this.setQueryData(key, result, options);
    } catch (error) {
      if (!this.isStateEmpty) {
        this.states = this.states.map(state => {
          if (state.key === key) {
            state.setError(error);
          }
          return state;
        });
      } else {
        this.states = [new Query({ key, data: undefined, error })];
      }
    }

    this.listeners.forEach(listener => listener());
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  get isStateEmpty() {
    return this.states.length === 0;
  }
}

export default QueryClient;
