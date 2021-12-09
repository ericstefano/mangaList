import './bulma.min.css';
import { useState, useRef, useEffect } from 'react';
import { useJikan, useGetServer } from '../../Hooks';
import { FaBook, FaPlus, FaTimes } from 'react-icons/fa';
import { Box, Block, Container, Button } from '../Bulma';
import { fetchPostJsonServer, fetchDeleteJsonServer } from '../../Utils/API';
import { SearchContext } from '../../Contexts/SearchContext';
import Search from '../Search';
import Loading from '../Loading';
import Card from '../Card';
import CardGrid from '../CardGrid';
import Message from '../Message';
import LayoutGrid from '../LayoutGrid';
import Title from '../Title';

function App() {
  const [query, setQuery] = useState('');
  const [results, loading, error, setResults] = useJikan(query);
  const inputRef = useRef(null);
  const [currentAdd, setCurrentAdd] = useState(null);
  const [myList, setMyList] = useGetServer();

  const add = (e) => {
    setCurrentAdd(e);
  };

  useEffect(() => {
    if (currentAdd !== null) {
      (async () => {
        try {
          const favorite = {
            mal_id: currentAdd.mal_id,
            image_url: currentAdd.image_url,
            title: currentAdd.title,
            score: currentAdd.score,
            start_date: currentAdd.start_date,
            members: currentAdd.members,
          };
          fetchPostJsonServer(favorite);
          setResults((previous) => {
            return previous.filter((manga) => {
              return manga.mal_id !== favorite.mal_id;
            });
          });
          setMyList((previous) => [...previous, favorite]);
        } catch (e) {}
      })();
    }
  }, [currentAdd, setResults, setMyList]);

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
      <Title>Mangáリスト</Title>
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
            {results.length !== 0 && (
              <div className="is-flex is-justify-content-center">
                <Button
                  content="Limpar pesquisa"
                  variants="is-danger is-small mb-4"
                  onClick={() => setResults([])}
                />
              </div>
            )}
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
                      buttonOnClick={() => add(manga)}
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
