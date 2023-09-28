"use client";

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { FaHome, FaUserAlt } from 'react-icons/fa';
import { IoHeartDislikeOutline, IoHeartOutline } from 'react-icons/io5';
import { RiLogoutCircleLine } from 'react-icons/ri';


export default function NavBar() {
  const { data: session } = useSession();
  const pathname = usePathname()
  const isDislike = pathname.includes("dislike")


  if (!session) {
    return <></>
  }




  return (
    <nav className={isDislike ? 'dark-nav' : 'nav'} >
      <ul >
        <li className='user'>
          {session && <Link href="/profile"><FaUserAlt size={25} /></Link>}

        </li>
        <li className='first'>
          <Link href="/"> <FaHome size={25} className={pathname == '/' ? 'active' : ''} /></Link>
        </li>
        <li className='second'>
          <Link href="/like"><IoHeartOutline className={pathname == '/like' ? 'active' : ''} size={25} /></Link>
        </li>
        <li className='third'>
          <Link href="/dislike"><IoHeartDislikeOutline className={pathname == '/dislike' ? 'active' : ''} size={25} /></Link>
        </li>
        <li className='logout-nav-lg'>
          {session && <a onClick={signOut} > <RiLogoutCircleLine size={25} /> </a>}

        </li>

      </ul>
    </nav>
  )
}
