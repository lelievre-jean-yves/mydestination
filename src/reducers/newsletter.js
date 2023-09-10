import { produce } from 'immer';

const initialState = {
  email: '',
  inscriptionNewsLetter: false
};

// ACTION TYPES
const SET_INPUT_NEWS_LETTER = 'SET_INPUT_NEWS_LETTER';
const SUBMIT_NEWS_LETTER = 'SUBMIT_NEWS_LETTER';
const RESET_NEWS_LETTER = 'RESET_NEWS_LETTER';

// ACTION CREATORS

export const setInputNewsLetter = (currentNameInput, value) => ({
  type: SET_INPUT_NEWS_LETTER,
  payload: { currentNameInput, value },
});

export const submitNewsLetter = () => ({
  type: SUBMIT_NEWS_LETTER,
});

export const resetNewsLetter = () => ({
  type: RESET_NEWS_LETTER,
});

export function newsLetterReducer(state = initialState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SET_INPUT_NEWS_LETTER: {
        const { currentNameInput, value } = action.payload;

        draft[currentNameInput] = value;

        return;
      }

      case SUBMIT_NEWS_LETTER: {
        draft.email = '';
        draft.inscriptionNewsLetter = true;
        return;
      }

      case RESET_NEWS_LETTER: {
        draft.email = '';
        draft.inscriptionNewsLetter = false;

        return;
      }

      default:
        return;
    }
  });
}
