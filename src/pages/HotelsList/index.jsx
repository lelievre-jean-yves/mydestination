import { CardHotel } from '../../components/CardHotel';
import { scrollToTop } from '../../utils/functions';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import { resetFormReservation } from '../../reducers/hotelDetail';
import { useEffect } from 'react';
import { useFetchOrUpdateHotels } from '../../utils/hooks';

export function HotelsList() {
  useFetchOrUpdateHotels();
  scrollToTop();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetFormReservation());
  }, []);

  const hotels = useSelector((state) => state.hotels.data);

  return (
    <div className="hotelsList">
      <h1 className="title">Nos hôtels</h1>
      <div className="hotels">
        {hotels.map((hotel) => (
          <CardHotel key={hotel.id} {...hotel} />
        ))}
      </div>
    </div>
  );
}
