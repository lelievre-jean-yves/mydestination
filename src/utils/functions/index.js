import {
  fetchingHotels,
  rejectedHotels,
  resolvedHotels,
} from '../../reducers/hotels';
import { setPasswordField } from '../../reducers/signup';
import axios from 'axios';

export function checkPassword(value, dispatch) {
  dispatch(setPasswordField('onBlur', false));

  if (value?.match(/^(?=.*[a-z])/)) {
    dispatch(setPasswordField('hasLowercaseLetter', true));
  } else {
    dispatch(setPasswordField('hasLowercaseLetter', false));
  }
  if (value?.match(/^(?=.*[A-Z])/)) {
    dispatch(setPasswordField('hasCapitalLetter', true));
  } else {
    dispatch(setPasswordField('hasCapitalLetter', false));
  }
  if (value?.match(/^(?=.*[0-9])/)) {
    dispatch(setPasswordField('hasNumber', true));
  } else {
    dispatch(setPasswordField('hasNumber', false));
  }
  if (value?.match(/^(?=.*[|_=#?!@$%^&*-])/)) {
    dispatch(setPasswordField('hasSpecialCharacter', true));
  } else {
    dispatch(setPasswordField('hasSpecialCharacter', false));
  }
  if (value?.match(/^(?=.{8,})/)) {
    dispatch(setPasswordField('has8Characters', true));
  } else {
    dispatch(setPasswordField('has8Characters', false));
  }
}

export function scrollToTop() {
  window.scrollTo(0, 0);
}

export async function fetchOrUpdateHotels(store) {
  const status = store.getState().hotels.status;

  if (status === 'pending' || status === 'updating') {
    return;
  }

  store.dispatch(fetchingHotels());

  axios
    .post(
      `${import.meta.env.VITE_BASE_URL_API}login_check`,

      {
        username: import.meta.env.VITE_USERNAME,
        password: import.meta.env.VITE_PASSWORD,
      }
    )
    .then((response) => {

      axios
        .get(`${import.meta.env.VITE_BASE_URL_API}hotels?page=1&limit=7`, {
          headers: {
            Authorization: `Bearer ${response.data.token}`,
          },
        })
        .then((response) => {
          store.dispatch(resolvedHotels(response.data));
        })
        .catch((error) => {
          store.dispatch(rejectedHotels(error));
        });
    })

    .catch((error) => {
      store.dispatch(rejectedHotels(error));
    });
}
