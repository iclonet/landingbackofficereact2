import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Redirect
} from 'react-router-dom';
import Session from '../utils/Session';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Session.isAuthenticated() ? (
      <Component {...props} />
    ) : (
        <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }} />
      )
  )} />
)
PrivateRoute.propTypes = {
  location: PropTypes.any,
  component: PropTypes.any
}

export default PrivateRoute;
