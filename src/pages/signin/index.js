import { useMutation } from '@apollo/client';
import React, { useRef, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../../api/mutation';
import AuthContext from '../../contexts/AuthContext';
import {
  Avatar,
  TextField,
  Link,
  Paper,
  Typography,
  Button,
  Grid
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '../../components/Errorhandler';

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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#1467af'
  },
  alert: {
    width: '40%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}));

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const { setAuth } = useContext(AuthContext);
  const [message, setMessage] = useState(null);

  const classes = useStyles();

  const [loginFunc] = useMutation(login, {
    onError: (err) => {
      setMessage(err.message);
    },
    onCompleted: (data) => {
      setAuth(data.login);
      history.push('/');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailRef.current.value || passwordRef.current.value) {
      loginFunc({
        variables: {
          loginEmail: emailRef.current.value,
          loginPassword: passwordRef.current.value
        }
      });
    } else {
      setMessage('Please include a email and password');
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
