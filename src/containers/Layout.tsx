import React from 'react'

export const Layout = ({children}) => {
  return (
    <div className='w-full h-screen px-2 bg-slate-200 p-4'>
        {children}
    </div>
  )
}
