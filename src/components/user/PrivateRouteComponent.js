import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import LOCALSTORAGESERVICES from '../../services/LocalStorageServices';
const PrivateRoute = ({ component: Component, ...rest }) => {
  const memData = LOCALSTORAGESERVICES({type:'get'});
  const isLoggedIn = (memData)?true:false;

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}
export default PrivateRoute;
