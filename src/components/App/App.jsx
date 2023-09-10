import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LogIn } from '../../pages/Login';
import SignUp from '../../pages/Signup';
import { Header } from '../Header';
import './App.scss';
import { Home } from '../../pages/Home';
import { HotelsList } from '../../pages/HotelsList';
import { Footer } from '../Footer';
import { HotelDetail } from '../../pages/HotelDetail';
import { ConfirmationReservation } from '../../pages/ConfirmationReservation';
import EditProfil from '../../pages/EditProfil';
import { MyBookings } from '../../pages/MyBookings';
import { showOrHideModalUser } from '../../reducers/header';
import { useDispatch, useSelector } from 'react-redux';
import { Error404 } from '../../pages/Error404';
import { fetchUser, requestDataInlocalStorage } from '../../reducers/login';
import { useFetchOrUpdateHotels } from '../../utils/hooks';
import { Loader } from '../Loader';
import { Error } from '../Error';
import { fetchReservations } from '../../reducers/hotelDetail';

function App() {
  useFetchOrUpdateHotels();
  const status = useSelector((state) => state.hotels.status);

  const dispatch = useDispatch();

  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      dispatch(requestDataInlocalStorage(token));
      dispatch(fetchUser());
    }
    dispatch(fetchReservations())
  }, []);

  const isLoading = status === 'void' || status === 'pending';

  if (isLoading) {
    return (
      <div className="appLoad">
        <h1>MyDestination</h1>
        <Loader />
      </div>
    );
  }

  if (status === 'rejected') {
    return <Error />;
  }

  return (
    <>
      <Header />
      <div
        className="App"
        onClick={() => {
          dispatch(showOrHideModalUser('app'));
        }}
      >
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/connexion" element={<LogIn />}></Route>
          <Route path="/inscription" element={<SignUp />}></Route>
          <Route path="/hotels" element={<HotelsList />}></Route>
          <Route
            path="/confirmation-reservation/:number"
            element={<ConfirmationReservation />}
          ></Route>
          <Route path="/modifier-profil" element={<EditProfil />}></Route>
          <Route path="/hotels/:slug" element={<HotelDetail />}></Route>
          <Route path="/mesreservations" element={<MyBookings />}></Route>

          <Route path="*" element={<Error404 />}></Route>
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
