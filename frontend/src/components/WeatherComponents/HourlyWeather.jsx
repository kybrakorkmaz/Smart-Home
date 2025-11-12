import { weatherCodes } from "../../utils/weatherCodes.jsx";
import React from "react";

export default function HourlyWeather({hourlyWeather}){
  const weatherIcon = Object.keys(weatherCodes).find(icon => weatherCodes[icon].includes(hourlyWeather.condition.code));
  return (
    <li className="weather-item">
      <p className="time">{hourlyWeather.time.split(" ")[1].substring(0, 5)}</p>
      <img
        className={"weather-icon"}
        src={`src/assets/weather-icons/icons/${weatherIcon}.svg`}
      />
      <div className="weather-temperature">
        <h2  >
          {Math.floor(hourlyWeather.temp_c)} <span>°C</span>
        </h2>
      </div>

    </li>
  );
}