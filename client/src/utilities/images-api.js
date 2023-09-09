
export async function index(search) {
  const API_KEY = import.meta.env.VITE_UNSPLASH_API
  // const SEARCH_URL = `https://api.unsplash.com/search/photos?page=1&query=${search}`
  const SEARCH_URL = `https://api.unsplash.com/search/photos/?page=1&per_page=10&query=${search}&client_id=${API_KEY}`
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Client-ID ${API_KEY}` 
    },
  };
  const res = await fetch(SEARCH_URL, config);
  if (res.ok) {
    return res.json();
  } else {
    return new Error("Invalid Request");
  }
}