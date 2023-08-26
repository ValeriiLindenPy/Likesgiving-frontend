import Link from 'next/link'
import { FaHome, FaUserAlt } from 'react-icons/fa';
import { IoHeartDislikeOutline, IoHeartOutline } from 'react-icons/io5';
import {  RiLogoutCircleLine } from 'react-icons/ri';



export default function NavBar() {



  const onClickLogIn = () => {

  };




    
  return (
      <ul className='nav'>
      <li>
        <Link href="/"> <FaHome size={25} color='black' /></Link>
      </li>
      <li>
        <Link href="/like"><IoHeartOutline size={25} /></Link>
      </li>
      <li>
        <Link href="/dislike"><IoHeartDislikeOutline size={25} /></Link>
      </li>
      <li>
      {/* {token && <a onClick={onClickLogIn} > <RiLogoutCircleLine size={25} /> </a>} */}
      
      </li>
      <li className='user'>
        {/* {token && <p><FaUserAlt size={25} /> {username}</p>} */}
      </li>
    </ul>
  )
}
