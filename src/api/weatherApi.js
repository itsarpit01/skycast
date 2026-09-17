import axiosClient from './axiosClient'

export async function getForecastByCity(city) {
  const res = await axiosClient.get('/forecast', { params: { q: city } })
  return res.data // or however you shape { place, list }
}

export async function getForecastByCoords(lat, lon) {
  const res = await axiosClient.get('/forecast', { params: { lat, lon } })
  return res.data
}

export async function getCurrentByCity(city) {
  const res = await axiosClient.get('/weather', { params: { q: city } })
  return res.data
}

export async function getCurrentByCoords(lat, lon) {
  const res = await axiosClient.get('/weather', { params: { lat, lon } })
  return res.data
}