import React, {useEffect, useRef, useState} from "react";
import Room from "../RoomComponents/Room.jsx";
import "./Home.css"
import "../WeatherComponents/Weather.css";
import "../RoomComponents/Room.css"
import { useNavigate} from "react-router-dom";
import {getRooms} from "../../utils/saveRooms.jsx";
import HomeSettings from "../HomeSettings/HomeSettings.jsx";
import {saveSettings} from "../../utils/settingsStorage.jsx";
import { updateRoomsBasedOnSettings } from "../../utils/settingsStorage.jsx";
import SearchSection from "../WeatherComponents/SearchSection.jsx";
import CurrentWeather from "../WeatherComponents/CurrentWeather.jsx";
import HourlyWeather from "../WeatherComponents/HourlyWeather.jsx";
import { weatherCodes } from "../../utils/weatherCodes.jsx";
import Profile from "../ProfileComponent/Profile.jsx";
import "../ProfileComponent/Profile.css"
function Home(){
    const [currentWeather, setCurrentWeather] = useState({});
    const [hourlyForecasts, setHourlyForecasts] = useState([]);
    const [hasNoResult, setHasNoResult] = useState(false);
    const searchInputRef = useRef(null);
    const filterHourlyForecast = (hourlyData) =>{
      const currentHour = new Date().setMinutes(0, 0 ,0);
      const next24Hours = currentHour + 24*60*60*1000;

      // filter the hourly data to only include the next 24 hours
      const next24HoursData = hourlyData.filter(({time}) =>{
        const forecastTime = new Date(time).getTime();
        return forecastTime >= currentHour && forecastTime <= next24Hours;
      });
      setHourlyForecasts(next24HoursData);
    }
    //rooms
    const [rooms, setRooms] = useState({
        bedroom: [],
        livingRoom: [],
        kitchen: [],
        bathroom: [],
        toilet: []
    });
    // properties
    const [settings, setSettings] = useState({
      general: { heat: false, light: false, water: false },
      special: { electricity: true, windows: true, doors: true },
    });
    //navigation
    const navigate = useNavigate();
    //if there is no room number navigate user to room settings page
    useEffect(() => {
        const storedRooms = getRooms();
        console.log("stored rooms:", storedRooms);
        const isEmpty = Object.values(storedRooms).every(arr=>arr.length ===0);
        if(!storedRooms || isEmpty) {
          console.log("No rooms found, redirecting to /Room-Setup");
          navigate("/Room-Setup");
        }
        else setRooms(storedRooms);
    }, [navigate]);
    //Update UI based on main properties (electricity, heat and water)
    function handleClick(settingName) {
      setSettings((prev)=>{
        const updated = structuredClone(prev);
        //find the group
        for(const group of Object.keys(updated)){
          if(settingName in updated[group]){
            updated[group][settingName] = !updated[group][settingName];
            //if electricity is shut down, update rooms and other properties
            if(settingName === "electricity" && !updated[group][settingName]){
              const updatedRooms = updateRoomsBasedOnSettings(updated);
              setRooms(updatedRooms);
            }
          }
        }
        saveSettings(updated);
        return updated;
      });
    }
    // Fetches weather details based on the API URL
  const getWeatherDetails = async (API_URL) =>{
      setHasNoResult(false);
      window.innerWidth <= 768 && searchInputRef.current.focus();
      try{
        const response = await fetch(API_URL);
        if(!response.ok) throw new Error();
        const data = await response.json();

        //Extract current weather data
        const temperature = data.current.temp_c;
        console.log(temperature);
        const description = data.current.condition.text;
        const weatherIcon = Object.keys(weatherCodes).find(icon => weatherCodes[icon].includes(data.current.condition.code));

        setCurrentWeather({temperature, description, weatherIcon});

        // combined hourly data from both forecast days
        const combinedHourlyDay = [...data.forecast.forecastday[0].hour,
          ...data.forecast.forecastday[1].hour];
        searchInputRef.current.value =data.location.name;
        filterHourlyForecast(combinedHourlyDay);
      }catch{
        setHasNoResult(true);
      }
    }

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const defaultCity = "London"; //todo fetch from localStorage
    const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${defaultCity.toUpperCase()}&days=2`; //24 hours forecast (2 days)
    getWeatherDetails(API_URL);
  }, []);
  return (
    <div className={"home-container"}>
      <Profile/>
      <div className={"settings-weather-wrapper"}>
        <div className={"weather-wrapper"}>
          {/* Search Section */}
          <SearchSection getWeatherDetails={getWeatherDetails} searchInputRef={searchInputRef}/>
          { /* todo {hasNoResult ? (<NoResultsDiv) : weather section }*/}
          {/* Weather Section */}
          <div className="weather-section">
            <CurrentWeather currentWeather={currentWeather}/>
            {/* Hourly weather forecast list */}
            <div className="hourly-forecast">
              <ul className="weather-list">
                {hourlyForecasts.map(hourlyWeather =>(
                  <HourlyWeather
                    key={hourlyWeather.time_epoch}
                    hourlyWeather={hourlyWeather}
                  />
                ))}
              </ul>
            </div>

          </div>
        </div>
        <div className={"settings-wrapper"}>
          {/* General Settings */}
          <HomeSettings
            type={"general"}
            settings={settings.general}
            onClick={handleClick}
          />
          {/* Special Settings */}
          <HomeSettings
            type={"special"}
            settings={settings.special}
            onClick={handleClick}
          />
          <HomeSettings
            type={"special"}
            settings={settings.special}
            onClick={handleClick}
          />
          <HomeSettings
            type={"special"}
            settings={settings.special}
            onClick={handleClick}
          />
          <HomeSettings
            type={"special"}
            settings={settings.special}
            onClick={handleClick}
          />
        </div>
      </div>
      <section className={"home-wrapper"}>
        <h1 className={"heading"}>Rooms</h1>
        <div className={"room-wrapper"}>
          {Object.entries(rooms).map(([type, roomList]) =>
            roomList.map((room) => (
              <Room key={room.id} type={type} data={room} />
            )),
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;