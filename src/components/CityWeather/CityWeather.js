import React from "react";
import "./CityWeather.css";
import { connect } from "react-redux";
import Weather from "../Weather/Weather";
import Day from "../Day/Day";
import { convertTempToCelcius } from "../../utils/utils";
import Forecast from "../Forecast/Forecast";

const CityWeather = (props) => {
  let weatherIconUrl = "";
  let currentTemp = "";
  let country = "";
  let highTemp = "";
  let lowTemp = "";
  let feelsLike = "";
  let weather = "";
  let weatherDesc = "";
  let humidity = "";
  let pressure = "";
  let wind = "";
  let sunrise = "";
  let sunset = "";

  if (props.userCurrLocData) {
    console.log(props.userCurrLocData);
    if (props.userCurrLocData.weather) {
      weatherIconUrl = `http://openweathermap.org/img/wn/${props.userCurrLocData.weather[0].icon}@4x.png`;
      weather = props.userCurrLocData.weather[0].main;
      weatherDesc = props.userCurrLocData.weather[0].description;
    }
    if (props.userCurrLocData.main) {
      currentTemp = convertTempToCelcius(props.userCurrLocData.main.temp);
      highTemp = convertTempToCelcius(props.userCurrLocData.main.temp_max);
      lowTemp = convertTempToCelcius(props.userCurrLocData.main.temp_min);
      feelsLike = convertTempToCelcius(props.userCurrLocData.main.feels_like);
      pressure = props.userCurrLocData.main.pressure;
      humidity = props.userCurrLocData.main.humidity;
    }
    if (props.userCurrLocData.sys) {
      country = props.userCurrLocData.sys.country;
      sunrise = props.userCurrLocData.sys.sunrise;
      sunset = props.userCurrLocData.sys.sunset;
    }
    if (props.userCurrLocData.wind) {
      wind = props.userCurrLocData.wind.speed;
    }
  }

  return (
    <div className="city-info">
      <div className="ci-upper">
      <Day
        payload={{
          sunrise: sunrise,
          sunset: sunset,
        }}
      />
      <Weather
        payload={{
          weatherIconUrl: weatherIconUrl,
          currentTemp: currentTemp,
          highTemp: highTemp,
          lowTemp: lowTemp,
          feelsLike: feelsLike,
          cityName: props.userCurrLocData.name,
          countryName: country,
          weather: weather,
          weatherDesc: weatherDesc,
          humidity: humidity,
          pressure: pressure,
          wind: wind,
        }}
      />
      </div>
      {props.userLongitude && props.userLatitude ? (
        <Forecast
          latitude={props.userLatitude}
          longitude={props.userLongitude}
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userLatitude: state.userLatitude,
    userLongitude: state.userLongitude,
    userCurrLocData: state.userCurrLocData,
  };
};

export default connect(mapStateToProps)(CityWeather);
