"use client";


import { SessionProvider } from 'next-auth/react'
import { CheckWrapper } from './CheckWrapper';
import { ReduxProvider } from '@/redux/ReduxProvider';

const Provider = ({ children }) => {

  return (
    <SessionProvider>
      <ReduxProvider>
        <CheckWrapper>
          {children}
        </CheckWrapper>
      </ReduxProvider>
    </SessionProvider>

  )
}


export default Provider;