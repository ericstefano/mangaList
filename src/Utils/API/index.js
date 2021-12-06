const fetchGetJsonServer = async () => {
  const res = await fetch('http://localhost:8000/favorites/');
  if (!res.ok) {
    throw new Error(res.status);
  }
  return await res.json();
};

const fetchPostJsonServer = async (body) => {
  const res = await fetch('http://localhost:8000/favorites/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(res.status);
  }
};

const fetchJikanApi = async (query, abortController) => {
  const res = await fetch(
    `https://api.jikan.moe/v3/search/manga?q=${encodeURI(
      query
    )}&order_by=members&sort=desc&genre=9,12&genre_exclude=1,1&limit=20`,
    { signal: abortController.signal }
  );
  if (!res.ok) {
    throw new Error(res.status);
  }
  const json = await res.json();
  return await json.results;
};

export { fetchGetJsonServer, fetchPostJsonServer, fetchJikanApi };
