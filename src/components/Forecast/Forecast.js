import React, { useState } from "react";
import "./Forecast.css";
import { connect } from "react-redux";
import {
  convertTempToCelcius,
  convertUnixTime,
  convertUnixDate,
} from "../../utils/utils";

const renderHourlyWeatherData = (data, page) => {
  const low = page * 6;
  const up = low + 6;
  return data.map((el, index) => {
    const { humidity, pressure, temp } = el;
    const wind = el.wind_speed;
    const weather = el.weather[0].main;
    const iconUrl = `http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`;
    const feelsLike = convertTempToCelcius(el.feels_like);
    const celTemp = convertTempToCelcius(temp);
    const time = convertUnixTime(el.dt);
    if (index >= low && index < up) {
      return (
        <div className="hf-info hf-info-data" key={index}>
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
    } else {
      return null;
    }
  });
};

const renderWeeklyWeatherData = (data, page) => {
  const low = page * 4;
  const up = low + 4;
  return data.map((el, index) => {
    const time = convertUnixDate(el.dt);
    const { humidity, pressure } = el;
    const sunrise = convertUnixTime(el.sunrise);
    const sunset = convertUnixTime(el.sunset);
    const wind = el.wind_speed;
    const weather = el.weather[0].main;
    const iconUrl = `http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`;
    const feelsLike = {
      morn: convertTempToCelcius(el.feels_like.morn),
      day: convertTempToCelcius(el.feels_like.day),
      eve: convertTempToCelcius(el.feels_like.eve),
      night: convertTempToCelcius(el.feels_like.night),
    };
    const temp = {
      morn: convertTempToCelcius(el.temp.morn),
      day: convertTempToCelcius(el.temp.day),
      eve: convertTempToCelcius(el.temp.eve),
      night: convertTempToCelcius(el.temp.night),
      max: convertTempToCelcius(el.temp.max),
      min: convertTempToCelcius(el.temp.min),
    };
    if (index >= low && index < up)
      return (
        <div className="wf-info wf-info-data" key={index}>
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
          <p className="wf-multi">
            <span>Morn {temp.morn}&deg;</span>
            <span>Day {temp.day}&deg;</span>
            <span>Eve {temp.eve}&deg;</span>
            <span>Night {temp.night}&deg;</span>
            <span>
              {temp.min}&deg; / {temp.max}&deg;
            </span>
          </p>
          <p className="wf-multi">
            <span>Morn {feelsLike.morn}&deg;</span>
            <span>Day {feelsLike.day}&deg;</span>
            <span>Eve {feelsLike.eve}&deg;</span>
            <span>Night {feelsLike.night}&deg;</span>
          </p>
          <p>{humidity}%</p>
          <p>{pressure} hPa</p>
          <p>{sunrise}</p>
          <p>{sunset}</p>
          <p>{wind} M/S</p>
        </div>
      );
    else return null;
  });
};

const renderPeginate = (incrementPage, decrementPage) => {
  return (
    <div className="peg-div">
      <i className="fas fa-chevron-left" onClick={decrementPage}></i>
      <i className="fas fa-chevron-right" onClick={incrementPage}></i>
    </div>
  );
};

const renderHourlyForecast = (
  hourlyWeatherData,
  page,
  incrementPage,
  decrementPage
) => {
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
      {hourlyWeatherData
        ? renderHourlyWeatherData(hourlyWeatherData.hourly, page)
        : null}
      {hourlyWeatherData ? renderPeginate(incrementPage, decrementPage) : null}
    </div>
  );
};

const renderWeeklyForecast = (
  weeklyWeatherData,
  page,
  incrementPage,
  decrementPage
) => {
  return (
    <div className="wf-div">
      <div className="wf-info wf-info-header">
        <p>Time</p>
        <p>Weather</p>
        <p>Temp</p>
        <p>Feels Like </p>
        <p>Humidity</p>
        <p>Pressure</p>
        <p>Sunrise</p>
        <p>Sunset</p>
        <p>Wind</p>
      </div>
      {weeklyWeatherData
        ? renderWeeklyWeatherData(weeklyWeatherData.daily, page)
        : null}
      {weeklyWeatherData ? renderPeginate(incrementPage, decrementPage) : null}
    </div>
  );
};

const Forecast = (props) => {
  const [mode, setMode] = useState("Hourly");
  const [page, setPage] = useState(0);

  const incrementPage = () => {
    if( mode === "Weekly" && page === 0 ) setPage(1);
    if( mode === "Hourly" && page < 7 ) setPage(page + 1);
  };
  const decrementPage = () => {
    if( mode === "Weekly" && page === 1 ) setPage(0);
    if( mode === "Hourly" && page >= 1 ) setPage(page - 1);
  };
  const resetPage = () => {
    setPage(0);
  };

  if (props.weeklyWeatherData === undefined) {
    const lat = props.latitude;
    const lon = props.longitude;
    const API_KEY = "4d67ae696f5ec0d7e0287b173d413c6b";
    const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={hourly}&appid=${API_KEY}`;
    fetch(URL)
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        props.storeWeeklyFetchedData(resData);
      })
      .catch((err) => {
        throw err;
      });
  }

  if (props.hourlyWeatherData === undefined) {
    const lat = props.latitude;
    const lon = props.longitude;
    const API_KEY = "4d67ae696f5ec0d7e0287b173d413c6b";
    const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={daily}&appid=${API_KEY}`;
    fetch(URL)
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        props.storeHourlyFetchedData(resData);
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
              if (mode === "Hourly") {
                setMode("Weekly");
                resetPage();
              }
            }}
          >
            Weekly
          </li>
        ) : (
          <li
            onClick={(e) => {
              if (mode === "Weekly") {
                setMode("Hourly");
                resetPage();
              }
            }}
          >
            Hourly
          </li>
        )}
      </div>
      {mode === "Hourly"
        ? renderHourlyForecast(
            props.hourlyWeatherData,
            page,
            incrementPage,
            decrementPage
          )
        : renderWeeklyForecast(
            props.weeklyWeatherData,
            page,
            incrementPage,
            decrementPage
          )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    hourlyWeatherData: state.hourlyWeatherData,
    weeklyWeatherData: state.weeklyWeatherData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeHourlyFetchedData: (data) => {
      dispatch({ type: "STORE_HOURLY_DATA", payload: data });
    },
    storeWeeklyFetchedData: (data) => {
      dispatch({ type: "STORE_WEEKLY_DATA", payload: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Forecast);
