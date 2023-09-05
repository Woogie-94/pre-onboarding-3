import { QueryKey, QueryOptions } from "./queryType";

class Query<TData = unknown> {
  key: QueryKey;
  data: TData;
  error: unknown;
  options: QueryOptions | undefined;

  constructor(config: { key: QueryKey; data: TData; error?: unknown; options?: QueryOptions }) {
    this.key = config.key;
    this.data = config.data;
    this.error = config.error;
    this.options = this.convertCacheTimeToDate(config.options);
  }

  setData(data: TData) {
    this.data = data;
  }

  setError(error: unknown) {
    this.error = error;
  }

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
}

export default Query;
