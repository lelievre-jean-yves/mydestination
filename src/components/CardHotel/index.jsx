import { Button } from '@mui/material';
import './style.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { resetNewsLetter } from '../../reducers/newsletter';
import { useDispatch } from 'react-redux';
import StarIcon from '@mui/icons-material/Star';

export function CardHotel({ picture, name, slug, ranking }) {
  const dispatch = useDispatch();
  const stars = [];
  for (let i = 0; i < ranking; i++) {
    stars.push(<StarIcon className="ranking" key={i} />);
  }
  return (
    <div className="cardHotel">
      <div className="container-picture">
        <img className="picture" src={picture} alt={name} />
      </div>

      <div className="container-name_btn">
        {stars}
        <h2 className="name">{name}</h2>
        <Link
          to={`/hotels/${slug}`}
          onClick={() => {
            dispatch(resetNewsLetter());
          }}
        >
          <Button variant="contained" color="secondary" className="btn-hotel">
            Voir l'hotel
          </Button>
        </Link>
      </div>
    </div>
  );
}

CardHotel.propTypes = {
  picture: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};
