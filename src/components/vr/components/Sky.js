import {Entity} from 'aframe-react';
import React, { Component } from 'react';
class Sky extends Component {
  constructor(props) {
      super(props);
  }
  render() {

    return (
      <Entity primitive="a-sky" src={this.props.src} />
    );
  }
}

export default Sky;
