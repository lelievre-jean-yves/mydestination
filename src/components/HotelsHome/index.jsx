import { Button } from '@mui/material';
import { CardHotel } from '../CardHotel';
import './style.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { resetNewsLetter } from '../../reducers/newsletter';

export function HotelsHome({ hotels }) {
  const dispatch = useDispatch();

  let hotelsForHome = [];

  for (let i = 0; i < 4; i++) {
    hotelsForHome.push(hotels[i]);
  }

  return (
    <div className="hotelsHome">
      <h1 className="title">Hôtels</h1>
      <div className="hotels">
        {hotelsForHome.map((hotel) => (
          <CardHotel key={hotel.id} {...hotel} />
        ))}
      </div>
      <Link
        to="/hotels"
        className="btn-voirPlus"
        onClick={() => {
          dispatch(resetNewsLetter());
        }}
      >
        <Button color="secondary">Voir plus d'hôtel</Button>
      </Link>
    </div>
  );
}

HotelsHome.propTypes = {
  hotels: PropTypes.array.isRequired,
};
