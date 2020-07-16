import React from "react";
import "./CityInfo.css";
import { connect } from "react-redux";
import humidity from "../../assets/icons/humidity.png";
import barometer from "../../assets/icons/barometer.png";
import wind from "../../assets/icons/wind.png";
import sunrise from "../../assets/icons/sunrise.png";
import sunset from "../../assets/icons/sunset.png";

const convertTemp = (temp) => {
  return Math.floor(temp - 273.15);
};

const CityInfo = (props) => {
  let imgUrl = "";
  let temperature = "";
  let country = "";
  let highTemp = "",
    lowTemp = "",
    feelLike = "";
  let weather = "";
  let weatherDesc = "";
  let whumidity = "";
  let wpressure = "";
  let wwind = "";

  if (props.userCurrLocData) {
    console.log(props.userCurrLocData);
    if (props.userCurrLocData.weather) {
      imgUrl = `http://openweathermap.org/img/wn/${props.userCurrLocData.weather[0].icon}@4x.png`;
      weather = props.userCurrLocData.weather[0].main;
      weatherDesc = props.userCurrLocData.weather[0].description;
    }
    if (props.userCurrLocData.main) {
      temperature = convertTemp(props.userCurrLocData.main.temp);
      highTemp = convertTemp(props.userCurrLocData.main.temp_max);
      lowTemp = convertTemp(props.userCurrLocData.main.temp_min);
      feelLike = convertTemp(props.userCurrLocData.main.feels_like);
      wpressure = props.userCurrLocData.main.pressure;
      whumidity = props.userCurrLocData.main.humidity;
    }
    if (props.userCurrLocData.sys) {
      country = props.userCurrLocData.sys.country;
    }
    if (props.userCurrLocData.wind) {
      wwind = props.userCurrLocData.wind.speed;
    }
  }

  return (
    <div className="city-info">
      <div className="city-time">
        <div className="ct-date">
          <p>Thrusday
          <span>Date</span>
          </p>
        </div>
        <span className="ct-type">
          <img src={sunrise} alt="" height="48px" width="48px" />
          <p>
            Sunrise<br></br>
            <span>4:30 AM</span>
          </p>
        </span>
        <span className="ct-type">
          <img src={sunset} alt="" height="48px" width="48px" />
          <p>
            Sunset<br></br>
            <span>5:30 PM</span>
          </p>
        </span>
      </div>
      <div className="city-card">
        <div className="city-card-left">
          <div className="city-weather-img">
            <img
              src={imgUrl}
              alt=""
              style={{ borderRight: "2px solid #ccc" }}
            />
            <p>{weather}</p>
            <span>{weatherDesc}</span>
          </div>
          <div className="city-card-info">
            <p className="city-name">
              {props.userCurrLocData.name} , {country}
            </p>
            <p className="city-temp">
              {temperature}
              <sup>&deg;C</sup> <sup>|</sup> <sup>&deg;F</sup>
            </p>
            <div className="city-temp-additional">
              <span className="fas fa-temperature-low">
                {" "}
                {lowTemp}&deg;<br></br>
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
                {highTemp}&deg;<br></br>
                <p>Max Temp</p>
              </span>
              &nbsp;
              <span className="fas fa-thermometer-three-quarters">
                {" "}
                {feelLike}&deg;<br></br>
                <p>Feels Like</p>
              </span>
            </div>
          </div>
        </div>
        <div className="city-additional-info">
          <span>
            <span className="cad-type">
              <img src={humidity} alt="" height="20px" width="20px" />
              <p>&nbsp;Humidity</p>
            </span>
            <p className="cad-value">{whumidity}%</p>
          </span>
          <span>
            <span className="cad-type">
              <img src={barometer} alt="" height="20px" width="20px" />
              <p>&nbsp;Pressure</p>
            </span>
            <p className="cad-value">{wpressure} hPa</p>
          </span>
          <span>
            <span className="cad-type">
              <img src={wind} alt="" height="20px" width="20px" />
              <p>&nbsp;Wind</p>
            </span>
            <p className="cad-value">{wwind} M/S</p>
          </span>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userCurrLocData: state.userCurrLocData,
  };
};

export default connect(mapStateToProps)(CityInfo);
