import axios from "axios";

interface Sick {
  sickCd: string;
  sickNm: string;
}

export const getSearchResult = (value: string) => {
  return axios.get<Sick[]>("http://localhost:4000/sick", { params: { q: value } });
};
