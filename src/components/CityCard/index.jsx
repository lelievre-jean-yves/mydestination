import './style.scss';
import PropTypes from 'prop-types';


export function CityCard({ picture, name }) {
  return (
    <div className="cityCard">
      <img className="picture" src={picture} alt={picture} />
      <h3 className="name">{name}</h3>
    </div>
  );
}


CityCard.propTypes = {
  picture: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

