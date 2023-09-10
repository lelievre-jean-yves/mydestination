import { produce } from 'immer';
import { useSelector } from 'react-redux';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  isFocused: {
    firstName: false,
    lastName: false,
    email: false,
  },
  isUserModified: false,
  isUserEditedForAlert: null,
};

// ACTION TYPES
const FOCUS_FIELD_EDIT_USER = 'FOCUS_FIELD_EDIT_USER';
const BLUR_FIELD_EDIT_USER = 'BLUR_FIELD_EDIT_USER';
const SET_INPUT_EDIT_USER = 'SET_INPUT_EDIT_USER';
export const SUBMIT_EDIT_USER = 'SUBMIT_EDIT_USER';
const RESET_EDIT_USER = 'RESET_EDIT_USER';
export const HANDLE_SUCCESSFUL_EDIT_USER = 'HANDLE_SUCCESSFUL_EDIT_USER';
const EDIT_USER_FAILED = 'EDIT_USER_FAILED';
const SET_USER_EDITED_FOR_ALERT = 'SET_USER_EDITED_FOR_ALERT';



// ACTION CREATORS
export const focusFieldEditUser = (name) => ({
  type: FOCUS_FIELD_EDIT_USER,
  payload: name,
});
export const blurFieldEditUser = (name) => ({
  type: BLUR_FIELD_EDIT_USER,
  payload: name,
});

export const setInputEditUser = (currentNameInput, value) => ({
  type: SET_INPUT_EDIT_USER,
  payload: { currentNameInput, value },
});

export const submitEditUser = () => ({
  type: SUBMIT_EDIT_USER,
});

export const resetEditUser = () => ({
  type: RESET_EDIT_USER,
});

export const handleSuccessfulEditUser = () => ({
  type: HANDLE_SUCCESSFUL_EDIT_USER,
});

export const editUserFailed = () => ({
  type: EDIT_USER_FAILED,
});

export const setUserEditedForAlert = () => ({
  type: SET_USER_EDITED_FOR_ALERT,
});

export function editUserReducer(state = initialState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case FOCUS_FIELD_EDIT_USER: {
        draft.isFocused[action.payload] = true;

        return;
      }

      case BLUR_FIELD_EDIT_USER: {
        draft.isFocused[action.payload] = false;

        return;
      }

      case SET_INPUT_EDIT_USER: {
        const { currentNameInput, value } = action.payload;

        draft[currentNameInput] = value;

        return;
      }

      case HANDLE_SUCCESSFUL_EDIT_USER: {
        draft.lastName = '';
        draft.firstName = '';
        draft.email = '';
        draft.isUserModified = true;
        draft.isFocused.email = false;
        draft.isFocused.lastName = false;
        draft.isFocused.firstName = false;
        draft.isUserEditedForAlert = true;

        // draft.errorServer = null;

        return;
      }

      case RESET_EDIT_USER: {
        draft.firstName = '';
        draft.lastName = '';
        draft.email = '';
        draft.isUserModified = false;

        return;
      }

      case SET_USER_EDITED_FOR_ALERT: {
        draft.isUserEditedForAlert = false;

        return;
      }

      default:
        return;
    }
  });
}
