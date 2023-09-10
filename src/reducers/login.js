import { produce } from 'immer';

const initialState = {
  email: '',
  password: '',
  isFocused: {
    email: false,
    password: false,
  },
  showPassword: false,
  user: {
    isLogged: false,
    token: null,
    data: null,
    error: null,
  },
  checkLogin: false,
};

// ACTION TYPES
const FOCUS_FIELD_LOGIN = 'FOCUS_FIELD_LOGIN';
const BLUR_FIELD_LOGIN = 'BLUR_FIELD_LOGIN';
const SET_SHOW_PASSWORD_LOGIN = 'SET_SHOW_PASSWORD_LOGIN';
const SET_INPUT_LOGIN = 'SET_INPUT_LOGIN';
export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
const RESET_LOGIN = ' RESET_LOGIN';
export const HANDLE_SUCCESSFUL_LOGIN = 'HANDLE_SUCCESSFUL_LOGIN';
const SAVE_USER = 'SAVE_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const REQUEST_DATA_INLOCAL_STORAGE = 'REQUEST_DATA_INLOCAL_STORAGE';
export const FETCH_USER = 'FETCH_USER';
const LOGIN_FAILED = 'LOGIN_FAILED';
const CHECK_LOGIN = 'CHECK_LOGIN';

// ACTION CREATORS

export const focusFieldLogin = (name) => ({
  type: FOCUS_FIELD_LOGIN,
  payload: name,
});
export const blurFieldLogin = (name) => ({
  type: BLUR_FIELD_LOGIN,
  payload: name,
});
export const setShowPasswordLogin = () => ({ type: SET_SHOW_PASSWORD_LOGIN });
export const setInputLogin = (currentNameInput, value) => ({
  type: SET_INPUT_LOGIN,
  payload: { currentNameInput, value },
});

export const submitLogin = () => ({
  type: SUBMIT_LOGIN,
});

export const resetLogin = () => ({
  type: RESET_LOGIN,
});

export const handleSuccessfulLogin = (token) => ({
  type: HANDLE_SUCCESSFUL_LOGIN,
  payload: token,
});
export const saveUser = (data) => ({
  type: SAVE_USER,
  payload: data,
});
export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const requestDataInlocalStorage = (token, user) => ({
  type: REQUEST_DATA_INLOCAL_STORAGE,
  payload: { token, user },
});

export const fetchUser = () => ({
  type: FETCH_USER,
});

export const loginFailed = (error) => ({
  type: LOGIN_FAILED,
  payload: error,
});

export const checkLogin = () => ({
  type: CHECK_LOGIN,
});

export function loginReducer(state = initialState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case FOCUS_FIELD_LOGIN: {
        draft.isFocused[action.payload] = true;

        return;
      }

      case BLUR_FIELD_LOGIN: {
        draft.isFocused[action.payload] = false;

        return;
      }

      case SET_SHOW_PASSWORD_LOGIN: {
        draft.showPassword = !draft.showPassword;

        return;
      }

      case SET_INPUT_LOGIN: {
        const { currentNameInput, value } = action.payload;

        draft[currentNameInput] = value;

        return;
      }

      case RESET_LOGIN: {
        draft.email = '';
        draft.password = '';
        draft.user.error = null;
        draft.user.token = null;

        return;
      }

      case HANDLE_SUCCESSFUL_LOGIN: {
        draft.email = '';
        draft.password = '';
        draft.user.token = action.payload;
        draft.isFocused.email = false;
        draft.isFocused.password = false;
        draft.checkLogin = false;

        return;
      }

      case SAVE_USER: {
        draft.user.data = action.payload;
        draft.user.token = null;
        draft.user.isLogged = true;

        return;
      }

      case LOGOUT_USER: {
        draft.user.isLogged = false;

        return;
      }

      case REQUEST_DATA_INLOCAL_STORAGE: {
        const { token } = action.payload;

        draft.user.token = token;

        return;
      }

      case LOGIN_FAILED: {
        draft.user.error = action.payload;
        draft.user.isLogged = false;
        draft.checkLogin = true;


        return;
      }

      case CHECK_LOGIN: {
        draft.checkLogin = false;

        return;
      }

      default:
        return;
    }
  });
}
