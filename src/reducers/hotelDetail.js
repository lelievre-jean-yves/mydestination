import { produce } from 'immer';

const initialState = {
  chosedHotel: null,
  chosedRoom: null,
  arrival: new Date(),
  departure: null,
  userId: null,
  picture: null,
  price: null,
  address: null,
  reservation: {
    isConfirmed: false,
    number: null,
    error: null,
    hotel: null,
    data: null,
  },
};

// ACTION TYPES
const CHOOSE_ROOM = 'CHOOSE_ROOM';
const SET_RESERVATION_DATE = 'SET_RESERVATION_DATE';
const RESET_FORM_RESERVATION = 'RESET_FORM_RESERVATION';
export const SUBMIT_RESERVATION = 'SUBMIT_RESERVATION';
const HANDLE_SUCCESSFUL_RESERVATION = 'HANDLE_SUCCESSFUL_RESERVATION';
const RESERVATION_FAILED = 'RESERVATION_FAILED';
export const FETCH_RESERVATIONS = 'FETCH_RESERVATIONS';
const SAVE_RESERVATIONS = 'SAVE_RESERVATIONS';

// ACTION CREATORS
export const chooseRoom = (room, hotel, userId, price, address, picture) => ({
  type: CHOOSE_ROOM,
  payload: { room, hotel, userId, price, address, picture },
});

export const saveReservations = (data) => ({
  type: SAVE_RESERVATIONS,
  payload: data,
});

export const setReservationDate = (arrival, departure) => ({
  type: SET_RESERVATION_DATE,
  payload: { arrival, departure },
});

export const resetFormReservation = () => ({
  type: RESET_FORM_RESERVATION,
});

export const submitReservation = (number, hotel) => ({
  type: SUBMIT_RESERVATION,
  payload: { number, hotel },
});

export const handleSuccesfulReservation = (number, hotel) => ({
  type: HANDLE_SUCCESSFUL_RESERVATION,
  payload: { number, hotel },
});

export const reservationFailed = (error) => ({
  type: RESERVATION_FAILED,
  payload: error,
});

export const fetchReservations = () => ({
  type: FETCH_RESERVATIONS,
});

export function hotelDetailReducer(state = initialState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case CHOOSE_ROOM: {
        const { room, hotel, userId, price, address, picture } =
          action.payload;
        draft.chosedHotel = hotel;
        draft.chosedRoom = room;
        draft.userId = userId;
        draft.price = price;
        draft.address = address;
        draft.picture = picture;

        return;
      }

      case SET_RESERVATION_DATE: {
        const { arrival, departure } = action.payload;
        draft.arrival = arrival;
        draft.departure = departure;

        return;
      }

      case RESET_FORM_RESERVATION: {
        draft.arrival = new Date();
        draft.departure = null;
        draft.reservation.number = null;
        draft.reservation.isConfirmed = false;
        draft.reservation.hotel = null;

        return;
      }

      case HANDLE_SUCCESSFUL_RESERVATION: {
        const { number, hotel } = action.payload;

        draft.arrival = new Date();
        draft.departure = null;
        draft.reservation.isConfirmed = true;
        draft.reservation.number = number;
        draft.reservation.error = null;
        draft.reservation.hotel = hotel;

        return;
      }

      case RESERVATION_FAILED: {
        draft.arrival = new Date();
        draft.departure = null;
        draft.reservation.isConfirmed = false;
        draft.reservation.error = action.payload;

        return;
      }

      case SAVE_RESERVATIONS: {
        draft.reservation.data = action.payload;

        return;
      }

      default:
        return;
    }
  });
}
