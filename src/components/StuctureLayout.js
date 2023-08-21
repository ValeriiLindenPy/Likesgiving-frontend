
"use client";

import Navbar from '@/components/Navbar'
import { useSelector } from 'react-redux'

export function StuctureLayout({children}) {
  const isAuth = useSelector((state) => state.auth.isAuth);
 
  return (
    <div>
      {isAuth && <Navbar />}
      {children}
    </div>
    );

}
