import { Navigate } from 'react-router-dom'
import Layout from '../Layout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Settings from '../pages/Settings'
import articleRoutes from './articleRoutes'
import profileRoutes from './profileRoutes'

const publicRoutes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'settings',
        element: <Settings />
      },
      ...articleRoutes,
      ...profileRoutes
    ]
  },
  {
    path: '*',
    element: <Navigate to='/' replace />
  }
]

export default publicRoutes
