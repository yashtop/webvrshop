import React, { Component } from 'react';
class VRMenuComponent extends Component {
  callParentclick = () => {
      const data ={
        index:this.props.compIndex,
        type:'menu'
      }
      this.props.parentMethod(data);

  }
  render() {
    const attrData = {
      width:this.props.attrData.width,
      height:this.props.attrData.height,
      position:this.props.attrData.position,
      color:this.props.attrData.color,
      rotation:this.props.attrData.rotation,
      opacity:this.props.attrData.opacity
    }
    const attrTextData = {
      position:"0 0 .02",
      align:"center",
      width:10,
      opacity:1,
      name:this.props.name
    }
    return (
      <a-plane  width={attrData.width} height={attrData.height} position={attrData.position} color={attrData.color} rotation={attrData.rotation} opacity={attrData.opacity} onClick={this.callParentclick}>
        <a-text  position={attrTextData.position} align={attrTextData.align} width={attrTextData.width}  opacity={attrTextData.opacity} value={attrTextData.name}></a-text>
      </a-plane>
    );
  }
}

export default VRMenuComponent;
