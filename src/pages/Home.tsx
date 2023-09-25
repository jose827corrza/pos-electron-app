import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { getStoreCustomersByRef, loadStoreCustomers } from '../firebase/datastore'
import { appContext } from '../context/context';

export const Home = () => {
  const { uid, auth } = useContext(appContext);

  useEffect(() => {
    (async() => {
      const customerRefs = await getStoreCustomersByRef(uid);
      const customers = await loadStoreCustomers(customerRefs);
      console.log(customerRefs);
      console.log('-------------');
      console.log(customers);
      // console.log(auth);
      
    })()
  },[uid])
  return (
    <div className='flex'>
      <Link to={'/add'} className='px-3'>Add new customer</Link>
      <Link to={'/get-customers'} className='px-3'>Search a customer</Link>
      <Link to={'/my-profile'} className='px-3'>My Profile</Link>
    </div>
  )
}
