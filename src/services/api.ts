import { ALBUMS_API_URL } from "../utils/constants";

export const fetchAlbumsData = (searchQuery: string) =>
  fetch(`${ALBUMS_API_URL}?q=${searchQuery}`)
