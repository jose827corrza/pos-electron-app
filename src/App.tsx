import {useContext, useEffect} from 'react'



import { appContext } from './context/context'
import { Layout } from './containers/Layout';
import { LoginBox } from './pages/LoginBox'

import {initFirebase } from './firebase/firebase'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { AddCustomer } from './pages/AddCustomer';
import { CustomersList } from './pages/CustomersList';
import { UserProfile } from './pages/UserProfile';

function App() {
  const { setAuthUser } = useContext(appContext);
  
  useEffect(()=>{
    
    const {app, auth} =initFirebase();
    setAuthUser(auth);
    console.log(auth);
  },[])
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<LoginBox />}/>
            <Route path='/home' element={<Home />}/>
            <Route path='/edit-customer/:customerId' element={<AddCustomer />}/>
            <Route path='/add' element={<AddCustomer />}/>
            <Route path='/get-customers' element={<CustomersList />}/>
            <Route path='/my-profile' element={<UserProfile />}/>
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  )
}

export default App
