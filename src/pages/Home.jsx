import { Link } from 'react-router-dom'

function Home() {
  return (
    <section className="hero">
      <h1>Five days of sky, three hours at a time.</h1>
      <p>
        Search any city and see how the next 120 hours are shaping up —
        temperature, humidity, wind and conditions for every three-hour slot.
      </p>
      <Link className="button" to="/weather">Check a city</Link>
    </section>
  )
}

export default Home