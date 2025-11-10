import React from "react";
import { MdOutlineMyLocation } from "react-icons/md";

export default function SearchSection({getWeatherDetails, searchInputRef}){
 const API_KEY = import.meta.env.VITE_API_KEY;

 // Handles city search form submission
 function handleCitySearch(e) {
    e.preventDefault();
   console.log(API_KEY);
    const searchInput = (e.target.querySelector(".search-input")).value;
    const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchInput.toUpperCase()}&days=2`; //24 hours forecast (2 days)
    getWeatherDetails(API_URL); // Fetches weather details for the entered city
  }
//Get user's current location (latitude/longitude)
  function handleLocationSearch() {
    navigator.geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude}, ${longitude}&days=2`; //24 hours forecast (2 days)
        getWeatherDetails(API_URL);
      },
      ()=>{
        alert("Please enable permission to use it");
      }
    )
  }

  return(
    <div className={"search-section"}>
      <form
        action="#"
        className={"search-form"}
        onSubmit={handleCitySearch}
      >
        <span className="material-symbols-rounded">search</span>
        <input
          type="search"
          placeholder={"Enter a city name"}
          ref={searchInputRef}
          className={"search-input"}
          required
        />
      </form>
      <button className="location-button" onClick={handleLocationSearch}>
        <MdOutlineMyLocation />
      </button>
    </div>
  );
}