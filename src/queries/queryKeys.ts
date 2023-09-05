const QUERY_KEY_SEARCH_PREFIX = ["search"];

const QUERY_KEY = {
  search: (sickName: string) => [...QUERY_KEY_SEARCH_PREFIX, sickName],
};

export default QUERY_KEY;
