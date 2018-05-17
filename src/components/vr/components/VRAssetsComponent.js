import React, { Component } from 'react';
import apparel_sky from '../../../assets/images/sky/apparel_sky.jpg';
import grocery_sky from '../../../assets/images/sky/grocery_sky.jpg';
import electronic_sky from '../../../assets/images/sky/electronic_sky.jpg';
import cart from '../../../assets/images/custom/cart.png';
import plus from '../../../assets/images/custom/plus.png';
import minus from '../../../assets/images/custom/minus.png';
import pay from '../../../assets/images/custom/pay.png';
import close from '../../../assets/images/custom/close.png';
import cartshow from '../../../assets/images/custom/cartshow.png';
import creditcardpay from '../../../assets/images/custom/creditcardpay.png';
import walletpay from '../../../assets/images/custom/walletpay.png';
import codpay from '../../../assets/images/custom/codpay.png';

class VRAssetsComponent extends Component {
  render() {
    return (
    <a-assets>
      <img id="apparel_sky" src={apparel_sky} alt="apparel_sky"/>
      <img id="grocery_sky" src={grocery_sky} alt="grocery_sky"/>
      <img id="electronic_sky" src={electronic_sky} alt="electronic_sky"/>
      <img id="cart" src={cart} alt="cart"/>
      <img id="plus" src={plus} alt="plus"/>
      <img id="minus" src={minus} alt="minus"/>
      <img id="pay" src={pay} alt="pay"/>
      <img id="close" src={close} alt="close"/>
      <img id="cartshow" src={cartshow} alt="cartshow"/>
      <img id="creditcardpay" src={creditcardpay} alt="creditcardpay"/>
      <img id="walletpay" src={walletpay} alt="walletpay"/>
      <img id="codpay" src={codpay} alt="codpay"/>
    </a-assets>
    );
  }
}

export default VRAssetsComponent;
