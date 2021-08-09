import React, { useRef, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import './index.scss';
const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const { state, setAuth } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    //setAuth tokens upon login
    history.push('/');
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
