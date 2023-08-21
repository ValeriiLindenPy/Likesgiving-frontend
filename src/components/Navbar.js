import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import {logOut} from '@/redux/features/auth-slice'


export default function NavBar() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const username = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();


  const onClickLogIn = () => {
    dispatch(logOut());

  };

  return (
      <ul className='nav'>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/about">About Us</Link>
      </li>
      <li>
      {isAuth ? <a onClick={onClickLogIn} >Log Out</a> : <Link href="/login">Log In</Link> }
      
      </li>
      <li className='user'>
        {isAuth && <p>{username}</p>}
      </li>
    </ul>
  )
}
