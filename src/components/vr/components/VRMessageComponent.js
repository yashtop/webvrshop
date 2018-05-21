import React, { Component } from 'react';

class VRMessageComponent extends Component {
  showHidePopup = () => {
      const data ={
        type:'hideMessagePopup'
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
    const message = this.props.message;
    const orderId = this.props.orderId;
    return (
      <a-plane width="10" height="2.5" position="0 1 -5" color="white" rotation="0 0 0" opacity="0.2">
        <a-text  position="0 0.8 0.1" align="center" width="12" value="Order Confirmation" color="#b30e0e"></a-text>
        <a-text  position="0 0 0.1" align="center" width="10" value={message} color="green"></a-text>
        <a-text  position="0 -0.6 0.1" align="center" width="10" value={orderId} color="green"></a-text>

        <a-image  src="#close" width="0.5" height="0.5"  position="4.5 0.9 0.1" rotation="0 0 0" onClick={this.showHidePopup}></a-image>
      </a-plane>
    );
  }
}

export default VRMessageComponent;
