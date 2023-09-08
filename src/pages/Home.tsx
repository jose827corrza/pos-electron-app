import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { getStoreCustomers, getStoreCustomersByRef } from '../firebase/datastore'
import { appContext } from 'src/context/context';

export const Home = () => {
  const navigate = useNavigate();
  const { uid } = useContext(appContext);

  useEffect(() => {
    (async() => {
      const customers = await getStoreCustomers(uid)
      const customerRefs = await getStoreCustomersByRef(uid);
      console.log(customers);
      console.log('-------------');
      console.log(customerRefs);
      
    })()
  },[uid])
  return (
    <div>
      <Link to={'/add'}>Add new customer</Link>
    </div>
  )
}
