import './bulma.min.css';
import { useState, useEffect } from 'react';
import { FaBook, FaSearch } from 'react-icons/fa';
import Search from '../Search/Search';
import Loading from '../Loading/Loading';
import ElementCard from '../ElementCard/ElementCard';
import CardContainer from '../CardContainer/CardContainer';

const useMangas = (query) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const abortController = new AbortController();
    if (query === '') return;
    const fetchMangas = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.jikan.moe/v3/search/manga?q=${encodeURI(
            query
          )}&order_by=members&sort=desc&genre=9,12&genre_exclude=1,1&limit=20`,
          { signal: abortController.signal }
        );
        const json = await res.json();
        setResults(await json.results);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMangas();
    return () => {
      abortController.abort();
      setLoading(false);
    };
  }, [query]);
  return [results, loading, error];
};

function App() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [results, loading, error] = useMangas(query);

  return (
    <div className="App">
      <div className="container">
        <div className="m-3">
          <div className="box">
            <div className="block mb-4">
              <Search
                inputPlaceholder="Pesquise um mangá"
                iconLeft={FaBook()}
                iconButton={FaSearch()}
                onSubmit={(e) => {
                  e.preventDefault();
                  setQuery(search);
                  setSearch('');
                }}
                inputValue={search}
                inputOnChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {results && results.length === 0 && !loading ? (
              <div className="has-text-centered	">
                <p className="m-0 is-italic is-size-6 has-text-weight-light">
                  Os resultados da sua pesquisa aparecerão aqui
                </p>
              </div>
            ) : (
              ''
            )}
            {loading && <Loading />}
            <CardContainer>
              {results &&
                results.map((manga) => {
                  return (
                    <ElementCard
                      content={manga.title}
                      src={manga.image_url}
                      alt={manga.title}
                      key={manga.mal_id}
                      badges={[
                        `Nota: ${manga.score === 0 ? 'n/a' : manga.score}`,
                        `Ano: ${new Date(manga.start_date).getFullYear()}`,
                        `Membros: ${manga.members.toLocaleString('pt-BR')}`,
                      ]}
                    />
                  );
                })}
            </CardContainer>
          </div>
          <div className="box"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
