import 'aframe';
import 'aframe-particle-system-component';
import Assets from 'aframe-react-assets';
import {Scene} from 'aframe-react';
import React, { Component } from 'react';
import VRAssetsComponent from './components/VRAssetsComponent';
import VRMenuComponent from './components/VRMenuComponent';
import VRProductComponent from './components/VRProductComponent';
import VRCartComponent from './components/VRCartComponent';
import VRCartIconComponent from './components/VRCartIconComponent';
import VRPaymentComponent from './components/VRPaymentComponent';
import VRMessageComponent from './components/VRMessageComponent';
import Camera from './components/Camera';
import Cursor from './components/Cursor';
import Sky from './components/Sky';
import APISERVICES from '../../services/APIServices';
import LOCALSTORAGESERVICES from '../../services/LocalStorageServices';
import CONF from '../../config/config';
class VRComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {'menuData':[{'width':4,'height':2,'position':'10.227 12.368 -2','color':'#000','rotation':'0 -90 0','opacity':0.5},
    {'width':4,'height':2,'position':'10.227  9.368 -2','color':'#000','rotation':'0 -90 0','opacity':0.5},
    {'width':4,'height':2,'position':'10.227 6.368 -2','color':'#000','rotation':'0 -90 0','opacity':0.5}],
    'productAttr':[
      {'imgHeight':5,'imgWidth':5,'imgPosition':'1.873 -25.530 97.375','imgRotation':'0 135 0','txtHeight':35,'txtWidth':70,'txtPosition':'-0.394 -20.213 97.676','txtRotation':'0 135 0','txtColor':'white'},
      {'imgHeight':5,'imgWidth':5,'imgPosition':'-125.387 -10 -31.593','imgRotation':'0 90 0','txtHeight':60,'txtWidth':120,'txtPosition':'-130.387 -5.241 -33.465','txtRotation':'0 90 0','txtColor':'blue'},
      {'imgHeight':10,'imgWidth':10,'imgPosition':'-151.265 -61.731 -68.239','imgRotation':'90 0 0','txtHeight':35,'txtWidth':70,'txtPosition':'-75.330 -25.167 -34.154','txtRotation':'0 90 0','txtColor':'yellow'},
      {'imgHeight':20,'imgWidth':20,'imgPosition':'33.080 -12.162 -344.808','imgRotation':'0 0 0','txtHeight':150,'txtWidth':300,'txtPosition':'45.782 4.142 -526.768','txtRotation':'0 0 0','txtColor':'white'},
      {'imgHeight':10,'imgWidth':10,'imgPosition':'242.443 -18.350 1.283','imgRotation':'0 90 0','txtHeight':50,'txtWidth':100,'txtPosition':'237.141 -8.437 1.450','txtRotation':'0 -90 0','txtColor':'white'}
     ],
     cartProduct:[],
     productData:[],
     cartId:'',
     cartTotalPrice:0,
     currentIndex:1,
     activeSky:'#electronic_sky',
     cartPopupShow:false,
     paymentPopupShow:false,
     messagePopupShow:false,
     successMessage:'Order Id:'
    };
    this.storeMenu = [{'name':'Grocery'},
                {'name':'Electronics'},
                {'name':'Apparel'}];

  }
  componentDidMount() {
    const memData = LOCALSTORAGESERVICES({type:'get'});
    const response = APISERVICES({type:'getproducts',param:{accessToken:memData.access_token,keyword:'SDStore'}});
    response.then((res => {
      const productData = this.productData(res.data._element);
      this.setState({productData:productData})
    }));
  }
  productData = (data) =>{
    const computeData = [];
    for (let i=0; i < data.length; i++) {
      let product = data[i]._definition[0];
      let product_id = data[i]._price[0].self;
      product_id = product_id.uri.split('/');
      product_id = product_id[4];
      let product_price = data[i]._price[0];
      product_price = product_price['purchase-price'];
      product_price = product_price[0].amount * CONF.USDTORS;
      computeData.push({'product_name':product['display-name'],product_id:product_id,product_price:product_price})
    }
    return computeData;
  }
  addCartItem = (data) => {
    const cartProduct = this.state.cartProduct;
    if(cartProduct.length>=5) return;
    let cartTotalPrice = this.state.cartTotalPrice;
    const index = cartProduct.findIndex(product => product.product_id==data.product_id);
    if(index>-1){
      data.qty += 1;
      data.total_price = data.product_price * data.qty;
      cartProduct[index]=data;
    }else{
      data.qty = 1;
      data.total_price = data.product_price;
      cartProduct.push(data);
      }
      cartTotalPrice += data.product_price;
      const memData = LOCALSTORAGESERVICES({type:'get'});
      const response = APISERVICES({type:'additem',param:{accessToken:memData.access_token,quantity:1,guid:data.product_id}});
      response.then((res => {
        this.setState({
          cartProduct:cartProduct,
          cartTotalPrice:cartTotalPrice,
          cartId:res.data.cartId
        })
      }));

  }
  removeCartItem = (data) => {
    const cartProduct = this.state.cartProduct;
    let cartTotalPrice = this.state.cartTotalPrice;
    const index = cartProduct.findIndex(product => product.product_id==data.product_id);
    if(index>-1){
      cartTotalPrice -= data.product_price;
      data.total_price -= data.product_price;
      data.qty -= 1;
      if(data.qty==0){
        cartProduct.splice(index,1);
      }else{
        cartProduct[index] = data;
      }
      this.setState({
        cartProduct:cartProduct,
        cartTotalPrice:cartTotalPrice
      })
    }

  }
  payment = () => {
    const memData = LOCALSTORAGESERVICES({type:'get'});
    const cartResponse = APISERVICES({type:'cart',param:{accessToken:memData.access_token,cartId:this.state.cartId}});
    cartResponse.then((res => {
      const response = APISERVICES({type:'confirmOrder',param:{accessToken:memData.access_token,orderId:res.data.orderId}});
      response.then((res => {
        this.setState({
          cartTotalPrice:0,
          paymentPopupShow:false,
          messagePopupShow:true,
          cartProduct:[],
          successMessage:'Order Id - '+res.data['purchase-number']
        })
      }))
    }));

  }

  handleClick = (data) => {
  /*const menuData = [[{'width':4,'height':2,'position':'-21.313 9.362 -0.960','color':'#000','rotation':'0 90 0','opacity':0.5},
  {'width':4,'height':2,'position':'-21.313  6.362 -0.960','color':'#000','rotation':'0 90 0','opacity':0.5},
  {'width':4,'height':2,'position':'-21.313 3.362 -0.960','color':'#000','rotation':'0 90 0','opacity':0.5}],
  [{'width':4,'height':2,'position':'15.227 5.368 10','color':'#000','rotation':'0 -180 0','opacity':0.5},
  {'width':4,'height':2,'position':'15.227  2.368 10','color':'#000','rotation':'0 -180 0','opacity':0.5},
  {'width':4,'height':2,'position':'15.227 -0.368 10','color':'#000','rotation':'0 -180 0','opacity':0.5}],
  [{'width':4,'height':2,'position':'10.227 12.368 -2','color':'#000','rotation':'0 -90 0','opacity':0.5},
  {'width':4,'height':2,'position':'10.227  9.368 -2','color':'#000','rotation':'0 -90 0','opacity':0.5},
  {'width':4,'height':2,'position':'10.227 6.368 -2','color':'#000','rotation':'0 -90 0','opacity':0.5}]]*/
  /*const productData = [[{"product_id":"grcoery_101","product_name":"Large Variety Box","product_price":180},
  {"product_id":"grcoery_102","product_name":"Egg Box","product_price":100},
  {"product_id":"grcoery_103","product_name":"Warburtons Bread","product_price":60},
  {"product_id":"grcoery_104","product_name":"chicken Cubes","product_price":550},
  {"product_id":"grcoery_105","product_name":"Kigsmill Chips","product_price":100}],

  [{"product_id":"electronic_101","product_name":"Samsung LED 64 inch","product_price":65000},
  {"product_id":"electronic_102","product_name":"Philips Music System","product_price":10000},
  {"product_id":"electronic_103","product_name":"Philips Speaker","product_price":7500},
  {"product_id":"electronic_104","product_name":"Sony Headphone","product_price":550},
  {"product_id":"electronic_105","product_name":"Apple Computer AIR","product_price":125000}],

  [{'product_id':'apparel_101','product_name':'Provogue Ladies Top','product_price':5000},
  {'product_id':'apparel_102','product_name':'Ladies Long Boot','product_price':1000},
  {'product_id':'apparel_103','product_name':'Ladies Kurthi','product_price':6000},
  {'product_id':'apparel_104','product_name':'Blue Ladies Top','product_price':5500},
  {'product_id':'apparel_105','product_name':'Ladies Long Boot XL','product_price':2500}]];
  const productAttr = [[{'imgHeight':150,'imgWidth':150,'imgPosition':'-727.177 -827.734 -1915.079','imgRotation':'0 0 0','txtHeight':100,'txtWidth':600,'txtPosition':'-228.651 -211.241 -584.409','txtRotation':'0 0 0','txtColor':'yellow'},
  {'imgHeight':5,'imgWidth':5,'imgPosition':'-58.878 -20.080 -30.587','imgRotation':'0 0 0','txtHeight':10,'txtWidth':80,'txtPosition':'-65.330 -18.167 -34.154','txtRotation':'0 0 0','txtColor':'yellow'},
  {'imgHeight':10,'imgWidth':10,'imgPosition':'1.873 -25.530 97.375','imgRotation':'0 180 0','txtHeight':10,'txtWidth':80,'txtPosition':'1.883 -15.540 97.375','txtRotation':'0 180 0','txtColor':'white'},
  {'imgHeight':5,'imgWidth':5,'imgPosition':'-125.387 -10 -31.593','imgRotation':'0 90 0','txtHeight':15,'txtWidth':100,'txtPosition':'-130.387 -5.241 -33.465','txtRotation':'0 90 0','txtColor':'yellow'},
  {'imgHeight':30,'imgWidth':30,'imgPosition':'131.685 2.360 262.032','imgRotation':'0 90 0','txtHeight':20,'txtWidth':250,'txtPosition':'109.936 22.391 219.831','txtRotation':'0 -90 0','txtColor':'yellow'}],

  [{'imgHeight':20,'imgWidth':20,'imgPosition':'33.080 -12.162 -344.808','imgRotation':'0 0 0','txtHeight':150,'txtWidth':300,'txtPosition':'45.782 4.142 -526.768','txtRotation':'0 0 0','txtColor':'white'},
  {'imgHeight':10,'imgWidth':10,'imgPosition':'-151.265 -61.731 -68.239','imgRotation':'90 0 0','txtHeight':35,'txtWidth':70,'txtPosition':'-75.330 -25.167 -34.154','txtRotation':'0 90 0','txtColor':'yellow'},
  {'imgHeight':5,'imgWidth':5,'imgPosition':'1.873 -25.530 97.375','imgRotation':'0 135 0','txtHeight':35,'txtWidth':70,'txtPosition':'-0.394 -20.213 97.676','txtRotation':'0 135 0','txtColor':'white'},
  {'imgHeight':5,'imgWidth':5,'imgPosition':'-125.387 -10 -31.593','imgRotation':'0 90 0','txtHeight':60,'txtWidth':120,'txtPosition':'-130.387 -5.241 -33.465','txtRotation':'0 90 0','txtColor':'blue'},
  {'imgHeight':10,'imgWidth':10,'imgPosition':'242.443 -18.350 1.283','imgRotation':'0 90 0','txtHeight':50,'txtWidth':100,'txtPosition':'237.141 -8.437 1.450','txtRotation':'0 -90 0','txtColor':'white'}],

  [{'imgHeight':20,'imgWidth':20,'imgPosition':'-30.811 36.894 260.126','imgRotation':'0 0 0','txtHeight':125,'txtWidth':250,'txtPosition':'-30.811 53 260.126','txtRotation':'0 180 0','txtColor':'#000066'},
  {'imgHeight':10,'imgWidth':10,'imgPosition':'-95.395 -140.336 -70.637','imgRotation':'90 0 0','txtHeight':50,'txtWidth':100,'txtPosition':'-89.395 -125.336 -70.637','txtRotation':'-90 0 0','txtColor':'#000066'},
  {'imgHeight':10,'imgWidth':10,'imgPosition':'-160.866 -32.312 -83.6657','imgRotation':'0 0 0','txtHeight':75,'txtWidth':150,'txtPosition':'-136.380 -19.025 -70.637','txtRotation':'0 0 0','txtColor':'#000066'},
  {'imgHeight':5,'imgWidth':5,'imgPosition':'-130.387 -5.241 -33.465','imgRotation':'0 90 0','txtHeight':50,'txtWidth':80,'txtPosition':'-130.387 -9.241 -33.465','txtRotation':'0 90 0','txtColor':'white'},
  {'imgHeight':10,'imgWidth':10,'imgPosition':'-260.265 -60.0256 136.291','imgRotation':'0 90 0','txtHeight':35,'txtWidth':70,'txtPosition':'-95.901 -17.652 49.470','txtRotation':'0 90 0','txtColor':'black'}]
] */

   switch(data.type){
     case 'menu':
     /*const skySrcArr = ['#grocery_sky','#electronic_sky','#apparel_sky'];
     const skySrc = skySrcArr[data.index];
     const selectMenuData = menuData[data.index];
     const selectProductData = productData[data.index];
     const selectproductAttr = productAttr[data.index];
     this.setState({
         activeSky:skySrc,
         menuData:selectMenuData,
         productData:selectProductData,
         productAttr:selectproductAttr
     });*/
     break;
     case 'product':
      this.addCartItem(data.productData);
      this.setState({cartPopupShow:true});
      this.setState({paymentPopupShow:false});
      this.setState({messagePopupShow:false});
     break;
     case 'hideCartPopup':
      this.setState({cartPopupShow:false});
     break;
     case 'showCartPopup':
      this.setState({cartPopupShow:true});
     break;
     case 'hidePaymentPopup':
      this.setState({paymentPopupShow:false});
     break;
     case 'hideMessagePopup':
      this.setState({messagePopupShow:false});
     break;
     case 'removeProduct':
      this.removeCartItem(data.productData);
     break;
     case 'cartPayment':
      this.setState({cartPopupShow:false});
      this.setState({paymentPopupShow:true});
     break;
     case 'payment':
      this.payment();
     break;

   }
 }
  render() {
    /*const menuItems = this.storeMenu.map((menu,index) =>
      <VRMenuComponent key={'menu'+index} name={menu.name} attrData={this.state.menuData[index]} parentMethod={this.handleClick} compIndex={index}/>
    );*/
    const productItems = this.state.productData.map((product,index) =>
      <VRProductComponent key={'product'+index} porductData={this.state.productData[index]} attrData={this.state.productAttr[index]} parentMethod={this.handleClick} compIndex={index} />
    );
    const cartPopup = (this.state.cartPopupShow) ? <VRCartComponent parentMethod={this.handleClick} cartProduct={this.state.cartProduct} cartTotalPrice={this.state.cartTotalPrice} /> : '';
    const cartPopupIcon = <VRCartIconComponent parentMethod={this.handleClick} />
    const paymentPopup = (this.state.paymentPopupShow) ? <VRPaymentComponent parentMethod={this.handleClick} /> :'';
    const messagePopup = (this.state.messagePopupShow) ? <VRMessageComponent orderId={this.state.successMessage} message="Payment has been made successfully." parentMethod={this.handleClick} /> :'';
    return (
        <Scene>
        <Sky src={this.state.activeSky}/>
        <VRAssetsComponent />
        {cartPopupIcon}
        {/*menuItems*/}
        {productItems}
        {cartPopup}
        {paymentPopup}
        {messagePopup}
          <Camera><Cursor/></Camera>
        </Scene>
      )
    }
  }
export default VRComponent;
