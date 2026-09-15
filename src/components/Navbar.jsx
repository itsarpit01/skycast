import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header className="navbar">
      <span className="brand">Skycast</span>

      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/weather">Weather</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    </header>
  )
}

export default Navbar