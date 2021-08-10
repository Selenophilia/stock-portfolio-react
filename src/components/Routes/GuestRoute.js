import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const GuestRoute = ({ layout: Layout, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Layout {...matchProps}>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

GuestRoute.propTypes = {
  component: PropTypes.func.isRequired,
  layout: PropTypes.func.isRequired
};

export default GuestRoute;
