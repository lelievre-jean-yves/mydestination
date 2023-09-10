import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from '@mui/material/Button';
import { Link, Navigate } from 'react-router-dom';

import './style.scss';
import { scrollToTop } from '../../utils/functions';
import { useDispatch, useSelector } from 'react-redux';
import { resetNewsLetter } from '../../reducers/newsletter';

export function ConfirmationReservation() {
  scrollToTop();
  const dispatch = useDispatch();

  const reservationIsConfirmed = useSelector(
    (state) => state.hotelDetail.reservation.isConfirmed
  );

  const numberReservation = useSelector(
    (state) => state.hotelDetail.reservation.number
  );

  const hotel = useSelector(
    (state) => state.hotelDetail.reservation.hotel
  );

 
  

  if (!reservationIsConfirmed) {
    return <Navigate to="/error" replace />;
  }

  return (
    <div className="container-confirmation">
      <div className="confirmation-reservation">
        <CheckCircleIcon color="success" />
        <p className="text">
          Merci d'avoir choisi {hotel}. Nous avons le
          plaisir de confirmer votre réservation.Votre numéro de confirmation
          est {numberReservation}. Nous nous réjouissons de vous accueillir à
          votre arrivée.
        </p>
        <Link
          to="/"
          onClick={() => {
            dispatch(resetNewsLetter());
          }}
        >
          <Button variant="contained" color="secondary" sx={{ mt: 5 }}>
            Retour à la page d'accueil
          </Button>
        </Link>
      </div>
    </div>
  );
}
