import React, { useState } from 'react';
import './style.scss';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import {
  chooseRoom,
  resetFormReservation,
  setReservationDate,
  submitReservation,
} from '../../reducers/hotelDetail';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import { Alert } from '@mui/material';
import { Navigate } from 'react-router-dom';

registerLocale('fr', fr);

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '.3rem',
  p: 4,
};

export function CardRoom({
  id,
  picture,
  description,
  price,
  surface,
  hotelName,
  address,
}) {
  const dispatch = useDispatch();

  const onChange = (dates) => {
    const [start, end] = dates;
    dispatch(setReservationDate(start, end));
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [counter, setCounter] = useState(1);

  const arrivalDate = useSelector((state) => state.hotelDetail.arrival);
  const departureDate = useSelector((state) => state.hotelDetail.departure);
  const isLoggedUser = useSelector((state) => state.login.user.isLogged);

  const userId = useSelector((state) => state.login.user.data?.id);
  const userFirstName = useSelector(
    (state) => state.login.user.data?.firstname
  );
  const userLastName = useSelector((state) => state.login.user.data?.lastname);

  const reservationIsConfirmed = useSelector(
    (state) => state.hotelDetail.reservation.isConfirmed
  );
  const error = useSelector((state) => state.hotelDetail.reservation.error);

  const firstLetterFirstName = userFirstName?.slice(0, 1).toUpperCase();

  const numberReservation =
    firstLetterFirstName +
    Math.floor(Math.random() * (10000 - 1000)) +
    1000 +
    userId;

  const handleSubmitReservation = (e) => {
    e.preventDefault();

    dispatch(submitReservation(numberReservation, hotelName));
    setCounter(counter + 1);
  };

  if (reservationIsConfirmed) {
    return (
      <Navigate to={`/confirmation-reservation/${numberReservation}`} replace />
    );
  }

  return (
    <div className="cardRoom">
      <div className="container-picture">
        <img className="picture" src={picture} alt={description} />
      </div>

      <div className="container-infos">
        <h3 className="type">{description}</h3>
        <span className="price">{price} € / nuit</span>
        <span className="surface">{surface}m²</span>
        <Typography
          variant="h7"
          component="div"
          sx={{ fontSize: '.9rem', fontStyle: 'italic', mt: 1 }}
        >
          Réservez maintenant, payez sur place!
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          size="small"
          sx={{ mt: 2 }}
          onClick={() => {
            handleOpen();
            dispatch(
              chooseRoom(
                description,
                hotelName,
                userId,
                price,
                address,
                picture
              )
            );
          }}
        >
          Choisir
        </Button>
      </div>

      <Modal
        open={open}
        onClose={() => {
          handleClose();
          dispatch(resetFormReservation());
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {isLoggedUser ? (
          <Box
            sx={style}
            component="form"
            className="reservation-form"
            onSubmit={handleSubmitReservation}
          >
            <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
              Choisissez votre date d'arrivée et départs
            </Typography>
            <DatePicker
              selected={arrivalDate}
              onChange={onChange}
              minDate={new Date()}
              startDate={arrivalDate}
              endDate={departureDate}
              selectsRange
              inline
              // showDisabledMonthNavigation
              isClearable={true}
              locale="fr"
              className="date-picker"
              placeholderText="Arrivée - Départ"
              dateFormat="dd/MM/yyyy"
              // monthsShown={2}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
            {error == 'Network Error' ? (
              <Alert variant="filled" severity="error">
                Nous sommes désolé, une erreur s'est produite
              </Alert>
            ) : (
              !departureDate &&
              counter > 1 && (
                <Alert variant="filled" severity="error">
                  Dates d'arrivée et de départs sont obligatoires
                </Alert>
              )
            )}
            <Button
              variant="contained"
              size="small"
              color="secondary"
              sx={{ mt: 2 }}
              type="submit"
            >
              Réserver
            </Button>
          </Box>
        ) : (
          <Alert variant="filled" severity="error">
            Vous devez être connecté pour faire une réservation!
          </Alert>
        )}
      </Modal>
    </div>
  );
}

CardRoom.propTypes = {
  picture: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  surface: PropTypes.string.isRequired,
};
