import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { API_KEY } from '../utils/constants'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const LAYERS = [
  { id: 'clouds_new', label: 'Clouds' },
  { id: 'precipitation_new', label: 'Precipitation' },
  { id: 'pressure_new', label: 'Pressure' },
  { id: 'wind_new', label: 'Wind' },
  { id: 'temp_new', label: 'Temperature' },
]

function WeatherMap({ place }) {
  const [layer, setLayer] = useState('clouds_new')

  if (!place || typeof place.coord?.lat !== 'number') {
    return null
  }

  const { lat, lon } = place.coord

  return (
    <div className="weather-map">
      <div className="current-header">
        <h3 className="current-label">Map</h3>
      </div>

      <div className="map-layer-buttons">
        {LAYERS.map((l) => (
          <button
            key={l.id}
            type="button"
            className={layer === l.id ? 'day-btn active' : 'day-btn'}
            onClick={() => setLayer(l.id)}
          >
            {l.label}
          </button>
        ))}
      </div>

      <MapContainer
        key={`${lat}-${lon}`}
        center={[lat, lon]}
        zoom={7}
        scrollWheelZoom={false}
        className="map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <TileLayer
          url={`https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${API_KEY}`}
          opacity={0.6}
        />

        <Marker position={[lat, lon]}>
          <Popup>
            {place.name}, {place.country}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default WeatherMap