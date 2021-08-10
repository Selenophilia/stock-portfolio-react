import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from '../../contexts/AuthContext';

const AuthenticatedRoute = ({
  layout: Layout,
  component: Component,
  ...rest
}) => {
  const { state } = useContext(AuthContext);
  const user = localStorage.getItem('accessToken');
  return (
    <Route
      {...rest}
      render={(matchProps) =>
        state.accessToken || user ? (
          <Layout {...matchProps}>
            <Component {...matchProps} />
          </Layout>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

AuthenticatedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  layout: PropTypes.func.isRequired
};

export default AuthenticatedRoute;
