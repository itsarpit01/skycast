import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

function MainLayout() {
  return (
    <div className="app">
      <Navbar />
      <main className="page"><Outlet /></main>
      <footer className="footer">Data from OpenWeatherMap · built while learning React</footer>
    </div>
  )
}

export default MainLayout