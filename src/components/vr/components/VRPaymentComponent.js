import React, { Component } from 'react';

class VRPaymentComponent extends Component {
  showHidePopup = () => {
      const data ={
        type:'hidePaymentPopup'
      }
      this.props.parentMethod(data);
  }
  paymentMethod = (methodType) => {
      const data ={
        type:'payment',
        paymentMethod:methodType
      }
      this.props.parentMethod(data);
  }
  render() {
    return (
      <a-plane width="10" height="5" position="0 2 -5" color="white" rotation="0 0 0" opacity="0.2">
        <a-text  position="0 2.1 0.1" align="center" width="10" value="Select the Payment Method" color="#b30e0e"></a-text>
        <a-image  src="#creditcardpay" width="1.5" height="0.75"  position="0 1 0.1" rotation="0 0 0" onClick={() =>this.paymentMethod("CC")}></a-image>
        <a-image  src="#walletpay" width="1.5" height="0.75"  position="0 -0.1 0.1" rotation="0 0 0" onClick={() =>this.paymentMethod("Wallet")}></a-image>
        <a-image  src="#codpay" width="1.5" height="0.75"  position="0 -1.2 0.1" rotation="0 0 0" onClick={() =>this.paymentMethod("COD")}></a-image>
        <a-image  src="#close" width="0.5" height="0.5"  position="4.5 2.1 0.1" rotation="0 0 0" onClick={this.showHidePopup}></a-image>
      </a-plane>
    );
  }
}

export default VRPaymentComponent;
