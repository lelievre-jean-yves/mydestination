import axios from 'axios';
import {
  FETCH_RESERVATIONS,
  SUBMIT_RESERVATION,
  fetchReservations,
  handleSuccesfulReservation,
  reservationFailed,
  saveReservations
} from '../reducers/hotelDetail';

export const reservationMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMIT_RESERVATION: {
      const userId = store.getState().login.user.data.id;
      const token = JSON.parse(localStorage.getItem('token'));
      // const roomId = store.getState().hotelDetail.chosedRoom;

      axios
        .post(
          `${import.meta.env.VITE_BASE_URL_API}reservations/new`,
          {
            arrivalDate: store.getState().hotelDetail.arrival,
            departureDate: store.getState().hotelDetail.departure,
            status: '1',
            userName: `${userId}`,
            hotelName: store.getState().hotelDetail.chosedHotel,
            roomType: store.getState().hotelDetail.chosedRoom,
            numberReservation: action.payload.number,
            priceByNight: store.getState().hotelDetail.price,
            adresse: store.getState().hotelDetail.address,
            picture: store.getState().hotelDetail.picture,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          store.dispatch(
            handleSuccesfulReservation(
              // response.data.token,
              action.payload.number,
              action.payload.hotel
            )
          );
          store.dispatch(fetchReservations())
        })
        .catch((error) => {
          store.dispatch(reservationFailed(error.message));
        });
      break;
    }

    case FETCH_RESERVATIONS: {
      const token =
        store.getState().login.user.token ||
        JSON.parse(localStorage.getItem('token'));

      axios
        .get(`${import.meta.env.VITE_BASE_URL_API}reservations/new`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          store.dispatch(saveReservations(response.data));
        })
        .catch((error) => {
          console.log(error);
          // store.dispatch(loginFailed(error?.response?.data || error));
        });
      break;
    }
  }
  next(action);
};
