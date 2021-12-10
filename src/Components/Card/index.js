import './style.css';
import { useState } from 'react';
import { Badge } from '../Bulma';
import { Button } from '../Bulma';

const Card = ({
  content,
  src,
  variants = 'is-info',
  buttonIcon,
  alt,
  badges,
  buttonOnClick,
}) => {
  const [isHovering, setHovering] = useState(false);

  const renderBadges = () => {
    return (
      <div className="badges my-1">
        <Badge
          variants={variants}
          content={`Nota: ${badges.score === 0 ? 'n/a' : badges.score}`}
        />
        <Badge
          variants={variants}
          content={`Ano: ${new Date(badges.start_date).getFullYear()}`}
        />
        <Badge
          variants={variants}
          content={`Membros: ${badges.members.toLocaleString('pt-BR')}`}
        />
      </div>
    );
  };

  const renderButton = () => {
    return (
      <div className="is-flex mb-auto ml-auto">
        <Button
          variants={`p-3 is-size-6 no-border-radius ${variants}`}
          content={buttonIcon}
          onClick={buttonOnClick}
        />
      </div>
    );
  };

  return (
    <div
      className="card-container"
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
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

export default Card;
