import axiosClient from './axiosClient'

function normalizeError(err, context) {
  if (!err.response) {
    const netErr = new Error(
      err.code === 'ECONNABORTED'
        ? 'The request timed out. Check your connection and try again.'
        : 'Could not reach the weather service. Check your connection.'
    )
    netErr.cause = err
    netErr.context = context
    throw netErr
  }
  err.context = context
  throw err
}

export async function getForecastByCity(city) {
  const trimmed = (city ?? '').trim()

  if (!trimmed) {
    throw new Error('City name cannot be empty.')
  }

  try {
    const res = await axiosClient.get('/forecast', { params: { q: trimmed } })

    if (!res.data?.list || !res.data?.city) {
      throw new Error('Unexpected response from the weather service.')
    }

    return { place: res.data.city, list: res.data.list }
  } catch (err) {
    normalizeError(err, `getForecastByCity("${trimmed}")`)
  }
}

export async function getForecastByCoords(lat, lon) {
  if (typeof lat !== 'number' || typeof lon !== 'number') {
    throw new Error('Invalid coordinates.')
  }

  try {
    const res = await axiosClient.get('/forecast', { params: { lat, lon } })

    if (!res.data?.list || !res.data?.city) {
      throw new Error('Unexpected response from the weather service.')
    }

    return { place: res.data.city, list: res.data.list }
  } catch (err) {
    normalizeError(err, `getForecastByCoords(${lat}, ${lon})`)
  }
}