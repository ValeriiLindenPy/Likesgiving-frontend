import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import {logOut} from '@/redux/features/auth-slice'
import { FaHome, FaUserAlt } from 'react-icons/fa';
import { IoHeartDislikeOutline, IoHeartOutline } from 'react-icons/io5';
import {  RiLogoutCircleLine } from 'react-icons/ri';

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
        <Link href="/"> <FaHome size={25} color='black' /></Link>
      </li>
      <li>
        <Link href="/about"><IoHeartDislikeOutline size={25} /></Link>
      </li>
      <li>
        <Link href="/about"><IoHeartOutline size={25} /></Link>
      </li>
      <li>
      {isAuth && <a onClick={onClickLogIn} > <RiLogoutCircleLine size={25} /> </a>}
      
      </li>
      <li className='user'>
        {isAuth && <p><FaUserAlt size={25} /> {username}</p>}
      </li>
    </ul>
  )
}
