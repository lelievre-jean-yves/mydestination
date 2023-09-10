import { produce } from 'immer';

const initialState = {
  showMenu: false,
  menuDisplayCounter: 0,
  showModalUser: false,
};

// ACTION TYPES
const SHOW_HIDE_MENU = 'SHOW_HIDE_MENU';
const SHOW_HIDE_MODAL_USER = 'SHOW_HIDE_MODAL_USER';

// ACTION CREATORS
export const showOrHideMenu = (element = 'icon') => ({
  type: SHOW_HIDE_MENU,
  payload: element,
});

export const showOrHideModalUser = (element = 'user') => ({
  type: SHOW_HIDE_MODAL_USER,
  payload: element,
});

export function headerReducer(state = initialState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SHOW_HIDE_MENU: {
        if (action.payload === 'icon') {
          draft.showMenu = !draft.showMenu;
          draft.menuDisplayCounter = draft.menuDisplayCounter + 1;
        }

        if (action.payload !== 'icon') {
          draft.showMenu = false;
          draft.menuDisplayCounter = draft.menuDisplayCounter + 1;
        }

        return;
      }

      case SHOW_HIDE_MODAL_USER: {
        if (action.payload === 'user') {
          draft.showModalUser = !draft.showModalUser;
          // draft.menuDisplayCounter = draft.menuDisplayCounter + 1;
        }

        if (action.payload !== 'user') {
          draft.showModalUser = false;
          // draft.menuDisplayCounter = draft.menuDisplayCounter + 1;
        }

        return;
      }
      
      default:
        return;
    }
  });
}
