import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import './style.scss';
import PropTypes from 'prop-types';

export function DescriptionHotel({ picture, name, adress, ranking }) {

  const stars = [];
  for (let i = 0; i < ranking; i++) {
    stars.push(<StarIcon className="ranking" key={i} />);
  }

  return (
    <div className="description-hotel">
      <div className="container-picture">
        <img className="picture" src={picture} alt={name} />
      </div>
      <div className="container-infos">
        <h1 className="name">{name}</h1>
        <span className="address">{adress}</span>
        <div>{stars}</div>
        <div className="services">
          <WifiIcon /> <LocalParkingIcon /> <AcUnitIcon /> <RestaurantIcon />
        </div>
      </div>
    </div>
  );
}

DescriptionHotel.propTypes = {
  picture: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  adress: PropTypes.string.isRequired,
  ranking: PropTypes.number.isRequired,
};
