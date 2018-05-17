import React, { Component } from 'react';
import {Entity} from 'aframe-react';
class VRProductComponent extends Component {
  constructor(props) {
      super(props);
  }
  callParentclick = () => {
      const data ={
        index:this.props.compIndex,
        type:'product',
        productData:this.props.porductData
      }
      this.props.parentMethod(data);

  }
  render() {
    const attrData = {
      imgWidth:this.props.attrData.imgWidth,
      imgWidth:this.props.attrData.imgWidth,
      imgPosition:this.props.attrData.imgPosition,
      imgRotation:this.props.attrData.imgRotation,
      txtHeight:this.props.attrData.txtHeight,
      txtWidth:this.props.attrData.txtWidth,
      txtColor:this.props.attrData.txtColor,
      txtPosition:this.props.attrData.txtPosition,
      txtRotation:this.props.attrData.txtRotation,
      srcImg:'#cart',
      txtAlign:'center',
      txtFont:'kelsonsans',
      currency:'Rs.',
      wrapCount:25
    }
    const productData = this.props.porductData
    return (
      <Entity>
      <a-image src={attrData.srcImg} width={attrData.imgWidth}  height={attrData.imgWidth}  position={attrData.imgPosition} rotation={attrData.imgRotation} onClick={this.callParentclick}></a-image>
      <a-text warpCount={attrData.wrapCount} font={attrData.txtFont} value={attrData.currency+' '+productData.product_price} width={attrData.txtWidth} height={attrData.txtHeight}  position={attrData.txtPosition} rotation={attrData.txtRotation} align={attrData.txtAlign} color={attrData.txtColor}></a-text>
      </Entity>
    );
  }
}

export default VRProductComponent;
