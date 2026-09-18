
const AQI_LEVELS = {
  1: { label: 'Good', className: 'aqi-good' },
  2: { label: 'Fair', className: 'aqi-fair' },
  3: { label: 'Moderate', className: 'aqi-moderate' },
  4: { label: 'Poor', className: 'aqi-poor' },
  5: { label: 'Very Poor', className: 'aqi-very-poor' },
}

function AirPollution({ data }) {
  if (!data) return null

  const aqi = data.main.aqi
  const level = AQI_LEVELS[aqi] ?? { label: 'Unknown', className: '' }
  const c = data.components

  const updatedAt = new Date(data.dt * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="air-pollution">
      <div className="current-header">
        <h3 className="current-label">Air Quality</h3>
        <span className="current-updated">Updated {updatedAt}</span>
      </div>

      <div className={`aqi-badge ${level.className}`}>
        <span className="aqi-number">{aqi}</span>
        <span className="aqi-text">{level.label}</span>
      </div>

      <dl className="current-stats">
        <div>
          <dt>PM2.5</dt>
          <dd>{c.pm2_5} μg/m³</dd>
        </div>
        <div>
          <dt>PM10</dt>
          <dd>{c.pm10} μg/m³</dd>
        </div>
        <div>
          <dt>O₃ (Ozone)</dt>
          <dd>{c.o3} μg/m³</dd>
        </div>
        <div>
          <dt>NO₂</dt>
          <dd>{c.no2} μg/m³</dd>
        </div>
        <div>
          <dt>SO₂</dt>
          <dd>{c.so2} μg/m³</dd>
        </div>
        <div>
          <dt>CO</dt>
          <dd>{c.co} μg/m³</dd>
        </div>
      </dl>
    </div>
  )
}

export default AirPollution