import React, { useRef, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { register } from '../../api/mutation';

import {
  Avatar,
  TextField,
  Link,
  Paper,
  Typography,
  Button,
  Grid
} from '@material-ui/core';
import Alert from '../../components/Errorhandler';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import { makeStyles } from '@material-ui/core/styles';
import AuthContext from '../../contexts/AuthContext';

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
  }
}));

const Register = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const { setAuth } = useContext(AuthContext);
  const [message, setMessage] = useState('');

  const classes = useStyles();

  const [registerFunc] = useMutation(register, {
    onError: (err) => {
      setMessage(err.message);
      console.log(err);
    },
    onCompleted: (data) => {
      setAuth(data.signup);
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
          signupUsername: nameRef.current.value
        }
      });
    } else {
      setMessage('Please fill up the required fields below');
    }
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
            Sign Up
          </Typography>
          {message ? (
            <Alert
              className={classes.alert}
              message={message}
              clearMessage={clearMessage}
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
              label="User name"
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
              label="Email Address"
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
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={passwordRef}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="#primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/login">{'Already have an account? Sign Ip'}</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Register;
