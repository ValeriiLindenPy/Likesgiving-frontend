"use client";

import { useSelector } from 'react-redux'
import { redirect } from 'next/navigation';



export default function About() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  if (!isAuth) 
    return redirect('/login')


  return (
    <main>
    <h1>About</h1>
      
    </main>
  )
}
