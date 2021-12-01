import './ElementCard.css';
import useToggle from '../../Hooks/useToggle';
import { FaPlus } from 'react-icons/fa';
import Badge from '../Badge/Badge';
import Button from '../Button/Button';

const ElementCard = ({ content, src, alt, badges }) => {
  const [isHovering, setHovering] = useToggle();

  const renderBadges = () => {
    return (
      <div className="badges my-1">
        <Badge
          variants="is-info"
          content={`Nota: ${badges.score === 0 ? 'n/a' : badges.score}`}
        />
        <Badge
          variants="is-info"
          content={`Ano: ${new Date(badges.start_date).getFullYear()}`}
        />
        <Badge
          variants="is-info"
          content={`Membros: ${badges.members.toLocaleString('pt-BR')}`}
        />
      </div>
    );
  };

  const renderButton = () => {
    return (
      <div className="is-flex  mb-auto ml-auto">
        <Button variants="is-info p-3 is-size-6" content={FaPlus()} />
      </div>
    );
  };

  return (
    <div
      className="card-container"
      onMouseEnter={() => {
        setHovering();
      }}
      onMouseLeave={() => {
        setHovering();
      }}
    >
      <img src={src} className="img" alt={alt} />
      <div
        className={`content ${
          isHovering ? 'black-opacity' : 'black-gradient'
        }`.trimEnd()}
      >
        {isHovering && renderButton()}
        <div className="px-2 py-1">
          <p
            className={`has-text-weight-bold has-text-centered has-text-white mb-0 p-0 ${
              isHovering ? '' : 'truncate'
            }`}
          >
            {content}
          </p>
          {isHovering && renderBadges()}
        </div>
      </div>
    </div>
  );
};

export default ElementCard;
