"use client";
import styles from './login.module.css'
import { useState, useEffect } from 'react';
import { logIn} from '@/redux/features/auth-slice'
import { useSelector, useDispatch } from 'react-redux'
import { redirect } from 'next/navigation';
import Image from 'next/image'

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
    <main className = {styles.main}>
    <div className = {styles.form}>
    <Image src='/logo.png' width={122} height={100} alt='Logo' />

    <h1>Log In</h1>
      <form>

          <input type="text" placeholder="User name" onChange={(e) => setUsername(e.target.value)} />
          <input type="email" name="email" placeholder="Email" required=""/>
          <input type="password" name="pswd" placeholder="Password" required=""/>
        <br></br>
        <button onClick={onClickLogIn}>Log In</button>
      </form>
      </div>
    </main>
  )
}
