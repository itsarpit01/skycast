import axiosClient from './axiosClient'

export async function getForecastByCity(city) {
  const res = await axiosClient.get('/forecast', { params: { q: city } })
  return { place: res.data.city, list: res.data.list }
}

export async function getForecastByCoords(lat, lon) {
  const res = await axiosClient.get('/forecast', { params: { lat, lon } })
  return { place: res.data.city, list: res.data.list }
}