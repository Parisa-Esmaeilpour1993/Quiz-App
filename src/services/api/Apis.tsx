import { BASE_URL, BASE_URL_CATEGORY } from "../constants/Constants";

export async function getData(
  count: number,
  category: string,
  difficulty: string
) {
  const data = await fetch(
    `${BASE_URL}?amount=${count}&category=${category}&difficulty=${difficulty}`
  );
  const res = await data.json();
  return res.result;
}

export async function getCategory() {
  const data = await fetch(`${BASE_URL_CATEGORY}`);
  const res = await data.json();
  return res.trivia_categories;
}
