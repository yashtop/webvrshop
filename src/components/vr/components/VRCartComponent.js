import React, { Component } from 'react';
class VRCartComponent extends Component {
  showHidePopup = () => {
      const data ={
        type:'hideCartPopup'
      }
      this.props.parentMethod(data);
  }
  addCartProduct = (index) => {
    const data ={
      type:'product',
      productData:this.props.cartProduct[index]
    }
    this.props.parentMethod(data);
  }
  removeCartProduct = (index) => {
    const data ={
      type:'removeProduct',
      productData:this.props.cartProduct[index]
    }
    this.props.parentMethod(data);
  }
  cartPayment = (index) => {
    const data ={
      type:'cartPayment'
    }
    this.props.parentMethod(data);
  }

  render() {
    const cartData = this.props.cartProduct;
    const cartTotalPrice = this.props.cartTotalPrice;
    const posRow = [1.3,0.8,0.3,-0.2,-0.7];
    const payButton = (cartData.length>0)?<a-image  src="#pay" width="1" height="0.5"  position="4 -2 0.1" rotation="0 0 0"  onClick={this.cartPayment}></a-image>:'';
    return (
      <a-plane width="10" height="5" position="0 2 -5" color="white" rotation="0 0 0" opacity="0.2">
        <a-text  position="0 2.1 0.1" align="center" width="10" scale="1.2 1.2 0"  value="Cart" color="#b30e0e"></a-text>
        <a-entity>
          <a-text  position="-4 1.7 0.11" align="left" width="5"   value="Product Name"  color="black"></a-text>
          <a-text  position="0.5 1.7 0.1" align="left" width="5"  value="Qty"  color="black"></a-text>
          <a-text  position="1.5 1.7 0.1" align="left" width="5"   value="Price" color="black"></a-text>
          <a-text  position="2.5 1.7 0.11" align="left" width="5"   value="Total"  color="black"></a-text>
        </a-entity>
        <a-entity>
            {cartData.map((product,index) =>
              <a-entity key={'cartProduct'+index} >
              <a-image src="#plus" width="0.4" height="0.4"  position={'-4.5 '+ posRow[index]+' 0.1' } rotation="0 0 0" onClick={() =>this.addCartProduct(index)}></a-image>
              <a-text  position={'-4 '+ posRow[index]+' 0.1' } align="left" width="5"   value={product.product_name}  color="#b30e0e"></a-text>
              <a-text  position={'0.5 '+ posRow[index]+' 0.1' }  align="left" width="5"  value={product.qty}  color="#b30e0e"></a-text>
              <a-text  position={'1.5 '+ posRow[index]+' 0.1' } align="left" width="5" value={product.product_price} color="#b30e0e"></a-text>
              <a-text  position={'2.5 '+ posRow[index]+' 0.1' } align="left" width="5"  value={product.total_price}  color="#b30e0e"></a-text>
              <a-image src="#minus" width="0.4" height="0.4"  position={'4.5 '+ posRow[index]+' 0.1' } rotation="0 0 0" onClick={() =>this.removeCartProduct(index)}></a-image>
              </a-entity>
            )

            }
        </a-entity>
        <a-entity>
          <a-entity>
            <a-text  position="1  -1.5 0.1" align="left" width="5"  value="Grand Total"  color="black"></a-text>
            <a-text id="grandTotal" position="2.5  -1.5 0.1" align="left" width="5"   value={'Rs.'+cartTotalPrice} color="black"></a-text>
          </a-entity>
        <a-entity>
          {payButton}
          <a-image  src="#close" width="0.5" height="0.5"  position="4.5 2 0.1" rotation="0 0 0" onClick={this.showHidePopup}></a-image>


        </a-entity>
      </a-entity>
      </a-plane>
    );
  }
}

export default VRCartComponent;
