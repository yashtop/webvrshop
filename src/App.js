import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
 BrowserRouter as Router,
 Route,
 Link,
 Redirect,
 withRouter
} from "react-router-dom";
import DashboardComponent from "./components/user/DashboardComponent";
import PrivateRoute from "./components/user/PrivateRouteComponent";
import LoginComponent from "./components/user/LoginComponent";
import LogoutComponent from "./components/user/LogoutComponent";
import VRComponent from "./components/vr/VRComponent";
import './App.css';
class App extends Component {
  render() {
    return (
    <Router>
    <div>
    <Route exact path="/login" component={LoginComponent} />
    <PrivateRoute exact path="/" component={DashboardComponent} />
    <PrivateRoute path="/dashboard" component={DashboardComponent} />
    <PrivateRoute path="/VR" component={VRComponent}/>
    <PrivateRoute path="/logout" component={LogoutComponent}/>
    </div>
    </Router>
    );
  }
}

export default App;
