function About() {
  return (
    <section className="about">
      <h1>About this project</h1>

      <p>
        Skycast is a practice project built to learn React. It uses the
        OpenWeatherMap 5 day / 3 hour forecast API, which returns 40 readings
        per city — 8 per day for 5 days.
      </p>

      <h2>What it uses</h2>
      <ul>
        <li>React with Vite</li>
        <li>react-router-dom for the three pages</li>
        <li>axios to call the API</li>
        <li>useState and useEffect for data and loading states</li>
      </ul>

      <h2>How the data flows</h2>
      <ol>
        <li>You type a city and submit the search form.</li>
        <li>axios requests the forecast endpoint with that city name.</li>
        <li>The response list (40 items) is stored in state.</li>
        <li>.map() turns each item into a card.</li>
      </ol>
    </section>
  )
}

export default About