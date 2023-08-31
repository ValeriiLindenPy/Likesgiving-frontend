"use client";


import { SessionProvider } from 'next-auth/react'
import { CheckWrapper } from './CheckWrapper';

const Provider = ({ children }) => {

  return (
    <SessionProvider>
      <CheckWrapper>
        {children}
      </CheckWrapper>
    </SessionProvider>

  )
}


export default Provider;