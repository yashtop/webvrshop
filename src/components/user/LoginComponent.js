import React, { Component } from 'react';
import classnames from 'classnames';
import { Alert,FormGroup,Label,Button,Col,Input } from 'reactstrap';
import APISERVICES from '../../services/APIServices';
import LOCALSTORAGESERVICES from '../../services/LocalStorageServices';
//import logo from '../../assets/images/custom/logo.png';
import { Redirect,Route } from 'react-router-dom';
class LogoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "customer@superdeveloper.com",
      password: "password",
      authUser:false,
      wrongPass:false
    };
  }
  validateForm =()=> {
   return this.state.email.length > 0 && this.state.password.length > 0;
 }
 handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = (event) => {
    const response = APISERVICES({type:'loginrequest',param:{username:this.state.email,password:this.state.password}});
    response.then(res => {
        if(res.data!='Bad credentials.'){
          LOCALSTORAGESERVICES({type:'insert',data:{access_token:res.data.access_token}});
          this.setState({authUser:true});
        }else{
          this.setState({wrongPass:true});
        }
      })
  }
  render() {
    const redirectUrl = (this.state.authUser)?<Redirect to='/dashboard' />:'';
    const failureMsg = (this.state.wrongPass)?<Alert color="danger">Incorrect email or Password! </Alert>:'';
    return (
      <div className="container-fluid">
      {redirectUrl}
      <h2 className="text-success text-center">Login</h2>
      {failureMsg}
      <FormGroup row>
        <Label for="email" sm={2}>Email</Label>
        <Col sm={10}>
          <Input  name="email" id="email" placeholder="Enter the email" type="email" value={this.state.email} onChange={this.handleChange} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="password" sm={2}>Password</Label>
        <Col sm={10}>
          <Input type="password" id="password" name="password"  placeholder="Enter the password"  value={this.state.password} onChange={this.handleChange} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col sm={10}>
          <Input type="button" name="loginbutton" value="Login" className="bg-success text-white" onClick={this.handleSubmit}  />
        </Col>
      </FormGroup>
      </div>
    );
  }
}

export default LogoComponent;
