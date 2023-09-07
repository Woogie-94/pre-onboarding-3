import axios from "axios";

export interface Sick {
  sickCd: string;
  sickNm: string;
}

export const getSearchResult = (value: string) => {
  console.info("calling api");
  return axios.get<Sick[]>("https://assignment-api-bay.vercel.app/sick", { params: { q: value } });
};
