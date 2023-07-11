import Profile from '../pages/Profile'


const profFunc = () => {
  
  return {}
}

const profileRoutes = [
  {
    path: 'username',
    element: <Profile />,
    children: [
      {
        path: 'favorites',
        element: <Profile />
      }
    ]
  }
]

export default profileRoutes
