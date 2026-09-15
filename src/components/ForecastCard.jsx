import { formatDay, formatTime, formatTemp, getIconUrl } from '../utils/format'

function ForecastCard({ item }) {
  const condition = item.weather[0]
  return (
    <article className="card">
      <div className="card-top">
        <span>{formatDay(item.dt)}</span>
        <span className="muted">{formatTime(item.dt)}</span>
      </div>
      <img src={getIconUrl(condition.icon)} alt={condition.description} width="70" height="70" />
      <p className="temp">{formatTemp(item.main.temp)}</p>
      <p className="desc">{condition.description}</p>
      <dl className="stats">
        <div><dt>Feels like</dt><dd>{formatTemp(item.main.feels_like)}</dd></div>
        <div><dt>Humidity</dt><dd>{item.main.humidity}%</dd></div>
        <div><dt>Wind</dt><dd>{item.wind.speed} m/s</dd></div>
      </dl>
    </article>
  )
}

export default ForecastCard