import axios from 'axios'
import { API_KEY, BASE_URL, DEFAULT_UNITS } from '../utils/constants'

const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  params: {
    appid: API_KEY,
    units: DEFAULT_UNITS,
  },
})

export default axiosClient