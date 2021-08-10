import { useMutation } from '@apollo/client';
import React, { useRef, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { login } from '../../api/mutation';
import AuthContext from '../../contexts/AuthContext';
import './index.scss';
const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const { setAuth } = useContext(AuthContext);

  const [loginFunc] = useMutation(login, {
    onCompleted: (data) => {
      setAuth(data.login);
      history.push('/');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginFunc({
      variables: {
        loginEmail: emailRef.current.value,
        loginPassword: passwordRef.current.value
      }
    });
  };

  return (
    <div className="login">
      <form className="loginform" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email address"
          className="email"
          ref={emailRef}
        />
        <input
          type="password"
          placeholder="password"
          className="password"
          ref={passwordRef}
        />
        <button className="signin">Sign in</button>
        <p className="message">
          Not registered? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
