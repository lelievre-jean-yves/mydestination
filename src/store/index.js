import {
  applyMiddleware,
  legacy_createStore as createStore,
} from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { reducer } from '../reducers';
import { authMiddleware } from '../middleware/authMiddleware';
import { reservationMiddleware } from '../middleware/reservationMiddleware';
import { signupMiddleware} from '../middleware/signupMiddleware';
import { editUserMiddleware } from '../middleware/editUserMiddleware'
const enhancers = composeWithDevTools(
  applyMiddleware(
    authMiddleware,
    reservationMiddleware,
    signupMiddleware,
    editUserMiddleware
  )
)

// const reduxDevtools =
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export const store = createStore(reducer, enhancers);
