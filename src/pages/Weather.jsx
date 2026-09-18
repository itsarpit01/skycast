import { useState, useEffect, useMemo } from 'react'
import SearchBar from '../components/SearchBar'
import ForecastList from '../components/ForecastList'
import CurrentWeather from '../components/CurrentWeather'
import AirPollution from '../components/AirPollution'
import WeatherMap from '../components/WeatherMap'
import WeatherWidget from '../components/WeatherWidget'
import Loader from '../components/Loader'
import {
  getForecastByCity,
  getForecastByCoords,
  getCurrentByCity,
  getCurrentByCoords,
  getAirPollution,
} from '../api/weatherApi'
import { getErrorMessage, formatDay } from '../utils/format'

const STORAGE_KEY = 'skycast:lastForecast'

function Weather() {
  const [place, setPlace] = useState(null)
  const [list, setList] = useState([])
  const [current, setCurrent] = useState(null)
  const [airPollution, setAirPollution] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedDay, setSelectedDay] = useState('all')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const { place, list, current, airPollution } = JSON.parse(saved)
        setPlace(place)
        setList(list)
        setCurrent(current ?? null)
        setAirPollution(airPollution ?? null)
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  function saveToStorage(place, list, current, airPollution) {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ place, list, current, airPollution })
      )
    } catch {
    }
  }

  function handleClear() {
    localStorage.removeItem(STORAGE_KEY)
    setPlace(null)
    setList([])
    setCurrent(null)
    setAirPollution(null)
    setError('')
    setSelectedDay('all')
  }

  async function handleSearch(city) {
    setLoading(true)
    setError('')
    setSelectedDay('all')

    try {
      const [{ place, list }, currentData] = await Promise.all([
        getForecastByCity(city),
        getCurrentByCity(city),
      ])

      const airData = await getAirPollution(place.coord.lat, place.coord.lon)

      setPlace(place)
      setList(list)
      setCurrent(currentData)
      setAirPollution(airData)
      saveToStorage(place, list, currentData, airData)
    } catch (err) {
      setPlace(null)
      setList([])
      setCurrent(null)
      setAirPollution(null)
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
      const [{ place, list }, currentData, airData] = await Promise.all([
        getForecastByCoords(lat, lon),
        getCurrentByCoords(lat, lon),
        getAirPollution(lat, lon),
      ])
      setPlace(place)
      setList(list)
      setCurrent(currentData)
      setAirPollution(airData)
      saveToStorage(place, list, currentData, airData)
    } catch (err) {
      setPlace(null)
      setList([])
      setCurrent(null)
      setAirPollution(null)
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

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

      {place?.id && !loading && (
        <div className="weather-widget-row">
          <WeatherWidget cityId={place.id} />
        </div>
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

      {(current || airPollution) && !loading && (
        <div className="weather-dashboard">
          {current && <CurrentWeather data={current} />}
          {airPollution && <AirPollution data={airPollution} />}
          {place && <WeatherMap place={place} />}
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