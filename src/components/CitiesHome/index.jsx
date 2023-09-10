import AliceCarousel from 'react-alice-carousel';
import { CityCard } from '../CityCard';
import './style.scss';

const cities = [
  {
    picture: 'https://i.ibb.co/j3XrXJm/New-york.jpg',
    name: 'New York',
  },
  {
    picture: 'https://i.ibb.co/F0wQjsQ/buenos-aires.jpg',
    name: 'Buenos Aires',
  },
  {
    picture: 'https://i.ibb.co/28yR11q/paris.jpg',
    name: ' Paris ',
  },
  {
    picture: 'https://i.ibb.co/s6ykjjv/barcelone.jpg',
    name: 'Barcelone',
  },
];

export function CitiesHome() {
  const citiesElement = cities.map((city) => (
    <CityCard key={city.name} picture={city.picture} name={city.name} />
  ));

  const responsive = {
    0: { items: 1 },
    800: { items: 4 },
  };

  return (
    <div className="citiesHome">
      <h3 className="title">
        Explorez le monde
      </h3>
      <div className="cities">
        <AliceCarousel
          mouseTracking={false}
          items={citiesElement}
          paddingLeft={10}
          paddingRight={50}
          responsive={responsive}
          disableButtonsControls={true}
          // touchTracking={false}
        />
      </div>
    </div>
  );
}
