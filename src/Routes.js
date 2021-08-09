import React from 'react';
import { Switch } from 'react-router-dom';
import { URL_HELPERS } from './utils/url';
import { GuestRoute, AuthenticatedRoute } from './components/Routes';
import CustomLayout from './layouts/index';
import { login, home, register } from './pages';
const Routes = () => {
  return (
    <Switch>
      <GuestRoute
        component={login}
        layout={CustomLayout}
        path={URL_HELPERS.login}
        exact
      />
      <GuestRoute
        component={register}
        layout={CustomLayout}
        path={URL_HELPERS.register}
        exact
      />
      <AuthenticatedRoute
        component={home}
        layout={CustomLayout}
        path={URL_HELPERS.index}
        exact
      />
    </Switch>
  );
};
export default Routes;
