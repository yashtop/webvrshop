import React, { Component } from 'react';
import LOCALSTORAGESERVICES from '../../services/LocalStorageServices';
import { Redirect,Route } from 'react-router-dom'
class LogoutComponent extends Component {
  constructor(props) {
    super(props);
    LOCALSTORAGESERVICES({type:'delete'});
  }

  render() {
    return (
      <div className="container-fluid">
          <Redirect to='/login' />
      </div>
    );
  }
}

export default LogoutComponent;
