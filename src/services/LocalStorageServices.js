import CONF from '../config/config';
const LOCALSTORAGESERVICES = (data) =>{
  const storageName = CONF.STORAGENAME;
  switch(data.type){
    case 'insert':
      localStorage.setItem(storageName, JSON.stringify(data.data));
    break;
    case 'delete':
       localStorage.clear();
    break;
    case 'get':
      const storageData = localStorage.getItem(storageName);
      return JSON.parse(storageData);
    break;
  }

}
export default LOCALSTORAGESERVICES;
