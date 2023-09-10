import axios from 'axios';
import {
  SUBMIT_SIGNUP,
  handleSuccessfulSignup,
  signupFailed,
} from '../reducers/signup';


export const signupMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMIT_SIGNUP: {
      // const userId = store.getState().login.user.data.id;
      // const token = JSON.parse(localStorage.getItem('token'));
      // const roomId = store.getState().hotelDetail.chosedRoom;

      axios
        .post(
          `${import.meta.env.VITE_BASE_URL_API}user_create`,
          {
            firstname: store.getState().signup.firstName,
            lastname: store.getState().signup.lastName,
            password: store.getState().signup.password,
            email: store.getState().signup.email,
            roles:["ROLE_USER"]
          },
          
        )
        .then((response) => {
          store.dispatch(
            handleSuccessfulSignup()
          );

        })
        .catch((error) => {
         store.dispatch(signupFailed(error.message));
        });
      break;
    }
  }
  next(action);
};
