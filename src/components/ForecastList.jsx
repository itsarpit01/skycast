import ForecastCard from './ForecastCard'

function ForecastList({ list }) {
  return (
    <div className="grid">
      {list.map((item) => <ForecastCard key={item.dt} item={item} />)}
    </div>
  )
}

export default ForecastList