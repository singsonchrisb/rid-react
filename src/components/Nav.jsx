import React from 'react'
import './nav.css'
// import NavNotice from './NavNotice'
// import NavMessage from './NavMessage'
import NavAvatar from './NavAvatar.jsx'

function Nav() {
  return (
    <nav className='header-nav ms-auto'>
        <ul className='d-flex align-items-center'>
            {/* <NavNotice />
            <NavMessage /> */}
            <NavAvatar />
        </ul>
    </nav>
  )
}

export default Nav
