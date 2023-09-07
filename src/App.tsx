// import { useState } from 'react'
import {useContext, useState} from 'react'

import { appContext } from './context/context'
import { Layout } from './containers/Layout';
import { LikeButton } from './components/LikeButton';

function App() {
  // const [count, setCount] = useState(0)
  const {incrementCount, count } = useContext(appContext);
  return (
    <>
      {/* <Layout> */}
        <LikeButton />
      {/* </Layout> */}
    </>
  )
}

export default App
