"use client";

import './globals.css'
import { Inter } from 'next/font/google'
import {StuctureLayout} from '../components/StuctureLayout'
const inter = Inter({ subsets: ['latin'] })
import {ReduxProvider} from '../redux/ReduxProvider'


export const metadata = {
  title: 'MyApp',
  description: 'Generated by create next app',
}



export default function RootLayout({ children }) {
  
  return (
    <html lang="en">

      <body className={inter.className}>
      
      <ReduxProvider>
        <StuctureLayout>
          {children}
        </StuctureLayout>
      </ReduxProvider>
      
      </body>
    </html>
  )
}
