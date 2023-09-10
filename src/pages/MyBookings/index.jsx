import { Typography } from '@mui/material';
import CardHotelReserved from '../../components/CardHotelReserved';
import './style.scss';
import { scrollToTop } from '../../utils/functions';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { resetFormReservation } from '../../reducers/hotelDetail';
import { useFetchOrUpdateHotels } from '../../utils/hooks';

export function MyBookings() {
  useFetchOrUpdateHotels();

  scrollToTop();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetFormReservation());
  }, []);

  const reservations = useSelector(
    (state) => state.hotelDetail.reservation.data
  );
  const firstName = useSelector((state) => state.login.user.data?.firstname);
  const lastName = useSelector((state) => state.login.user.data?.lastname);
  const userId = useSelector((state) => state.login.user.data?.id);


  const currentReservations = reservations?.filter(
    (reservation) => userId == reservation.userName
  );

  console.log(currentReservations);

  const isLoggedUser = useSelector((state) => state.login.user.isLogged);

  if (!isLoggedUser) {
    return <Navigate to="/connexion" replace />;
  }

  return (
    <div className="myBookings">
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Mes réservations
      </Typography>
      {currentReservations.length === 0 ? (
        <div className='noReservation'>Pas de réservations pour le moment</div>
      ) : (
        <div className="container-myBookings">
          {currentReservations.map((reservation) => (
            <CardHotelReserved key={reservation.id} {...reservation} />
          ))}
        </div>
      )}
    </div>
  );
}
