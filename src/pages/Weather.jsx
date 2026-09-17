import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import ForecastList from '../components/ForecastList'
import Loader from '../components/Loader'
import { getForecastByCity, getForecastByCoords } from '../api/weatherApi'
import { getErrorMessage } from '../utils/format'

const STORAGE_KEY = 'skycast:lastForecast'

function Weather() {
  const [place, setPlace] = useState(null)
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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
  }

  async function handleSearch(city) {
    setLoading(true)
    setError('')

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

      {!loading && list.length > 0 && <ForecastList list={list} />}

      {!loading && !error && list.length === 0 && (
        <p className="empty">Search a city to see its forecast.</p>
      )}
    </section>
  )
}

export default Weather