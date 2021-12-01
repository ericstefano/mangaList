import { useState, useEffect } from 'react';

const useMangas = (query) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  useEffect(() => {
    if (query === '') return;
    const abortController = new AbortController();
    const fetchMangas = async () => {
      try {
        setLoading(true);
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
        setResults(await json.results);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMangas();

    return () => {
      abortController.abort();
      setResults([]);
      setLoading(false);
    };
  }, [query]);
  return [results, loading, error];
};

export default useMangas;
