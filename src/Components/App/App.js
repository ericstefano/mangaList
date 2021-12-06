import './bulma.min.css';
import { useState, useRef } from 'react';
import { useMangas } from '../../Hooks';
import { FaBook, FaSearch } from 'react-icons/fa';
import { Box, Block, Container } from '../Bulma';
import { fetchPostJsonServer } from '../../Utils/API';
import Search from '../Search';
import Loading from '../Loading';
import Card from '../Card';
import CardGrid from '../CardGrid';
import Message from '../Message';

function App() {
  const [query, setQuery] = useState('');
  const [results, loading, error, setResults] = useMangas(query);
  const inputRef = useRef(null);

  const addToList = async (e) => {
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
      <Container>
        <div className="m-3">
          <Box>
            <Block variants="mb-4">
              <Search
                inputPlaceholder="Pesquise um mangá"
                iconLeft={FaBook()}
                iconButton={FaSearch()}
                inputRef={inputRef}
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const pesquisa = formData.get('pesquisa');
                  if (pesquisa === '') return;
                  setQuery(formData.get('pesquisa'));
                  inputRef.current.value = '';
                }}
              />
            </Block>
            {results && results.length === 0 && !loading && (
              <div className="has-text-centered">{handleMessage()}</div>
            )}
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
        </div>
      </Container>
    </div>
  );
}

export default App;
