import React from "react";
import "./Weather.css";
import humidity from "../../assets/icons/humidity.png";
import barometer from "../../assets/icons/barometer.png";
import wind from "../../assets/icons/wind.png";

const Weather = (props) => {
  return (
    <div className="weather-div">
      <div className="weather-div-left">
        <div className="weather-img">
          <img
            src={props.payload.weatherIconUrl}
            alt=""
            style={{ borderRight: "2px solid #ccc" }}
          />
          <p>{props.payload.weather}</p>
          <span>{props.payload.weatherDesc}</span>
        </div>
        <div className="weather-div-info">
          <p className="city-name">
            {props.payload.cityName} , {props.payload.countryName}
          </p>
          <p className="city-temp">
            {props.payload.currentTemp}
            <sup>&deg;C</sup> <sup>|</sup> <sup>&deg;F</sup>
          </p>
          <div className="weather-temp-additional">
            <span className="fas fa-temperature-low">
              {" "}
              {props.payload.lowTemp}&deg;<br></br>
              <p>Min Temp</p>
            </span>
            &nbsp;
            <span
              className="fas fa-temperature-high"
              style={{
                borderLeft: "1px solid #ccc",
                borderRight: "1px solid #ccc",
              }}
            >
              {" "}
              {props.payload.highTemp}&deg;<br></br>
              <p>Max Temp</p>
            </span>
            &nbsp;
            <span className="fas fa-thermometer-three-quarters">
              {" "}
              {props.payload.feelsLike}&deg;<br></br>
              <p>Feels Like</p>
            </span>
          </div>
        </div>
      </div>
      <div className="weather-additional-info">
        <span>
          <span className="wad-type">
            <img src={humidity} alt="" height="20px" width="20px" />
            <p>&nbsp;Humidity</p>
          </span>
          <p className="wad-value">{props.payload.humidity}%</p>
        </span>
        <span>
          <span className="wad-type">
            <img src={barometer} alt="" height="20px" width="20px" />
            <p>&nbsp;Pressure</p>
          </span>
          <p className="wad-value">{props.payload.pressure} hPa</p>
        </span>
        <span>
          <span className="wad-type">
            <img src={wind} alt="" height="20px" width="20px" />
            <p>&nbsp;Wind</p>
          </span>
          <p className="wad-value">{props.payload.wind} M/S</p>
        </span>
      </div>
    </div>
  );
};

export default Weather;
