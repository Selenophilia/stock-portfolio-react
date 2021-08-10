import React, { useRef, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { register } from '../../api/mutation';
import AuthContext from '../../contexts/AuthContext';
import './index.scss';
const Register = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const { setAuth } = useContext(AuthContext);

  const [registerFunc] = useMutation(register, {
    onCompleted: (data) => {
      setAuth(data.signup);
      history.push('/');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerFunc({
      variables: {
        signupPassword: passwordRef.current.value,
        signupEmail: emailRef.current.value,
        signupUsername: nameRef.current.value
      }
    });
  };

  return (
    <div className="register">
      <form className="registerform" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="user name"
          className="name"
          ref={nameRef}
        />
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
        <button className="register">register</button>
        <p className="message">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
