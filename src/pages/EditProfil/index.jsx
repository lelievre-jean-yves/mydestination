import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { encode } from 'html-entities';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { scrollToTop } from '../../utils/functions';
import {
  blurFieldEditUser,
  focusFieldEditUser,
  setInputEditUser,
  submitEditUser,
} from '../../reducers/editUser';
import { selectFieldState, selectInput } from '../../selectors';
import { Navigate } from 'react-router-dom';
import { resetFormReservation } from '../../reducers/hotelDetail';
import { useFetchOrUpdateHotels } from '../../utils/hooks';

export default function EditProfil() {
  useFetchOrUpdateHotels();
  scrollToTop();

  const dispatch = useDispatch();
  const firstName = useSelector(selectInput('editUser', 'firstName'));
  const lastName = useSelector(selectInput('editUser', 'lastName'));
  const email = useSelector(selectInput('editUser', 'email'));
  const isFirstNameFocused = useSelector(
    selectFieldState('editUser', 'firstName')
  );
  const isLastNameFocused = useSelector(
    selectFieldState('editUser', 'lastName')
  );
  selectFieldState('editUser', 'lastName');
  const isEmailFocused = useSelector(selectFieldState('editUser', 'email'));
  const isLoggedUser = useSelector((state) => state.login.user.isLogged);

  const handleFocus = (name) => {
    dispatch(focusFieldEditUser(name));
  };

  const handleBlur = (name) => {
    dispatch(blurFieldEditUser(name));
  };

  useEffect(() => {
    dispatch(resetFormReservation());
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = encode(data.get('firstName').trim());
    const lastName = encode(data.get('lastName').trim());
    const email = encode(data.get('email').trim());

    if (email !== '' && firstName !== '' && lastName !== '') {
      console.log({
        firstName,
        lastName,
        email,
      });

      dispatch(submitEditUser());
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    dispatch(setInputEditUser(name, value));
  };

  if (!isLoggedUser) {
    return <Navigate to="/connexion" replace />;
  }

  return (
    <Container component="main" maxWidth="md" className="user-form">
      <CssBaseline />
      <Box className="box">
        <Typography component="h1" variant="h4" sx={{ marginBottom: 4, mt: 1 }}>
          Modifiez votre profil
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                color="secondary"
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="Prénom"
                value={firstName}
                onChange={handleChange}
                onFocus={() => {
                  handleFocus('firstName');
                }}
                onBlur={() => {
                  handleBlur('firstName');
                }}
                error={isFirstNameFocused && firstName === ''}
                helperText={
                  isFirstNameFocused
                    ? firstName === ''
                      ? 'Champ obligatoire'
                      : ''
                    : ''
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                color="secondary"
                required
                fullWidth
                id="lastName"
                label="Nom"
                name="lastName"
                autoComplete="family-name"
                value={lastName}
                onChange={handleChange}
                onFocus={() => {
                  handleFocus('lastName');
                }}
                onBlur={() => {
                  handleBlur('lastName');
                }}
                error={isLastNameFocused && lastName === ''}
                helperText={
                  isLastNameFocused
                    ? lastName === ''
                      ? 'Champ obligatoire'
                      : ''
                    : ''
                }
                className="lastName-field"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="secondary"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={handleChange}
                onFocus={() => {
                  handleFocus('email');
                }}
                onBlur={() => {
                  handleBlur('email');
                }}
                error={isEmailFocused && email === ''}
                helperText={
                  isEmailFocused
                    ? email === ''
                      ? 'Champ obligatoire'
                      : ''
                    : ''
                }
                sx={{ marginTop: 3 }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 5, mb: 2 }}
            color="secondary"
          >
            Modifier
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
