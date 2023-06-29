import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import publicRoutes from './publicRoutes'

const Router = () => {
  const router = createBrowserRouter(publicRoutes)
  return <RouterProvider router={router} />
}

export default Router
