import { ICON_URL } from './constants'

export function formatDay(unixSeconds) {
  return new Date(unixSeconds * 1000).toLocaleDateString('en-IN', {
    weekday: 'short', day: 'numeric', month: 'short',
  })
}

export function formatTime(unixSeconds) {
  return new Date(unixSeconds * 1000).toLocaleTimeString('en-IN', {
    hour: 'numeric', minute: '2-digit',
  })
}
export function formatSunTime(unixSeconds, timezoneOffsetSeconds) {
  const utcMs = unixSeconds * 1000
  const localMs = utcMs + timezoneOffsetSeconds * 1000
  return new Date(localMs).toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC',
  })
}

export function formatTemp(value) {
  return `${Math.round(value)}°`
}

export function getIconUrl(code) {
  return `${ICON_URL}/${code}@2x.png`
}

export function getErrorMessage(error, city = '') {
  const status = error?.response?.status
  if (status === 404) return `No city called "${city}". Check the spelling.`
  if (status === 401) return 'API key is missing or not active yet.'
  if (status === 429) return 'Too many requests. Wait a minute and try again.'
  return 'Could not reach the weather service. Try again.'
}