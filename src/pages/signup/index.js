import React, { useRef, useContext, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { register } from '../../api/mutation';

import {
  Avatar,
  Box,
  TextField,
  Link,
  Paper,
  Typography,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@material-ui/core';
import Alert from '../../components/Errorhandler';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import { makeStyles } from '@material-ui/core/styles';
import AuthContext from '../../contexts/AuthContext';
import { LanguageContext } from '../../contexts/LangContext';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage:
      'url(https://images.unsplash.com/photo-1621264448270-9ef00e88a935?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=608&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  input: {
    color: 'red'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#1467af',
    color: '#fff'
  },
  select: {
    display: 'flex',
    alignItems: 'center'
  },
  selectLabel: {
    marginRight: 5
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const Register = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const { setAuth } = useContext(AuthContext);
  const context = useContext(LanguageContext);
  const [message, setMessage] = useState('');
  const [language, setLanguage] = useState(null);

  const classes = useStyles();

  const [registerFunc] = useMutation(register, {
    onError: (err) => {
      setMessage(err.message);
      console.log(err);
    },
    onCompleted: (data) => {
      setAuth(data.signup);
      context.selectLanguage(language);
      history.push('/');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      passwordRef.current.value ||
      emailRef.current.value ||
      nameRef.current.value
    ) {
      registerFunc({
        variables: {
          signupPassword: passwordRef.current.value,
          signupEmail: emailRef.current.value,
          signupUsername: nameRef.current.value,
          lang: language
        }
      });
    } else {
      setMessage('Please fill up the required fields below');
    }
  };

  const handleLanguage = (e) => {
    context.selectLanguage(e.target.value);
    setLanguage(e.target.value);
  };

  const clearMessage = () => {
    setMessage('');
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PermContactCalendarIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            <FormattedMessage id="app.signup" defaultMessage="Sign up" />
          </Typography>
          {message ? (
            <Alert
              className={classes.alert}
              message={message}
              clearMessage={clearMessage}
              severity="error"
            />
          ) : (
            ''
          )}
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label={
                <FormattedMessage
                  id="app.username"
                  defaultMessage="User name"
                />
              }
              name="username"
              autoComplete="username"
              autoFocus
              className={classes.input}
              inputRef={nameRef}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label={
                <FormattedMessage
                  id="app.email"
                  defaultMessage="Email Address"
                />
              }
              name="email"
              autoComplete="email"
              inputRef={emailRef}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label={
                <FormattedMessage id="app.password" defaultMessage="Password" />
              }
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={passwordRef}
            />
            <Box component="div" className={classes.select}>
              <FormControl className={classes.formControl}>
                <InputLabel
                  id="demo-simple-select-label"
                  className={classes.selectLabel}
                >
                  Language:
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={context.locale}
                  onChange={handleLanguage}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="ja">Japanese</MenuItem>
                  <MenuItem value="ph">Filipino</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              <FormattedMessage id="app.signup" defaultMessage="Sign up" />
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/login">
                  {
                    <FormattedMessage
                      id="app.toSignIn"
                      defaultMessage="Already have an account? Sign In"
                    />
                  }
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Register;
