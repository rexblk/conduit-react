import Profile from '../pages/Profile'

const profileRoutes = [
  {
    path: 'profile/:username',
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
