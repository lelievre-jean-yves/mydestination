import {
  FETCH_USER,
  SUBMIT_LOGIN,
  fetchUser,
  handleSuccessfulLogin,
  loginFailed,
  saveUser,
} from '../reducers/login';
import axios from 'axios';

export const authMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMIT_LOGIN: {
      axios
        .post(`${import.meta.env.VITE_BASE_URL_API}login_check`, {
          username: store.getState().login.email,
          password: store.getState().login.password,
        })
        .then((response) => {
          store.dispatch(handleSuccessfulLogin(response.data.token));
          localStorage.setItem('token', JSON.stringify(response.data.token));

          store.dispatch(fetchUser());
        })
        .catch((error) => {
          store.dispatch(loginFailed(error?.response?.data || error));
        });
      break;
    }

    case FETCH_USER: {
      const token =
        store.getState().login.user.token ||
        JSON.parse(localStorage.getItem('token'));

      axios
        .get(`${import.meta.env.VITE_BASE_URL_API}get-user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          store.dispatch(saveUser(response.data));
        })
        .catch((error) => {
          console.log(error);
          store.dispatch(loginFailed(error?.response?.data || error));
        });
      break;
    }
    default:
  }
  next(action);
};
