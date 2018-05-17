import React, { Component } from 'react';
import classnames from 'classnames';
import { Alert,TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Form, FormGroup, Label, Input, FormText,Col } from 'reactstrap';
import APISERVICES from '../../services/APIServices';
import { Redirect,Route } from 'react-router-dom'
class DashboardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {'walletData':{'optshow':false,'showform':true,activeTab: '1'},
    'mobilenumber':'8884222248','otp':'','activeTab':'1',showVRButton:false,redireVR:false,successMsg:false};
    this.requestID ='';

  }
  toggle = (tab) => {
   if (this.state.activeTab !== tab) {
     this.setState({
       activeTab: tab
     });
   }
 }
 handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  getWalletOTP = () => {
    const walletData = {'optshow':true,'showform':true};
    const response = APISERVICES({type:'zetaotprequest',param:{ mobileNumber:this.state.mobilenumber }});
    response.then(res => {
        this.requestID = res.data.requestID;
    })
    this.setState({
      walletData:walletData
    })
  }
  submitWalletOTP = () => {
    const requestData = {requestID:this.requestID,mobileNumber:this.state.mobilenumber,otp:this.state.otp};
    const response = APISERVICES({type:'zetaotpsubmit',param:requestData});
    response.then(res => {
        this.setState({showVRButton:true,successMsg:true})
    })
  }
  shopRedirect = () => {
    this.setState({redireVR:true});
  }
  render() {
    const successMsg = (this.state.successMsg)?<Alert color="success">Zeta wallet has been added successfully.</Alert>:'';
    const redirectShop = (this.state.redireVR)?<Redirect to='/vr' />:'';
    const walletData = this.state.walletData;
    const showVRButton = (this.state.showVRButton)?<div><FormGroup row>
      <Col sm={10}>
        <Button color="danger"   size="lg" block active onClick={this.shopRedirect}>Go To Shoping..</Button>
      </Col>
    </FormGroup></div>:'';
    const walletOTPView = (walletData.optshow)?<div>
    <FormGroup row>
      <Label for="otp" sm={2}>OTP</Label>
      <Col sm={10}>
        <Input type="text" name="otp" id="otp" placeholder="enter received otp" value={this.state.otp} onChange={this.handleChange}/>
      </Col>
    </FormGroup>
    <FormGroup row>
      <Col sm={10}>
        <Button color="success"   onClick={this.submitWalletOTP} >Submit</Button>
      </Col>
    </FormGroup></div>:'';
    const walletMobileButton =  (!walletData.optshow)?<div><FormGroup row>
       <Col sm={10}>
         <Button color="primary"   onClick={this.getWalletOTP}>Get OTP</Button>
       </Col>
     </FormGroup></div>:'';
    return (
      <div className="container-fluid">
      {redirectShop}
      <h2 className="text-success text-center">Welcome To VR Shop</h2>
      <p className="text-primary text-center">Please add your payment method.</p>
      <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}>
              Wallet
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Credit Card
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
              <h4 className="text-primary text-center">Zeta Wallet</h4>
                {successMsg}
              <Form>
               <FormGroup row>
                 <Label for="mobilenumber" sm={2}>Zeta Registered Mobile Number</Label>
                 <Col sm={10}>
                   <Input type="text" name="mobilenumber" id="mobilenumber" placeholder="Enter mobile number" onChange={this.handleChange} value={this.state.mobilenumber}/>
                 </Col>
               </FormGroup>
               {walletMobileButton}
               {walletOTPView}
               </Form>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
              <h4 className="text-primary text-center">Credit Card</h4>
              <p>Your credit card is already authorized.</p>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
        {showVRButton}
      </div>
    );
  }
}

export default DashboardComponent;
