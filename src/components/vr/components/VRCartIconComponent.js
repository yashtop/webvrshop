import React, { Component } from 'react';

class VRCartIconComponent extends Component {
  showHidePopup = () => {
      const data ={
        type:'showCartPopup'
      }
      this.props.parentMethod(data);
  }
  render() {
    return (
      <a-image src="#cartshow" width="5" height="5"  position="-7.052 13.142 -20.248" rotation="90 0 0" onClick={this.showHidePopup}></a-image>
    );
  }
}

export default VRCartIconComponent;
