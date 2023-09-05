import axios from "axios";

export interface Sick {
  sickCd: string;
  sickNm: string;
}

export const getSearchResult = (value: string) => {
  console.info("calling api");
  return axios.get<Sick[]>("http://localhost:4000/sick", { params: { q: value } });
};
