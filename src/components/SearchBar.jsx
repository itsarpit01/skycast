import { useState } from 'react'
import { validateSearch } from '../schemas/searchSchema'

function SearchBar({ onSearch, onLocationSearch, onClear, loading, hasResult }) {
  const [city, setCity] = useState('')
  const [fieldError, setFieldError] = useState('')
  const [locating, setLocating] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()

    const { success, data, error } = validateSearch({ city })

    if (!success) {
      setFieldError(error)
      return
    }

    setFieldError('')
    onSearch(data.city)
  }

  function handleUseLocation() {
    if (!navigator.geolocation) {
      setFieldError('Your browser does not support location access.')
      return
    }

    setFieldError('')
    setLocating(true)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocating(false)
        const { latitude, longitude } = position.coords
        onLocationSearch(latitude, longitude)
      },
      (err) => {
        setLocating(false)
        if (err.code === err.PERMISSION_DENIED) {
          setFieldError('Location permission was denied.')
        } else {
          setFieldError('Could not get your location. Try again.')
        }
      }
    )
  }

  function handleClear() {
    setCity('')
    setFieldError('')
    onClear()
  }

  return (
    <form className="search" onSubmit={handleSubmit} noValidate>
      <div className="search-field">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Chandigarh, Delhi, Tokyo…"
          aria-label="City name"
          aria-invalid={Boolean(fieldError)}
        />
        {fieldError && <p className="field-error">{fieldError}</p>}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Searching…' : 'Search'}
      </button>

      <button
        type="button"
        className="location-btn"
        onClick={handleUseLocation}
        disabled={locating || loading}
      >
        {locating ? 'Locating…' : '📍 Use my location'}
      </button>

      {hasResult && (
        <button type="button" className="clear-btn" onClick={handleClear}>
          Clear
        </button>
      )}
    </form>
  )
}

export default SearchBar