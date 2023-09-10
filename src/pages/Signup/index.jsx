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
  blurFieldSignup,
  checkSignup,
  focusFieldSignup,
  resetSignup,
  setInputSignup,
  setPasswordField,
  setShowPasswordSignup,
  submitSignup,
} from '../../reducers/signup';
import { checkPassword, scrollToTop } from '../../utils/functions';
import { ItemValidationPassword } from '../../components/ItemValidationPassword';
import { selectFieldState, selectInput } from '../../selectors';
import { useFetchOrUpdateHotels } from '../../utils/hooks';

export default function SignUp() {
  useFetchOrUpdateHotels();

  const dispatch = useDispatch();
  const firstName = useSelector(selectInput('signup', 'firstName'));
  const lastName = useSelector(selectInput('signup', 'lastName'));
  const email = useSelector(selectInput('signup', 'email'));
  const password = useSelector(selectInput('signup', 'password'));
  const confirmPassword = useSelector(selectInput('signup', 'confirmPassword'));
  const isFirstNameFocused = useSelector(
    selectFieldState('signup', 'firstName')
  );
  const isLastNameFocused = useSelector(selectFieldState('signup', 'lastName'));
  selectFieldState('signup', 'lastName');
  const isEmailFocused = useSelector(selectFieldState('signup', 'email'));
  const isPasswordFocused = useSelector(selectFieldState('signup', 'password'));
  const isConfirmPasswordFocused = useSelector(
    selectFieldState('signup', 'confirmPassword')
  );
  const isPasswordShowed = useSelector(
    (state) => state.signup.showPassword.password
  );
  const isConfirmPasswordShowed = useSelector(
    (state) => state.signup.showPassword.confirmPassword
  );

  const hasLowercaseLetter = useSelector(
    (state) => state.signup.passwordField.hasLowercaseLetter
  );
  const hasCapitalLetter = useSelector(
    (state) => state.signup.passwordField.hasCapitalLetter
  );
  const hasNumber = useSelector(
    (state) => state.signup.passwordField.hasNumber
  );
  const hasSpecialCharacter = useSelector(
    (state) => state.signup.passwordField.hasSpecialCharacter
  );
  const has8Characters = useSelector(
    (state) => state.signup.passwordField.has8Characters
  );
  const errorOnSubmit = useSelector(
    (state) => state.signup.passwordField.errorOnSubmit
  );
  const firstLoadApp = useSelector((state) => state.signup.firstLoadApp);
  const errorIfNotConfirmPassword = useSelector(
    (state) => state.signup.errorIfNotConfirmPassword
  );

  const isLoggedUser = useSelector((state) => state.login.user.isLogged);

  const errorServer = useSelector((state) => state.signup.errorServer);

  const [counter, setCounter] = useState(1);

  if (counter == 1) {
    scrollToTop();
  }

  useEffect(() => {
    setCounter(counter + 1);
  }, []);

  const handleFocus = (name) => {
    dispatch(focusFieldSignup(name));
  };

  const handleBlur = (name) => {
    dispatch(blurFieldSignup(name));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = encode(data.get('firstName').trim());
    const lastName = encode(data.get('lastName').trim());
    const email = encode(data.get('email').trim());
    const password = encode(data.get('password').trim());
    const confirmPassword = encode(data.get('confirmPassword').trim());

    if (
      password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_=#?!@$%^&*-])(?=.{8,})/
      )
    ) {
      dispatch(setPasswordField('errorOnsubmit', false));
    } else {
      dispatch(setPasswordField('errorOnSubmit', true));
    }

    if (
      email !== '' &&
      password !== '' &&
      password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_=#?!@$%^&*-])(?=.{8,})/
      ) &&
      firstName !== '' &&
      lastName !== '' &&
      password === confirmPassword
    ) {
      dispatch(submitSignup());
    } else {
      dispatch(checkSignup());
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    dispatch(setInputSignup(name, value));
    if (name === 'password') {
      checkPassword(value, dispatch);
    }
  };

  if (isLoggedUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container component="main" maxWidth="md" className="user-form">
      <CssBaseline />

      <Box className="box">
        {/* {isUserCreated && (
          <Alert
            variant="filled"
            severity="success"
            sx={{ position: 'absolute', top: '5rem' }}
          >
            Votre compte a été créé avec succès!
          </Alert>
        )} */}
        {errorServer == 'Network Error' && (
          <Alert
            variant="filled"
            severity="error"
            sx={{ position: 'absolute', top: '5rem' }}
          >
            Nous sommes désolé, une erreur s'est produite
          </Alert>
        )}
        <Typography component="h1" variant="h4" sx={{ marginBottom: 4, mt: 1 }}>
          Inscription
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

            <Grid item xs={12}>
              <>
                <FormControl
                  variant="outlined"
                  required
                  fullWidth
                  color="secondary"
                  sx={{ marginTop: 3 }}
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
                    autoComplete="new-password"
                    onChange={handleChange}
                    onFocus={() => {
                      checkPassword(password, dispatch);
                      handleFocus('password');
                      dispatch(setPasswordField('errorOnSubmit', false));
                    }}
                    onBlur={() => {
                      handleBlur('password');
                    }}
                    error={isPasswordFocused && password === ''}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => {
                            dispatch(setShowPasswordSignup('password'));
                          }}
                          edge="end"
                        >
                          {isPasswordShowed ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Mot de passe"
                  />
                </FormControl>

                <div className="validation-password">
                  Le mot de passe doit contenir
                  <ul
                    className={
                      errorOnSubmit ? 'text-danger list' : 'text-normal list'
                    }
                  >
                    <ItemValidationPassword
                      className={
                        firstLoadApp
                          ? 'text-normal'
                          : !isPasswordFocused
                          ? errorOnSubmit
                            ? ''
                            : 'text-normal'
                          : hasLowercaseLetter
                          ? 'text-success'
                          : 'text-danger'
                      }
                      text="au moins une lettre en minuscule"
                    />
                    <ItemValidationPassword
                      className={
                        firstLoadApp
                          ? 'text-normal'
                          : !isPasswordFocused
                          ? errorOnSubmit
                            ? ''
                            : 'text-normal'
                          : hasCapitalLetter
                          ? 'text-success'
                          : 'text-danger'
                      }
                      text="au moins une lettre en majuscule"
                    />
                    <ItemValidationPassword
                      className={
                        firstLoadApp
                          ? 'text-normal'
                          : !isPasswordFocused
                          ? errorOnSubmit
                            ? ''
                            : 'text-normal'
                          : hasNumber
                          ? 'text-success'
                          : 'text-danger'
                      }
                      text="au moins un chiffre"
                    />
                    <ItemValidationPassword
                      className={
                        firstLoadApp
                          ? 'text-normal'
                          : !isPasswordFocused
                          ? errorOnSubmit
                            ? ''
                            : 'text-normal'
                          : hasSpecialCharacter
                          ? 'text-success'
                          : 'text-danger'
                      }
                      text="au moins un caractère spécial parmi [|_=#?!@$%^&*-]"
                    />
                    <ItemValidationPassword
                      className={
                        firstLoadApp
                          ? 'text-normal'
                          : !isPasswordFocused
                          ? errorOnSubmit
                            ? ''
                            : 'text-normal'
                          : has8Characters
                          ? 'text-success'
                          : 'text-danger'
                      }
                      text="au moins 8 caractères"
                    />
                  </ul>
                </div>

                <FormControl
                  variant="outlined"
                  required
                  fullWidth
                  color="secondary"
                  sx={{ marginTop: 3 }}
                >
                  <InputLabel
                    htmlFor="confirmPassword"
                    error={isConfirmPasswordFocused && confirmPassword === ''}
                  >
                    Confirmer le mot de passe
                  </InputLabel>
                  <OutlinedInput
                    id="confirmPassword"
                    type={isConfirmPasswordShowed ? 'text' : 'password'}
                    value={confirmPassword}
                    name="confirmPassword"
                    autoComplete="confirm-password"
                    onChange={handleChange}
                    onFocus={() => {
                      handleFocus('confirmPassword');
                    }}
                    onBlur={() => {
                      handleBlur('confirmPassword');
                    }}
                    error={isConfirmPasswordFocused && confirmPassword === ''}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={() => {
                            dispatch(setShowPasswordSignup('confirmPassword'));
                          }}
                          edge="end"
                        >
                          {isConfirmPasswordShowed ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirmer le mot de passe"
                  />
                  <FormHelperText
                    id="standard-weight-helper-text"
                    sx={{ color: 'red' }}
                  >
                    {!errorIfNotConfirmPassword && isConfirmPasswordFocused
                      ? confirmPassword === ''
                        ? 'Champ obligatoire'
                        : ''
                      : ''}
                  </FormHelperText>
                </FormControl>
                {errorIfNotConfirmPassword && (
                  <div className="text-danger">
                    Les mots de passe doivent être identiques
                  </div>
                )}
              </>
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 5, mb: 2 }}
            color="secondary"
          >
            S'inscrire
          </Button>
          <Grid>
            <Link
              to="/connexion"
              className="link"
              onClick={() => {
                dispatch(resetSignup());
              }}
            >
              Vous avez déjà un compte? Se connecter
            </Link>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
