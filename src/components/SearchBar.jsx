import { useState } from 'react'
import { validateSearch } from '../schemas/searchSchema'

function SearchBar({ onSearch, loading }) {
  const [city, setCity] = useState('')
  const [fieldError, setFieldError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const { success, data, error } = validateSearch({ city })
    if (!success) { setFieldError(error); return }
    setFieldError('')
    onSearch(data.city)
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
    </form>
  )
}

export default SearchBar