import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, Navigate } from 'react-router-dom';
import { encode } from 'html-entities';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  blurFieldLogin,
  checkLogin,
  focusFieldLogin,
  resetLogin,
  setInputLogin,
  setShowPasswordLogin,
  submitLogin,
} from '../../reducers/login';
import { selectFieldState, selectInput } from '../../selectors';
import { scrollToTop } from '../../utils/functions';
import { useFetchOrUpdateHotels } from '../../utils/hooks';
import { setUserEditedForAlert } from '../../reducers/editUser';

export function LogIn() {
  useFetchOrUpdateHotels();

  const dispatch = useDispatch();

  const email = useSelector(selectInput('login', 'email'));
  const password = useSelector(selectInput('login', 'password'));

  const isEmailFocused = useSelector(selectFieldState('login', 'email'));
  const isPasswordFocused = useSelector(selectFieldState('login', 'password'));

  const isPasswordShowed = useSelector((state) => state.login.showPassword);
  const isLoggedUser = useSelector((state) => state.login.user.isLogged);
  const isLoginFailed = useSelector((state) => state.login.user.error);
  const isUserEditedForAlert = useSelector(
    (state) => state.editUser.isUserEditedForAlert
  );
  const checkLogIn = useSelector((state) => state.login.checkLogin);

  const handleFocus = (name) => {
    dispatch(focusFieldLogin(name));
  };

  const handleBlur = (name) => {
    dispatch(blurFieldLogin(name));
  };

  const handleClickShowPassword = () => dispatch(setShowPasswordLogin());

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = encode(data.get('email').trim());
    const password = encode(data.get('password').trim());

    if (email !== '' && password !== '') {
      dispatch(submitLogin());
      dispatch(setUserEditedForAlert());
      dispatch(checkLogin());
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    dispatch(setInputLogin(name, value));
  };

  const [counter, setCounter] = useState(1);

  if (counter == 1) {
    scrollToTop();
  }

  useEffect(() => {
    setCounter(counter + 1);
  }, []);

  if (isLoggedUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container component="main" maxWidth="md" className="login">
      <CssBaseline />
      <Box className="box">
        <Typography component="h1" variant="h4" sx={{ marginBottom: 4 }}>
          Connexion
        </Typography>
        {isLoginFailed && isLoginFailed.message == 'Network Error' ? (
          <Alert variant="filled" severity="error">
            Nous sommes désolé, une erreur s'est produite
          </Alert>
        ) : isLoginFailed && isLoginFailed.message == 'Invalid JWT Token' ? (
          ''
        ) : isLoginFailed &&
          isLoginFailed.message == 'Invalid credentials.' &&
          isUserEditedForAlert ? (
          ''
        ) : (
          isLoginFailed &&
          isLoginFailed.message == 'Invalid credentials.' &&
          checkLogIn && (
            <Alert variant="filled" severity="error">
              Mot de passe ou Email incorrect{' '}
            </Alert>
          )
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            color="secondary"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            type="email"
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
              isEmailFocused ? (email === '' ? 'Champ obligatoire' : '') : ''
            }
          />

          <FormControl
            variant="outlined"
            required
            fullWidth
            color="secondary"
            sx={{ marginTop: 5 }}
          >
            <InputLabel
              htmlFor="password"
              error={isPasswordFocused && password === ''}
            >
              Mot de passe
            </InputLabel>
            <OutlinedInput
              id="password"
              type={isPasswordShowed ? 'text' : 'password'}
              value={password}
              name="password"
              autoComplete="current-password"
              onChange={handleChange}
              onFocus={() => {
                handleFocus('password');
              }}
              onBlur={() => {
                handleBlur('password');
              }}
              error={isPasswordFocused && password === ''}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {isPasswordShowed ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Mot de passe"
            />
            <FormHelperText
              id="standard-weight-helper-text"
              sx={{ color: 'red' }}
            >
              {isPasswordFocused
                ? password === ''
                  ? 'Champ obligatoire'
                  : ''
                : ''}
            </FormHelperText>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 5, mb: 2 }}
            color="secondary"
          >
            Se connecter
          </Button>
          <Grid>
            <Link
              to="/inscription"
              className="link"
              onClick={() => {
                dispatch(resetLogin());
              }}
            >
              {"Vous n'avez pas de compte ? S'inscrire"}
            </Link>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
