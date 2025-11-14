import React, { useEffect, useState } from "react";
import { MdOutlineMyLocation } from "react-icons/md";

export default function SearchSection({getWeatherDetails, locationRef}){
  const API_KEY = import.meta.env.VITE_API_KEY;

 // Handles city search form submission
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
      <div  className={"search-form"}>
        <input
          type="text"
          ref={locationRef}
          className={"search-input"}
          disabled
        />
      </div>
      <button className="location-button" onClick={handleLocationSearch}>
        <MdOutlineMyLocation />
      </button>
    </div>
  );
}