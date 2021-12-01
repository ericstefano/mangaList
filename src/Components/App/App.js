import './bulma.min.css';
import { useState } from 'react';
import useMangas from '../../Hooks/useMangas';
import { FaBook, FaSearch } from 'react-icons/fa';
import Search from '../Search/Search';
import Loading from '../Loading/Loading';
import ElementCard from '../ElementCard/ElementCard';
import CardContainer from '../CardContainer/CardContainer';
import MessageParagraph from '../MessageParagraph/MessageParagraph';

function App() {
  const [query, setQuery] = useState('');
  const [results, loading, error] = useMangas(query);

  const message = () => {
    if (error === undefined) {
      return (
        <MessageParagraph
          value={'Os resultados da sua pesquisa aparecerão aqui'}
        />
      );
    } else if (error === '404') {
      return (
        <MessageParagraph
          value={`Nenhum resultado encontrado para "${query}"`}
        />
      );
    } else {
      return (
        <MessageParagraph
          value={
            'Erro na pesquisa! Por favor, verifique sua conexão e tente novamente.'
          }
        />
      );
    }
  };

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
                  const formData = new FormData(e.target);
                  const pesquisa = formData.get('pesquisa');
                  if (pesquisa === '') return;
                  setQuery(formData.get('pesquisa'));
                }}
              />
            </div>
            {results && results.length === 0 && !loading && (
              <div className="has-text-centered	">{message()}</div>
            )}
            {loading && <Loading />}
            <CardContainer>
              {results &&
                results.length > 0 &&
                results.map((manga) => {
                  return (
                    <ElementCard
                      content={manga.title}
                      src={manga.image_url}
                      alt={manga.title}
                      key={manga.mal_id}
                      badges={{
                        score: manga.score,
                        start_date: manga.start_date,
                        members: manga.members,
                      }}
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
