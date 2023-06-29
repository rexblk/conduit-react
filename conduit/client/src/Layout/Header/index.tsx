import React from 'react'
import { NavLink } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <nav className='navbar navbar-light'>
      <div className='container'>
        <NavLink className='navbar-brand' to='/'>
          conduit
        </NavLink>
        <ul className='nav navbar-nav pull-xs-right'>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/'>
              Home
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/login'>
              Sign in
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/register'>
              Sign up
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
