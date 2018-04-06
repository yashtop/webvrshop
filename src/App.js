import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
 BrowserRouter as Router,
 Route,
 Link,
 Redirect,
 withRouter
} from "react-router-dom";
import Login from "./components/user/Login";
import Home from "./components/user/Home";
import './App.css';
class App extends Component {
  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        console.log(res.data)
      })
  }
  render() {
    return (
      <Router>
      <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <a className="navbar-brand" href="#">WebVR Shop</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link to="/login" className="nav-link">Login</Link>
                <span className="sr-only">(current)</span>

            </li>
            <li className="nav-item">
              <Link to="/home" className="nav-link" >VR Shop</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Order</a>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">User</a>
                <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" >Action</a>
                    <a className="dropdown-item" >Another action</a>
                    <a className="dropdown-item" >Something else here</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">Separated link</a>
                </div>
            </li>
          </ul>
        </div>
    </nav>
    <div className="container pdTop100">
    <Route exact path="/" component={Login} />
    <Route path="/login" component={Login} />
    <Route path="/home" component={Home} />
    </div>
    </div>
    </Router>
    );
  }
}

export default App;
