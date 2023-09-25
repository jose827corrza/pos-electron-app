// import { useState } from 'react'
import {useContext, useState} from 'react'

// import 'dotenv/config'

import { appContext } from './context/context'
import { Layout } from './containers/Layout';
import { LoginBox } from './pages/LoginBox'

import {initFirebase } from './firebase/firebase'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { AddCustomer } from './pages/AddCustomer';
import { CustomersList } from './pages/CustomersList';

function App() {
  // const [count, setCount] = useState(0)
  const {incrementCount, count, Auth } = useContext(appContext);
  const {app, auth} =initFirebase();
  
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
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  )
}

export default App
