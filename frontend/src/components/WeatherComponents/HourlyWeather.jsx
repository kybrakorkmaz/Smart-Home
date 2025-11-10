import { weatherCodes } from "../../utils/weatherCodes.jsx";
import React from "react";

export default function HourlyWeather({hourlyWeather}){
  const weatherIcon = Object.keys(weatherCodes).find(icon => weatherCodes[icon].includes(hourlyWeather.condition.code));
  return(
    <li className="weather-item">
      <p className="time">{hourlyWeather.time.split(" ")[1].substring(0,5)}</p>
      <img src={`src/assets/weather-icons/icons/${weatherIcon}.svg`} className="weather-icon" />
      <h2 className="weather-temperature">{Math.floor(hourlyWeather.temp_c)} <span>°C</span></h2>
    </li>
  );
}