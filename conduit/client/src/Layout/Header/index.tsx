import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { RootState } from '../../store'
import { privateLinks, publicLinks } from './navLinks'

const Header: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.userAuth)
  const navLinks = token ? privateLinks : publicLinks

  return (
    <nav className='navbar navbar-light'>
      <div className='container'>
        <NavLink className='navbar-brand' to='/'>
          conduit
        </NavLink>
        <ul className='nav navbar-nav pull-xs-right'>
          {navLinks.map(({ to, name }) => (
            <li className='nav-item'>
              <NavLink className='nav-link' to={to}>
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Header
