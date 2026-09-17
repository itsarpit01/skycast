import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import ForecastList from '../components/ForecastList'
import CurrentWeather from '../components/CurrentWeather'
import Loader from '../components/Loader'
import {
  getForecastByCity,
  getForecastByCoords,
  getCurrentByCity,
  getCurrentByCoords,
} from '../api/weatherApi'
import { getErrorMessage, formatDay } from '../utils/format'

const STORAGE_KEY = 'skycast:lastForecast'

function Weather() {
  // basic info about the searched place
  const [place, setPlace] = useState(null)

  // 5 day forecast list (many items, one every 3 hours)
  const [list, setList] = useState([])

  // right now weather
  const [current, setCurrent] = useState(null)

  // loading and error messages
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // which day tab is selected ("all" shows everything)
  const [selectedDay, setSelectedDay] = useState('all')

  // when the page first loads, try to get the last saved search from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const savedData = JSON.parse(saved)
        setPlace(savedData.place)
        setList(savedData.list)
        setCurrent(savedData.current)
      }
    } catch (err) {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  function saveToStorage(place, list, current) {
    try {
      const dataToSave = { place: place, list: list, current: current }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
    } catch (err) {
    }
  }

  function handleClear() {
    localStorage.removeItem(STORAGE_KEY)
    setPlace(null)
    setList([])
    setCurrent(null)
    setError('')
    setSelectedDay('all')
  }

  async function handleSearch(city) {
    setLoading(true)
    setError('')
    setSelectedDay('all')

    try {
      const forecastData = await getForecastByCity(city)
      const currentData = await getCurrentByCity(city)

      setPlace(forecastData.place)
      setList(forecastData.list)
      setCurrent(currentData)

      saveToStorage(forecastData.place, forecastData.list, currentData)
    } catch (err) {
      setPlace(null)
      setList([])
      setCurrent(null)
      setError(getErrorMessage(err, city))
    }

    setLoading(false)
  }

  async function handleLocationSearch(lat, lon) {
    setLoading(true)
    setError('')
    setSelectedDay('all')

    try {
      const forecastData = await getForecastByCoords(lat, lon)
      const currentData = await getCurrentByCoords(lat, lon)

      setPlace(forecastData.place)
      setList(forecastData.list)
      setCurrent(currentData)

      saveToStorage(forecastData.place, forecastData.list, currentData)
    } catch (err) {
      setPlace(null)
      setList([])
      setCurrent(null)
      setError(getErrorMessage(err))
    }

    setLoading(false)
  }

  const days = []
  for (let i = 0; i < list.length; i++) {
    const dayLabel = formatDay(list[i].dt)
    if (!days.includes(dayLabel)) {
      days.push(dayLabel)
    }
  }

  let filteredList = list
  if (selectedDay !== 'all') {
    filteredList = []
    for (let i = 0; i < list.length; i++) {
      if (formatDay(list[i].dt) === selectedDay) {
        filteredList.push(list[i])
      }
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

      {current && !loading && (
        <div className="weather-dashboard">
          <CurrentWeather data={current} />

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

      {!loading && filteredList.length > 0 && <ForecastList list={filteredList} />}

      {!loading && !error && list.length === 0 && (
        <p className="empty">Search a city to see its forecast.</p>
      )}
    </section>
  )
}

export default Weather