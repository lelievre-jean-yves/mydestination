import axios from 'axios';

import {
  SUBMIT_EDIT_USER,
  handleSuccessfulEditUser,
} from '../reducers/editUser';
import { fetchUser } from '../reducers/login';

export const editUserMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMIT_EDIT_USER: {
      const userId = store.getState().login.user.data.id;
      const token = JSON.parse(localStorage.getItem('token'));

      axios
        .put(
          `${import.meta.env.VITE_BASE_URL_API}user/${userId}`,
          {
            firstname: store.getState().editUser.firstName,
            lastname: store.getState().editUser.lastName,
            email: store.getState().editUser.email,
            roles: ['ROLE_USER'],
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          store.dispatch(handleSuccessfulEditUser());
          store.dispatch(fetchUser());
        })
        .catch((error) => {
          // store.dispatch(editUserFailed(error.message));
        });
      break;
    }
  }
  next(action);
};
