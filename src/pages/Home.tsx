import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { getStoreCustomersByRef, loadStoreCustomers } from '../firebase/datastore'
import { appContext } from '../context/context';

export const Home = () => {
  const { uid } = useContext(appContext);

  useEffect(() => {
    (async() => {
      const customerRefs = await getStoreCustomersByRef(uid);
      const customers = await loadStoreCustomers(customerRefs);
      console.log(customerRefs);
      console.log('-------------');
      console.log(customers);
      
    })()
  },[uid])
  return (
    <div>
      <Link to={'/add'}>Add new customer</Link>
      <Link to={'/get-customers'}>Search a customer</Link>
    </div>
  )
}
