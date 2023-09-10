import { produce } from 'immer';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  isFocused: {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
  },
  showPassword: {
    password: false,
    confirmPassword: false,
  },
  passwordField: {
    hasLowercaseLetter: false,
    hasCapitalLetter: false,
    hasNumber: false,
    hasSpecialCharacter: false,
    has8Characters: false,
    errorOnSubmit: false,
  },
  firstLoadApp: true,
  errorIfNotConfirmPassword: false,
  isUserCreated: false,
  errorServer: null,
};

// ACTION TYPES
const FOCUS_FIELD_SIGNUP = 'FOCUS_FIELD_SIGNUP';
const BLUR_FIELD_SIGNUP = 'BLUR_FIELD_SIGNUP';
const SET_SHOW_PASSWORD_SIGNUP = 'SET_SHOW_PASSWORD_SIGNUP';
const SET_INPUT_SIGNUP = 'SET_INPUT_SIGNUP';
export const SUBMIT_SIGNUP = 'SUBMIT_SIGNUP';
const SET_PASSWORD_FIELD = 'SET_PASSWORD_FIELD';
const RESET_SIGNUP = 'RESET_SIGNUP';
export const HANDLE_SUCCESSFUL_SIGNUP = 'HANDLE_SUCCESSFUL_SIGNUP';
const CHECK_SIGNUP = 'CHECK_SIGNUP';
const SIGNUP_FAILED = 'SIGNUP_FAILED';


// ACTION CREATORS
export const focusFieldSignup = (name) => ({
  type: FOCUS_FIELD_SIGNUP,
  payload: name,
});
export const blurFieldSignup = (name) => ({
  type: BLUR_FIELD_SIGNUP,
  payload: name,
});
export const setShowPasswordSignup = (name) => ({
  type: SET_SHOW_PASSWORD_SIGNUP,
  payload: name,
});
export const setInputSignup = (currentNameInput, value) => ({
  type: SET_INPUT_SIGNUP,
  payload: { currentNameInput, value },
});

export const submitSignup = () => ({
  type: SUBMIT_SIGNUP,
});

export const setPasswordField = (key, value) => ({
  type: SET_PASSWORD_FIELD,
  payload: { key, value },
});

export const resetSignup = () => ({
  type: RESET_SIGNUP,
});

export const handleSuccessfulSignup = () => ({
  type: HANDLE_SUCCESSFUL_SIGNUP,
});

export const checkSignup = () => ({
  type: CHECK_SIGNUP,
});



export const signupFailed = (error) => ({
  type: SIGNUP_FAILED,
  payload: error,
});

export function signupReducer(state = initialState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case FOCUS_FIELD_SIGNUP: {
        draft.isFocused[action.payload] = true;
        if (action.payload === 'password') {
          draft.firstLoadApp = false;
        }

        return;
      }

      case BLUR_FIELD_SIGNUP: {
        draft.isFocused[action.payload] = false;

        return;
      }

      case SET_SHOW_PASSWORD_SIGNUP: {
        draft.showPassword[action.payload] =
          !draft.showPassword[action.payload];

        return;
      }

      case SET_INPUT_SIGNUP: {
        const { currentNameInput, value } = action.payload;

        draft[currentNameInput] = value;

        return;
      }

      case SET_PASSWORD_FIELD: {
        const { key, value } = action.payload;

        draft.passwordField[key] = value;

        return;
      }

      case CHECK_SIGNUP: {
        if (draft.password === draft.confirmPassword) {
          draft.errorIfNotConfirmPassword = false;
        } else {
          draft.errorIfNotConfirmPassword = true;
        }

        return;
      }

      case RESET_SIGNUP: {
        draft.firstName = '';
        draft.lastName = '';
        draft.email = '';
        draft.password = '';
        draft.confirmPassword = '';
        draft.isUserCreated = false;

        return;
      }

      case HANDLE_SUCCESSFUL_SIGNUP: {
        draft.lastName = '';
        draft.firstName = '';
        draft.email = '';
        draft.password = '';
        draft.confirmPassword = '';
        draft.isUserCreated = true;
        draft.isFocused.email = false;
        draft.isFocused.lastName = false;
        draft.isFocused.firstName = false;
        draft.isFocused.password = false;
        draft.isFocused.confirmPassword = false;
        draft.errorIfNotConfirmPassword = false;
        draft.errorServer = null;

        return;
      }

      case SIGNUP_FAILED: {
        draft.errorServer = action.payload;

        return;
      }

      default:
        return;
    }
  });
}
