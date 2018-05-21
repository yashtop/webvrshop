import axios from 'axios';
import CONF from '../config/config';
const APISERVICES = (data) =>{
  const APIURL = CONF.APIURLS.DEV;
  let url = APIURL;
  let response;
  switch(data.type){
    case 'zetaotprequest':
      url += '/zetanew/requestotp';
      response =  axios.post(url,data.param);
    break;
    case 'zetaotpsubmit':
      url += '/zetanew/verifyotp';
      response =  axios.post(url,data.param);
    break;
    case 'loginrequest':
      url += '/authenticate';
      response =  axios.post(url,data.param);
    break;
    case 'additem':
      url += '/additem';
      response =  axios.post(url,data.param);
    break;
    case 'confirmOrder':
      url += '/confirmOrder';
      response =  axios.post(url,data.param);
    break;
    case 'deletecartitem':
      url += '/deletecartitem';
      response =  axios.post(url,data.param);
    break;
    case 'vrmakepayment':
      url += '/vrmakepayment';
      response =  axios.post(url,data.param);
    break;
    case 'cart':
      url += '/cart?accessToken='+data.param.accessToken+'&orderId='+data.param.orderId;
      response =  axios.get(url,data.param);
    break;
    case 'getproducts':
      url += '/getproducts?accessToken='+data.param.accessToken+'&keyword='+data.param.keyword;
      response =  axios.get(url);
    break;

  }
  return response;
}
export default APISERVICES;
