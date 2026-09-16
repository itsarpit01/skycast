import { Link } from 'react-router-dom'
import { ROUTES } from '../utils/constants'

function Home() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Five days of sky, three hours at a time.</h1>
        <p>
          Search any city and see how the next 120 hours are shaping up —
          temperature, humidity, wind and conditions for every three-hour slot.
        </p>
        <Link className="button" to={ROUTES.WEATHER}>Check a city</Link>
      </div>

      <div className="weather-types">
        <div className="weather-type">
          <svg viewBox="0 0 64 64" className="weather-icon">
            <circle cx="32" cy="32" r="14" fill="var(--sun)" />
            <g stroke="var(--sun)" strokeWidth="3" strokeLinecap="round">
              <line x1="32" y1="4" x2="32" y2="12" />
              <line x1="32" y1="52" x2="32" y2="60" />
              <line x1="4" y1="32" x2="12" y2="32" />
              <line x1="52" y1="32" x2="60" y2="32" />
              <line x1="12.7" y1="12.7" x2="18.3" y2="18.3" />
              <line x1="45.7" y1="45.7" x2="51.3" y2="51.3" />
              <line x1="12.7" y1="51.3" x2="18.3" y2="45.7" />
              <line x1="45.7" y1="18.3" x2="51.3" y2="12.7" />
            </g>
          </svg>
          <p>Sunny</p>
        </div>

        <div className="weather-type">
          <svg viewBox="0 0 64 64" className="weather-icon">
            <path
              d="M18 30a12 12 0 0 1 23-5 10 10 0 0 1 9 10 9 9 0 0 1-2 18H18a10 10 0 0 1 0-23z"
              fill="var(--muted)"
            />
            <g stroke="var(--sun)" strokeWidth="3" strokeLinecap="round">
              <line x1="22" y1="48" x2="19" y2="56" />
              <line x1="32" y1="48" x2="29" y2="56" />
              <line x1="42" y1="48" x2="39" y2="56" />
            </g>
          </svg>
          <p>Rainy</p>
        </div>

        <div className="weather-type">
          <svg viewBox="0 0 64 64" className="weather-icon">
            <g stroke="var(--muted)" strokeWidth="3" strokeLinecap="round" fill="none">
              <path d="M6 22h34a7 7 0 1 0-6-11" />
              <path d="M6 34h44a7 7 0 1 1-6 11" />
              <path d="M6 46h28a6 6 0 1 1-5 9" />
            </g>
          </svg>
          <p>Windy</p>
        </div>
      </div>
    </section>
  )
}

export default Home