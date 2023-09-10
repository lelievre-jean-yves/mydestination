import { Navigate, useParams } from 'react-router-dom';
import { DescriptionHotel } from '../../components/DescriptionHotel';
import { Rooms } from '../../components/Rooms';
import { scrollToTop } from '../../utils/functions';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { resetFormReservation } from '../../reducers/hotelDetail';
import { useEffect } from 'react';
import { useFetchOrUpdateHotels } from '../../utils/hooks';

export function HotelDetail() {
  scrollToTop();
  useFetchOrUpdateHotels();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetFormReservation());
  }, []);

  const hotels = useSelector((state) => state.hotels.data);
 
  const { slug } = useParams();

  const hotel = hotels?.find((h) => h.slug === slug);

  const hotelIsUndefined = hotel === undefined;


  return (
    <>
      {hotelIsUndefined ? (
        <Navigate to="/error" replace />
      ) : (
        <>
          <main className="container-hotelDetail">
            <div className="hotelDetail">
              <DescriptionHotel {...hotel} />
              <Rooms {...hotel} />
            </div>
          </main>
        </>
      )}
    </>
  );
}
