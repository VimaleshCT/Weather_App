import React, { useState, useEffect } from "react";
import "./WeatherApp.css";
import search_icon from "../Assets/search.png";
import clear from "../Assets/clear.png";
import cloud from "../Assets/cloud.png";
import drizzle from "../Assets/drizzle.png";
import rain from "../Assets/rain.png";
import snow from "../Assets/snow.png";
import wind from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

const WeatherApp = () => {
  const [Wicon, setWicon] = useState(cloud); // Define Wicon state variable and its setter function

  useEffect(() => {
    // useEffect hook to perform side effects (like fetching data) after the component renders
    const api_key = "198ddeb23f609f5c064812c585bf3551";
    const search = async () => {
      const element = document.getElementsByClassName("cityInput")[0];
      if (element.value === "") {
        return;
      }
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=metric&appid=${api_key}`;

      let response = await fetch(url);
      let data = await response.json();

      const humidity = document.getElementsByClassName("humidity-percent")[0];
      const wind = document.getElementsByClassName("wind-rate")[0];
      const temperature = document.getElementsByClassName("weather-temp")[0];
      const location = document.getElementsByClassName("weather-loc")[0];

      humidity.innerHTML = `${data.main.humidity}%`;
      wind.innerHTML = `${data.wind.speed}km/h`;
      temperature.innerHTML = `${data.main.temp}°C`;
      location.innerHTML = data.name;

      if (data.weather && data.weather.length > 0) {
        const weatherIcon = data.weather[0].icon;
        switch (weatherIcon) {
          case "01d":
          case "01n":
            setWicon(clear);
            break;
          case "02d":
          case "02n":
            setWicon(cloud);
            break;
          case "03d":
          case "03n":
          case "04d":
          case "04n":
            setWicon(drizzle);
            break;
          case "09d":
          case "09n":
          case "10d":
          case "10n":
            setWicon(rain);
            break;
          case "13d":
          case "13n":
            setWicon(snow);
            break;
          default:
            setWicon(clear);
            break;
        }
      }
    };

    const searchButton = document.querySelector(".search");
    searchButton.addEventListener("click", search);

    return () => {
      // Clean up the event listener when the component unmounts
      searchButton.removeEventListener("click", search);
    };
  }, []); // Empty dependency array to run the effect only once after initial render

  return (
    <div className="back">
      <div className="container">
        <div className="top-bar">
          <input type="text" className="cityInput" placeholder="Search" />
          <div className="search">
            <img src={search_icon} alt="" />
          </div>
        </div>
        <div className="weather-image">
          <img src={Wicon} alt="" />
        </div>
        <div className="weather-temp">27°C</div>
        <div className="weather-loc">London</div>
        <div className="data-container">
          <div className="element">
            <img src={humidity_icon} alt="" className="icon" />
            <div className="data">
              <div className="humidity-percent">64%</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind} alt="" className="icon" />
            <div className="data">
              <div className="wind-rate">18 km/h</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
        <div className="footer">
          <p>CT_Weather☁️</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
