import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import './style.scss';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { showOrHideMenu, showOrHideModalUser } from '../../reducers/header';
import HotelIcon from '@mui/icons-material/Hotel';
import HomeIcon from '@mui/icons-material/Home';
import { logoutUser, resetLogin } from '../../reducers/login';
import { resetSignup } from '../../reducers/signup';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import EditIcon from '@mui/icons-material/Edit';
import { scrollToTop } from '../../utils/functions';
import { resetNewsLetter } from '../../reducers/newsletter';
import { Alert } from '@mui/material';
import { resetEditUser } from '../../reducers/editUser';

const navItems = [
  {
    link: '/',
    name: 'Accueil',
    logo: <HomeIcon />,
  },
  {
    link: '/hotels',
    name: 'Hôtels',
    logo: <HotelIcon />,
  },
];

const btnData = [
  {
    link: '/inscription',
    name: "S'inscrire",
  },
  {
    link: '/connexion',
    name: 'Se connecter',
  },
];

export function Header() {
  const dispatch = useDispatch();
  const showMenu = useSelector((state) => state.header.showMenu);
  const showModalUser = useSelector((state) => state.header.showModalUser);
  const isLoggedUser = useSelector((state) => state.login.user.isLogged);
  const firstName = useSelector((state) => state.login.user.data?.firstname);
  const lastName = useSelector((state) => state.login.user.data?.lastname);
  const isUserModified = useSelector((state) => state.editUser.isUserModified);
  const isUserCreated = useSelector((state) => state.signup.isUserCreated);


  const menuDisplayCounter = useSelector(
    (state) => state.header.menuDisplayCounter
  );

  const handleClickOpenOrCloseMenu = () => {
    dispatch(showOrHideMenu());
  };

  const handleClickLinkMenu = () => {
    dispatch(showOrHideMenu('itemsMenu'));

    dispatch(resetLogin());
    dispatch(resetSignup());
    dispatch(resetNewsLetter());
  };

  useEffect(() => {
    let timer1 = setTimeout(() => {
      if (isUserModified) {
        dispatch(resetEditUser());
      }
    }, 5000);

    let timer2 = setTimeout(() => {
      if (isUserCreated) {
        dispatch(resetSignup());
      }
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    } 

  }, [isUserModified, isUserCreated]);

  const classNav =
    !showMenu && menuDisplayCounter === 0
      ? 'menu'
      : showMenu && menuDisplayCounter > 0
      ? 'menu show-menu'
      : 'menu hide-menu';

  const classBgModal = showMenu ? 'bg-modal show-menu' : 'bg-modal';
  return (
    <header className="header">
      {isUserModified && (
        <Alert
          variant="filled"
          severity="success"
          sx={{ position: 'absolute', top: '5rem' }}
        >
          Votre compte à été modifié avec succès!
        </Alert>
      )}
      {isUserCreated && (
        <Alert
          variant="filled"
          severity="success"
          sx={{ position: 'absolute', top: '5rem' }}
        >
          Votre compte a été créé avec succès!
        </Alert>
      )}
      <Link
        className="logo"
        to="/"
        onClick={() => {
          scrollToTop();
          dispatch(showOrHideModalUser('logo'));
          handleClickLinkMenu();
        }}
      >
        MyDestination
      </Link>
      <div className="container-menu">
        <div className={classBgModal} onClick={handleClickLinkMenu}></div>
        <MenuIcon className="icon-open" onClick={handleClickOpenOrCloseMenu} />
        <nav className={classNav}>
          <CloseIcon
            className="icon-close"
            onClick={handleClickOpenOrCloseMenu}
          />
          <div className="nav-link">
            <ul className="nav-link_list">
              {navItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.link}
                    onClick={() => {
                      handleClickLinkMenu();
                      if (item.name === 'Accueil') {
                        scrollToTop();
                      }
                      dispatch(showOrHideModalUser('linkMenu'));
                    }}
                    className={({ isActive }) =>
                      isActive ? 'menu-link  menu-link--active' : 'menu-link'
                    }
                  >
                    {item.logo} {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          {!isLoggedUser ? (
            <div className="nav-btn">
              {btnData.map((btn) => (
                <Link to={btn.link} key={btn.name}>
                  <Button
                    onClick={handleClickLinkMenu}
                    className="btn"
                    size="small"
                  >
                    {btn.name}
                  </Button>
                </Link>
              ))}
            </div>
          ) : (
            <div className="nav-user">
              <h3
                className="user-name"
                onClick={() => {
                  dispatch(showOrHideModalUser());
                }}
              >
                <AccountCircleIcon sx={{ fontSize: 40 }} />{' '}
                {`${firstName} ${lastName}`}
              </h3>

              <ul
                className={
                  showModalUser ? 'nav-user_list show' : 'nav-user_list'
                }
              >
                <li className="item">
                  <Link
                    onClick={() => {
                      dispatch(showOrHideModalUser('itemUser'));
                      handleClickLinkMenu();
                    }}
                    to="/modifier-profil"
                  >
                    <EditIcon /> <span>Modifier profil</span>
                  </Link>
                </li>
                <li className="item">
                  <Link
                    onClick={() => {
                      dispatch(showOrHideModalUser('itemUser'));
                      handleClickLinkMenu();
                    }}
                    to="/mesreservations"
                  >
                    <BusinessCenterIcon /> <span>Mes réservations</span>
                  </Link>
                </li>
                <li className="item">
                  <Link
                    onClick={() => {
                      dispatch(showOrHideModalUser('itemUser'));
                      handleClickLinkMenu();
                      dispatch(logoutUser());
                      localStorage.removeItem('token');
                      localStorage.removeItem('user');
                    }}
                  >
                    <ArrowCircleLeftIcon /> <span>Déconnexion</span>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
