import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { RootState } from '../../store'
import { privateLinks, publicLinks } from './navLinks'
import useProfile from '../../hooks/useProfile'

const Header: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.userAuth)
  const { userData } = useProfile()
  const userName = userData?.user?.username
  if (userName) {
    privateLinks.splice(3, 1, {
      to: `/${userName}`,
      name: `${userName}`
    })
  }
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
              {to === '/username' ? (
                <span className='nav-link'>{name}</span>
              ) : (
                <NavLink className='nav-link' to={to}>
                  {name}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Header
