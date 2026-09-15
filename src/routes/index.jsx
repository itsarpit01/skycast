import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import Weather from '../pages/Weather'
import About from '../pages/About'
import NotFound from '../pages/NotFound'
import { ROUTES } from '../utils/constants'

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: ROUTES.WEATHER, element: <Weather /> },
      { path: ROUTES.ABOUT, element: <About /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default router