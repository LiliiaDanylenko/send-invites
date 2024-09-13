import { API_URL } from "./constants";

export function getUsers() {
  return fetch(API_URL)
    .then(res => res.json())
    .catch(() => ({
      response: 'False',
      error: 'Unexpected error',
    }));
}