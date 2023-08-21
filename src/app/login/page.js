"use client";

import { useState, useEffect } from 'react';
import { logIn} from '@/redux/features/auth-slice'
import { useSelector, useDispatch } from 'react-redux'
import { redirect } from 'next/navigation';

export default function LogIn() {
  const [username, setUsername] = useState("");
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();


  const onClickLogIn = () => {
    dispatch(logIn(username));

  };


  if (isAuth)
  	return redirect('/');

  

  return (
    <main>

    <h1>Log In</h1>
    <br></br>

      <input type="text" onChange={(e) => setUsername(e.target.value)} />
      <button onClick={onClickLogIn}>Set</button>
      
    </main>
  )
}
