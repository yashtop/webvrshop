import CONF from '../config/config';
const LOCALSTORAGESERVICES = (data) =>{
  const storageName = CONF.STORAGENAME;
  let storageData = {};
  switch(data.type){
    case 'insert':
      localStorage.setItem(storageName, JSON.stringify(data.data));
    break;
    case 'update':
      storageData = localStorage.getItem(storageName);
      storageData = JSON.parse(storageData);
      storageData[data.data.name] = data.data.value;
      localStorage.setItem(storageName, JSON.stringify(storageData));
    break;
    case 'delete':
       localStorage.clear();
    break;
    case 'get':
      storageData = localStorage.getItem(storageName);
      return JSON.parse(storageData);
    break;
  }

}
export default LOCALSTORAGESERVICES;
