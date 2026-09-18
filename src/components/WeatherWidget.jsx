import { useEffect, useRef } from 'react'
import { API_KEY } from '../utils/constants'

const CONTAINER_ID = 'openweathermap-widget-18'

function WeatherWidget({ cityId }) {
  const scriptRef = useRef(null)

  useEffect(() => {
    if (!cityId) return

    let cancelled = false

    const container = document.getElementById(CONTAINER_ID)
    if (container) {
      container.innerHTML = ''
    }

    // React StrictMode runs this effect twice in development
    // (setup -> cleanup -> setup) to help catch bugs. Because this
    // effect injects a script that mutates a shared global
    // (window.myWidgetParam) and fetches remote data, running it
    // twice back-to-back causes the two instances to collide and
    // crash the widget script. Deferring the actual work by one
    // tick and checking `cancelled` means only the second (real)
    // invocation ever does anything — the first one gets cancelled
    // by its cleanup before the timeout fires.
    const startTimer = setTimeout(() => {
      if (cancelled) return

      window.myWidgetParam = []
      window.myWidgetParam.push({
        id: 18,
        cityid: String(cityId),
        appid: API_KEY,
        units: 'metric',
        containerid: CONTAINER_ID,
      })

      const script = document.createElement('script')
      script.async = true
      script.charset = 'utf-8'
      script.src =
        '//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator-2.0.js?t=' +
        Date.now()

      document.body.appendChild(script)
      scriptRef.current = script
    }, 50)

    return () => {
      cancelled = true
      clearTimeout(startTimer)
      if (scriptRef.current && document.body.contains(scriptRef.current)) {
        document.body.removeChild(scriptRef.current)
      }
      scriptRef.current = null
    }
  }, [cityId])

  return (
    <div className="weather-widget">
      <div className="current-header">
        <h3 className="current-label">Weather Widget</h3>
      </div>
      <div id={CONTAINER_ID} />
    </div>
  )
}

export default WeatherWidget