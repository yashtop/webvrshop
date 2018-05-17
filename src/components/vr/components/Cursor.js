import {Entity} from 'aframe-react';
import React from 'react';

export default props => {
  return (
    <Entity position="0 0 -3" scale="0.2 0.2 0.2"  geometry="primitive: ring; radiusOuter: 0.20;radiusInner: 0.10;" material="color: #990000; shader: flat" cursor="fuse: true">
    <a-animation begin="click" easing="ease-in" attribute="scale" fill="backwards" from="0.1 0.1 0.1" to="1 1 1" dur="150" />
    <a-animation begin="fusing"  easing="ease-in" attribute="scale" fill="forwards" from="1 1 1" to="0.2 0.2 0.2" dur="1500"/>
    </Entity>
  );
}
