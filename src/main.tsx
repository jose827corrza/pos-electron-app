import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import { AppContextProvider } from './context/context.tsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
