import { formatTemp, getIconUrl, formatSunTime } from '../utils/format'

function CurrentWeather({ data }) {
  if (!data) return null

  const condition = data.weather[0]

  return (
    <div className="current-weather">
      <div className="current-header">
        <h3 className="current-label">Current Weather</h3>
        <span className="current-updated">
          Updated {formatSunTime(data.dt, data.timezone)}
        </span>
      </div>

      <div className="current-main">
        <img
          src={getIconUrl(condition.icon)}
          alt={condition.description}
          width="90"
          height="90"
        />
        <div>
          <p className="current-temp">{formatTemp(data.main.temp)}</p>
          <p className="current-desc">{condition.description}</p>
        </div>
      </div>

      <dl className="current-stats">
        <div>
          <dt>Feels like</dt>
          <dd>{formatTemp(data.main.feels_like)}</dd>
        </div>
        <div>
          <dt>Humidity</dt>
          <dd>{data.main.humidity}%</dd>
        </div>
        <div>
          <dt>Wind</dt>
          <dd>{data.wind.speed} m/s</dd>
        </div>
        <div>
          <dt>Sunrise</dt>
          <dd>{formatSunTime(data.sys.sunrise, data.timezone)}</dd>
        </div>
        <div>
          <dt>Sunset</dt>
          <dd>{formatSunTime(data.sys.sunset, data.timezone)}</dd>
        </div>
      </dl>
    </div>
  )
}

export default CurrentWeather