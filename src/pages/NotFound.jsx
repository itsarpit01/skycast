import { Link } from 'react-router-dom'
import { ROUTES } from '../utils/constants'

function NotFound() {
  return (
    <section className="hero">
      <h1>That page isn't here.</h1>
      <p>The link may be old, or the address has a typo in it.</p>
      <Link className="button" to={ROUTES.HOME}>Back to home</Link>
    </section>
  )
}

export default NotFound