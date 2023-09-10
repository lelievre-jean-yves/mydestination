import './style.scss';
import AliceCarousel from 'react-alice-carousel';

const pictures = [
  'https://i.ibb.co/1ns01tN/bonhotel.jpg',
  'https://i.ibb.co/41brQxG/pexels-pixabay-261102-1.jpg',
  'https://i.ibb.co/9WWHKcJ/paysage.jpg',
  'https://i.ibb.co/xgtmcm3/travel1.jpg',
  'https://i.ibb.co/zf1XDZh/pexels-pixabay.jpg',
  'https://i.ibb.co/JWY2GFX/travel.jpg',
];

export function Slider() {
  const items = pictures.map((picture) => (
    <div className="picture" key={picture}>
      <img src={picture} alt="" />
    </div>
  ));

  return (
    <div className="slider">
      <AliceCarousel
        autoPlay={true}
        autoPlayInterval={4000}
        infinite={true}
        disableButtonsControls={true}
        disableDotsControls={true}
        items={items}
        animationType={'fadeout'}
      />
    </div>
  );
}
