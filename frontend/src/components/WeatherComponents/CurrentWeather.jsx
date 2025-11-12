import React from "react";

export default function CurrentWeather({currentWeather}){
  return (
    <div className="current-weather">
      <img
        className="weather-icon"
        src={`src/assets/weather-icons/icons/${currentWeather.weatherIcon}.svg`}
      />
      <h2 className="weather-temperature">
        {Math.floor(currentWeather.temperature)} <span>°C</span>
      </h2>
      <p className="description">{currentWeather.description}</p>
    </div>
  );
}