import { useState, useEffect } from 'react'
import './App.css'

const getWeather = async (location, setLocation, setWeather, setLoading) => {
  // getLocation(setLocation, setLoading)
  // console.log(location.coords.latitude)

  let latitude = 0;
  let longitude = 0;

  if(location !== undefined && location.coords) {
    latitude = location.coords.latitude
    longitude = location.coords.longitude

    
    const weather = await fetch(`https://api.weather.gov/points/${latitude},${longitude}`)
    const weatherData = await weather.json()
    console.log(weatherData)
    
    const forecast = await fetch(weatherData.properties.forecast)
    const forecastData = await forecast.json()
    console.log(forecastData)
    setWeather(forecastData.properties.periods)
  }

  console.log(`Latitude: ${latitude}, Longitude: ${longitude}`)

}

const getIP = async (setIp) => {
  const ipAddress = await fetch('https://api.ipify.org/?format=json');
  const ip = await ipAddress.json();

  setIp(ip.ip)
}

const getLocation = async (location, setLocation, setLoading) => {

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  function locationCallback(pos) {

    const crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    setLocation({
      coords: {
        latitude: crd.latitude,
        longitude: crd.longitude
      }
    })
  }

  if(location === undefined || location.coords === undefined) {
    navigator.geolocation.getCurrentPosition(locationCallback, error, options)
  }

  
}

function App() {
  const [ip, setIp] = useState('')
  const [location, setLocation] = useState({})
  const [weather, setWeather] = useState({})
  const [forcast, setForcast] = useState({})
  const [loading, setLoading] = useState(false)

  
  useEffect(() => {
    getIP(setIp)
    getLocation(location, setLocation, setLoading)
  }, [location, loading, weather])

  return (
    <>
      <h1>Welcome to the Weather App!</h1>
      <h2>
        {
          Object.keys(location).length > 0 ? (
            <>
              <p>IP: {ip}</p>
              <p>Longitude/latitude: {location.coords.longitude}, {location.coords.latitude}</p>
            </>
          ) : (
            <p>Click the button to get your weather</p>
          )
        }
      </h2>
      <h3>Backend powered by Python, Frontend powered by React/Vite</h3>
      <h4>Weather:</h4>
      <p></p>
      <div className="weather">
        {
          weather.length > 0 ? (
            weather.map((w, i) => (
              <div className="weather-card" key={i}>
                <img src={w.icon}></img>
                <h5>{w.name}</h5>
                <p>{w.temperature} <small>{w.temperatureUnit}</small></p>
                <p>{w.detailedForecast}</p>
              </div>
            ))
          ) : (
            <p>Click the button to get your weather</p>
          )
        }
        </div>
      <div className="card">
        <button onClick={() => getWeather(location, setLocation, setWeather, setLoading)}>
          What's my weather like?
        </button>
      </div>
      <p className="read-the-docs">
        Weather data is pulled from the Weather.gov Api
      </p>
    </>
  )
}

export default App
