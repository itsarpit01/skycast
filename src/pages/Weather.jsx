import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import ForecastList from '../components/ForecastList'
import Loader from '../components/Loader'
import { getForecastByCity } from '../api/weatherApi'
import { getErrorMessage } from '../utils/format'

function Weather() {
  const [place, setPlace] = useState(null)  // city info from the API
  const [list, setList] = useState([])      // the 40 forecast items
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSearch(city) {
    setLoading(true)
    setError('')

    try {
      const { place, list } = await getForecastByCity(city)
      setPlace(place)
      setList(list)
    } catch (err) {
      setPlace(null)
      setList([])
      setError(getErrorMessage(err, city))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="weather">
      <SearchBar onSearch={handleSearch} loading={loading} />

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