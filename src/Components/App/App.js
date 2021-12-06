import './bulma.min.css';
import { useState, useRef, useEffect } from 'react';
import { useJikan } from '../../Hooks';
import { FaBook, FaPlus, FaTimes } from 'react-icons/fa';
import { Box, Block, Container } from '../Bulma';
import {
  fetchPostJsonServer,
  fetchGetJsonServer,
  fetchDeleteJsonServer,
} from '../../Utils/API';
import { SearchContext } from '../../Contexts/SearchContext';
import Search from '../Search';
import Loading from '../Loading';
import Card from '../Card';
import CardGrid from '../CardGrid';
import Message from '../Message';
import { LayoutGrid } from '../LayoutGrid';

function App() {
  const [query, setQuery] = useState('');
  const [results, loading, error, setResults] = useJikan(query);
  const inputRef = useRef(null);
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchGetJsonServer();
        setMyList(res);
      } catch (e) {}
    })();

    return () => {
      setMyList([]);
    };
  }, [results]);

  const addToList = (e) => {
    setResults(
      results.filter((manga) => {
        return manga.mal_id !== e.mal_id;
      })
    );

    const favorite = {
      mal_id: e.mal_id,
      image_url: e.image_url,
      title: e.title,
      score: e.score,
      start_date: e.start_date,
      members: e.members,
    };

    try {
      fetchPostJsonServer(favorite);
    } catch (e) {}
  };

  const removeFromList = (e) => {
    setMyList(
      myList.filter((manga) => {
        return manga.mal_id !== e.mal_id;
      })
    );
    fetchDeleteJsonServer(e);
  };

  const handleMessage = () => {
    if (error === undefined) {
      return (
        <Message message={'Os resultados da sua pesquisa aparecerão aqui'} />
      );
    } else if (error === '404') {
      return (
        <Message message={`Nenhum resultado encontrado para "${query}"`} />
      );
    } else {
      return (
        <Message
          message={
            'Erro na pesquisa! Por favor verifique sua conexão e tente novamente.'
          }
        />
      );
    }
  };

  return (
    <div className="App">
      <h1 className="is-size-1 has-text-centered has-text-weight-bold mt-4">
        Mangáリスト
      </h1>
      <p className="has-text-centered is-size-5 px-3">
        Pesquise um mangá e clique no botão para salvar na sua lista.
      </p>
      <Container>
        <LayoutGrid>
          <Box variants="m-3">
            <Block variants="mb-4">
              <SearchContext.Provider value={{ inputRef, setQuery }}>
                <Search
                  inputPlaceholder="Pesquise um mangá"
                  iconLeft={FaBook()}
                />
              </SearchContext.Provider>
            </Block>
            {results && results.length === 0 && !loading && handleMessage()}
            {loading && <Loading />}
            <CardGrid>
              {results &&
                results.length > 0 &&
                results.map((manga) => {
                  return (
                    <Card
                      content={manga.title}
                      src={manga.image_url}
                      alt={manga.title}
                      key={manga.mal_id}
                      buttonIcon={FaPlus()}
                      badges={{
                        score: manga.score,
                        start_date: manga.start_date,
                        members: manga.members,
                      }}
                      buttonOnClick={() => addToList(manga)}
                    />
                  );
                })}
            </CardGrid>
          </Box>
          <Box variants="m-3 p-0">
            <h2
              className="is-size-5 has-text-centered has-text-grey py-2"
              style={{
                borderBottom: '0.5px solid #dbdbdb',
              }}
            >
              Minha Lista de Mangás
            </h2>
            {myList && myList.length === 0 && (
              <Message
                message={'Os seus mangás favoritos ficarão aqui'}
                variants="p-125"
              />
            )}
            {myList && myList.length > 0 && (
              <CardGrid variants="p-125">
                {myList.map((manga) => {
                  return (
                    <Card
                      content={manga.title}
                      src={manga.image_url}
                      alt={manga.title}
                      key={manga.mal_id}
                      buttonIcon={FaTimes()}
                      variants={'is-danger'}
                      badges={{
                        score: manga.score,
                        start_date: manga.start_date,
                        members: manga.members,
                      }}
                      buttonOnClick={() => removeFromList(manga)}
                    />
                  );
                })}
              </CardGrid>
            )}
          </Box>
        </LayoutGrid>
      </Container>
    </div>
  );
}

export default App;
