import { combineReducers } from 'redux';
import { loginReducer } from './login';
import { signupReducer } from './signup';
import { headerReducer } from './header';
import { hotelDetailReducer } from './hotelDetail';
import { editUserReducer } from './editUser';
import { hotelsReducer } from './hotels';
import { newsLetterReducer } from './newsletter';

export const reducer = combineReducers({
  login: loginReducer,
  signup: signupReducer,
  header: headerReducer,
  hotelDetail: hotelDetailReducer,
  editUser: editUserReducer,
  hotels: hotelsReducer,
  newsLetter: newsLetterReducer,
});
