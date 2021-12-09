import { useState, useEffect } from 'react';
import { fetchGetJsonServer, fetchJikanApi } from '../Utils/API';

const useJikan = (query = '') => {
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
        } catch (e) {}
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
      setError(undefined);
    };
  }, [query]);
  return [results, loading, error, setResults];
};

const useGetServer = () => {
  const [mangas, setMangas] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetchGetJsonServer();
        setMangas(res);
      } catch (e) {}
    })();

    return () => {
      setMangas([]);
    };
  }, []);
  return [mangas, setMangas];
};

export { useJikan, useGetServer };
