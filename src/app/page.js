"use client";

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

export default function Home() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const username = useSelector((state) => state.auth.username);


  return (
    <main>

    <h1>Home</h1>
    <br></br>
      
    </main>
  )
}
