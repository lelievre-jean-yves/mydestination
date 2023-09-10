import { Button } from '@mui/material';
import './style.scss';
import { Link } from 'react-router-dom';
import { resetFormReservation } from '../../reducers/hotelDetail';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useFetchOrUpdateHotels } from '../../utils/hooks';

export function Error404() {
  useFetchOrUpdateHotels();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetFormReservation());
  }, []);

  return (
    <div className="error404">
      <div className="e404">404</div>
      <p className="text">
        Il semble que la page que vous recherchez n'existe pas.
      </p>
      <Link to="/">
        <Button variant="contained" color="secondary" sx={{ mt: 5 }}>
          Retour à la page d'accueil
        </Button>
      </Link>
    </div>
  );
}
