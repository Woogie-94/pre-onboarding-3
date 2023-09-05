export type QueryKey = string | readonly unknown[];
export type QueryFn<TData = unknown> = () => TData | Promise<TData>;
export interface QueryOptions {
  enabled?: boolean;
  cacheTime?: number;
}
