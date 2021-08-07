import React from 'react';
import { Switch } from 'react-router-dom';
import { URL_HELPERS } from './utils/url';
import { GuestRoute, AuthenticatedRoute } from './components/Routes';
import CustomLayout from './layouts/index';
import { Login, Home } from './pages';
const Routes = () => {
  return (
    <Switch>
      <GuestRoute
        component={Login}
        layout={CustomLayout}
        path={URL_HELPERS.login}
        exact
      />
      <AuthenticatedRoute
        component={Home}
        layout={CustomLayout}
        path={URL_HELPERS.index}
        exact
      />
    </Switch>
  );
};
export default Routes;
