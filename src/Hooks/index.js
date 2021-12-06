import { useState, useEffect } from 'react';
import { fetchGetJsonServer, fetchJikanApi } from '../Utils/API';
const useMangas = (query = '') => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  useEffect(() => {
    if (query === '') return;
    const abortController = new AbortController();

    (async () => {
      try {
        setLoading(true);
        const resultsJikan = await fetchJikanApi(query, abortController);
        try {
          const resultsServer = await fetchGetJsonServer();
          const final = await resultsJikan.filter(
            (manga) =>
              !resultsServer.find(({ mal_id }) => manga.mal_id === mal_id)
          );
          setResults(final);
        } catch (e) {
          setResults(resultsJikan);
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      abortController.abort();
      setResults([]);
      setLoading(false);
    };
  }, [query]);
  return [results, loading, error, setResults];
};

export { useMangas };
