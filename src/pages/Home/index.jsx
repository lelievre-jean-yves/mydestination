import React, { useEffect } from 'react';
// import Slider from 'react-slick';
import 'react-alice-carousel/lib/scss/alice-carousel.scss';
import './style.scss';
import { HotelsHome } from '../../components/HotelsHome';
import { CitiesHome } from '../../components/CitiesHome';
import { Slider } from '../../components/Slider';
import { scrollToTop } from '../../utils/functions';
import { HomeDescription } from '../../components/HomeDescription';
import { useDispatch, useSelector } from 'react-redux';
import { resetFormReservation } from '../../reducers/hotelDetail';
import { useFetchOrUpdateHotels } from '../../utils/hooks';

const pictures = [
  'https://i.ibb.co/1ns01tN/bonhotel.jpg',
  'https://i.ibb.co/zf1XDZh/pexels-pixabay.jpg',
  'https://i.ibb.co/41brQxG/pexels-pixabay-261102-1.jpg',
  'https://i.ibb.co/9WWHKcJ/paysage.jpg',
];

export function Home() {
  useFetchOrUpdateHotels();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetFormReservation());
  }, []);

  const hotels = useSelector((state) => state.hotels.data);

  scrollToTop();


  return (
    <div className="home">
      <HomeDescription />
      <Slider />

      <main className="main">
        <HotelsHome hotels={hotels} />
        <CitiesHome />
      </main>
    </div>
  );
}
