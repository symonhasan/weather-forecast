import React, { useState } from "react";
import "./Forecast.css";
import { connect } from "react-redux";
import { convertTempToCelcius, convertUnixTime } from "../../utils/utils";

const renderWeatherData = (data) => {
  return data.map((el, index) => {
    const { humidity, pressure, temp } = el;
    const wind = el.wind_speed;
    const weather = el.weather[0].main;
    const iconUrl = `http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`;
    const feelsLike = convertTempToCelcius(el.feels_like);
    const celTemp = convertTempToCelcius(temp);
    const time = convertUnixTime(el.dt);
    return (
      <div className="hf-info hf-info-data">
        <p>{time}</p>
        <p
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span>
            <img src={iconUrl} alt="" height="30px" width="30px" />
          </span>
          {weather}
        </p>
        <p>{celTemp}&deg;</p>
        <p>{feelsLike}&deg;</p>
        <p>{humidity}%</p>
        <p>{pressure}hPa</p>
        <p>{wind}M/S</p>
      </div>
    );
  });
};

const renderHourlyForecast = (hourlyWeatherData) => {
  return (
    <div className="hf-div">
      <div className="hf-info hf-info-header">
        <p>Time</p>
        <p>Weather</p>
        <p>Temp</p>
        <p>Feels Like </p>
        <p>Humidity</p>
        <p>Pressure</p>
        <p>Wind</p>
      </div>
      {hourlyWeatherData ? renderWeatherData(hourlyWeatherData.hourly) : null}
    </div>
  );
};

const renderWeeklyForecast = () => {};

const Forecast = (props) => {
  const [mode, setMode] = useState("Hourly");

  if (props.hourlyWeatherData === undefined) {
    const lat = props.latitude;
    const lon = props.longitude;
    console.log(lat, " ", lon);
    const API_KEY = "4d67ae696f5ec0d7e0287b173d413c6b";
    const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={daily}&appid=${API_KEY}`;
    fetch(URL)
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        props.storHourlyFetchedData(resData);
      })
      .catch((err) => {
        throw err;
      });
  }
  return (
    <div className="forecast-div">
      <div className="forecast-option">
        <p>{mode} Forecast</p>
        {mode === "Hourly" ? (
          <li
            onClick={(e) => {
              if (mode === "Hourly") setMode("Weekly");
            }}
          >
            Weekly
          </li>
        ) : (
          <li
            onClick={(e) => {
              if (mode === "Weekly") setMode("Hourly");
            }}
          >
            Hourly
          </li>
        )}
      </div>
      {mode === "Hourly"
        ? renderHourlyForecast(props.hourlyWeatherData)
        : renderWeeklyForecast()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    hourlyWeatherData: state.hourlyWeatherData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storHourlyFetchedData: (data) => {
      dispatch({ type: "STORE_HOURLY_DATA", payload: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Forecast);
