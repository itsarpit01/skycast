import { useState, useEffect, useMemo } from 'react'
import SearchBar from '../components/SearchBar'
import ForecastList from '../components/ForecastList'
import Loader from '../components/Loader'
import { getForecastByCity, getForecastByCoords } from '../api/weatherApi'
import { getErrorMessage, formatDay } from '../utils/format'

const STORAGE_KEY = 'skycast:lastForecast'

function Weather() {
  const [place, setPlace] = useState(null)
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedDay, setSelectedDay] = useState('all')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const { place, list } = JSON.parse(saved)
        setPlace(place)
        setList(list)
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  function saveToStorage(place, list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ place, list }))
    } catch {
    }
  }

  function handleClear() {
    localStorage.removeItem(STORAGE_KEY)
    setPlace(null)
    setList([])
    setError('')
    setSelectedDay('all')
  }

  async function handleSearch(city) {
    setLoading(true)
    setError('')
    setSelectedDay('all')

    try {
      const { place, list } = await getForecastByCity(city)
      setPlace(place)
      setList(list)
      saveToStorage(place, list)
    } catch (err) {
      setPlace(null)
      setList([])
      setError(getErrorMessage(err, city))
    } finally {
      setLoading(false)
    }
  }

  async function handleLocationSearch(lat, lon) {
    setLoading(true)
    setError('')
    setSelectedDay('all')

    try {
      const { place, list } = await getForecastByCoords(lat, lon)
      setPlace(place)
      setList(list)
      saveToStorage(place, list)
    } catch (err) {
      setPlace(null)
      setList([])
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  // Build the list of unique days present in the forecast,
  // e.g. ["Thu, 17 Sept", "Fri, 18 Sept", ...] — max 5.
  const days = useMemo(() => {
    const seen = new Set()
    const result = []

    for (const item of list) {
      const label = formatDay(item.dt)
      if (!seen.has(label)) {
        seen.add(label)
        result.push(label)
      }
    }

    return result
  }, [list])

  // Only the cards whose day matches the selected tab.
  const filteredList = useMemo(() => {
    if (selectedDay === 'all') return list
    return list.filter((item) => formatDay(item.dt) === selectedDay)
  }, [list, selectedDay])

  return (
    <section className="weather">
      <SearchBar
        onSearch={handleSearch}
        onLocationSearch={handleLocationSearch}
        onClear={handleClear}
        loading={loading}
        hasResult={Boolean(place)}
      />

      {error && <p className="error">{error}</p>}
      {loading && <Loader label="Fetching the forecast…" />}

      {place && !loading && (
        <h2 className="place">
          {place.name}, {place.country} — next 5 days
        </h2>
      )}

      {!loading && list.length > 0 && (
        <div className="day-filter">
          <button
            type="button"
            className={selectedDay === 'all' ? 'day-btn active' : 'day-btn'}
            onClick={() => setSelectedDay('all')}
          >
            All days
          </button>
          {days.map((day) => (
            <button
              key={day}
              type="button"
              className={selectedDay === day ? 'day-btn active' : 'day-btn'}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </button>
          ))}
        </div>
      )}

      {!loading && filteredList.length > 0 && <ForecastList list={filteredList} />}

      {!loading && !error && list.length === 0 && (
        <p className="empty">Search a city to see its forecast.</p>
      )}
    </section>
  )
}

export default Weather