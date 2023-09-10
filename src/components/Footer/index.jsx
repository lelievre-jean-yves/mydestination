import React, { useEffect, useState } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Typography from '@mui/material/Typography';
import SouthIcon from '@mui/icons-material/South';
import Button from '@mui/material/Button';
import './style.scss';
import { showOrHideModalUser } from '../../reducers/header';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetNewsLetter,
  setInputNewsLetter,
  submitNewsLetter,
} from '../../reducers/newsletter';
import { Alert } from '@mui/material';

export function Footer() {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.newsLetter.email);
  const inscriptionNewsLetter = useSelector(
    (state) => state.newsLetter.inscriptionNewsLetter
  );

  const handleChange = (e) => {
    dispatch(setInputNewsLetter(e.target.name, e.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(submitNewsLetter());
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      if (inscriptionNewsLetter) {
        dispatch(resetNewsLetter());
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [inscriptionNewsLetter]);

  return (
    <footer
      className="footer"
      onClick={() => {
        dispatch(showOrHideModalUser('footer'));
      }}
    >
      <div className="container-contact_newsl">
        <form onSubmit={handleSubmit}>
          <h3>
            <span>Obtenez les meilleures offres en premier!</span>
            <span>Rejoignez notre newsletter</span>
          </h3>
          {inscriptionNewsLetter && (
            <Alert variant="filled" severity="success">
              Votre inscription a bien été prise en compte
            </Alert>
          )}
          <label htmlFor="">Email</label> <br />
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 2 }}
            type="submit"
          >
            S'abonner
          </Button>
        </form>
        <div className="contact">
          <h3 className="title">
            <SouthIcon className="southIcon" /> CONTACTEZ-NOUS{' '}
            <SouthIcon className="southIcon" />
          </h3>
          <div className="icons">
            <a href="mailto:myDestination@gmail.com">
              <MailOutlineIcon sx={{ fontSize: '2.5rem' }} />
            </a>

            <a href="https://www.facebook.com/myDestination/" target="_blank">
              <FacebookIcon sx={{ fontSize: '2.5rem' }} />
            </a>
            <a href="https://www.instagram.com/myDestination/" target="_blank">
              <InstagramIcon sx={{ fontSize: '2.5rem' }} />
            </a>
          </div>
        </div>
      </div>

      <Copyright sx={{ mt: 4, mb: 4 }} />
    </footer>
  );
}

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.white" align="center" {...props}>
      {'Copyright © '}

      {'MyDestination '}

      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
